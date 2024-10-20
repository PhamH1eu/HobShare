const functions = require("firebase-functions");
const admin = require("firebase-admin");
const neo4jDriver = require("../util/neo4jconfig"); // Ensure this points to your Neo4j driver setup

exports.recommendPostsByEmbedding = functions.https.onCall(
  async (data, context) => {
    const userId = context.auth.uid; // Get the current user's ID
    const db = admin.firestore();

    if (!userId) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const favoritesRef = db.collection("users").doc(userId);
    const favoritesDoc = await favoritesRef.get();
    const favorites = favoritesDoc.data().favorite;

    if (favorites.length === 0 || !favorites) {
      const postsSnapshot = await db
        .collection("posts")
        .orderBy("priority", "desc")
        .get();

      const popularPosts = [];
      postsSnapshot.forEach((doc) => {
        popularPosts.push(doc.id); // Assuming we return post IDs
      });

      return popularPosts;
    }

    const session = neo4jDriver.session();

    try {
      const result = await session.run(
        `MATCH (currentUser:User {id: $userId})
      WITH currentUser

      // Get posts written by users without AFFINITY, excluding posts written by currentUser
      MATCH (post:Post)<-[:WRITE]-(user:User)
      WHERE NOT (currentUser)-[:AFFINITY]->(user)
      AND NOT (currentUser)-[:WRITE]->(post)
      WITH currentUser, post, user

      // Get the embedding vectors
      WITH currentUser, post, currentUser.embedding AS currentEmbedding, post.embedding AS postEmbedding

      // Calculate the dot product and the norms
      WITH currentUser, post,
           reduce(acc = 0.0, i IN range(0, size(currentEmbedding)-1) | acc + (currentEmbedding[i] * postEmbedding[i])) AS dotProduct,
           sqrt(reduce(acc = 0.0, i IN range(0, size(currentEmbedding)-1) | acc + (currentEmbedding[i] ^ 2))) AS currentNorm,
           sqrt(reduce(acc = 0.0, i IN range(0, size(postEmbedding)-1) | acc + (postEmbedding[i] ^ 2))) AS postNorm

      // Calculate cosine similarity
      WITH currentUser, post, 
           CASE WHEN currentNorm * postNorm <> 0 THEN dotProduct / (currentNorm * postNorm) ELSE 0 END AS cosineSimilarity
      RETURN post.id AS postId
      ORDER BY cosineSimilarity DESC
      UNION
      MATCH (currentUser:User {id: $userId})

      // Get posts belonging to groups without AFFINITY, excluding posts written by currentUser
      MATCH (post:Post)<-[:HAVE]-(group:Group)
      WHERE NOT (currentUser)-[:AFFINITY]->(group)
      AND NOT (currentUser)-[:WRITE]->(post)
      WITH currentUser, post, group

      // Get the embedding vectors
      WITH currentUser, post, currentUser.embedding AS currentEmbedding, post.embedding AS postEmbedding

      // Calculate the dot product and the norms
      WITH currentUser, post,
           reduce(acc = 0.0, i IN range(0, size(currentEmbedding)-1) | acc + (currentEmbedding[i] * postEmbedding[i])) AS dotProduct,
           sqrt(reduce(acc = 0.0, i IN range(0, size(currentEmbedding)-1) | acc + (currentEmbedding[i] ^ 2))) AS currentNorm,
           sqrt(reduce(acc = 0.0, i IN range(0, size(postEmbedding)-1) | acc + (postEmbedding[i] ^ 2))) AS postNorm

      // Calculate cosine similarity
      WITH currentUser, post, 
           CASE WHEN currentNorm * postNorm <> 0 THEN dotProduct / (currentNorm * postNorm) ELSE 0 END AS cosineSimilarity
      RETURN post.id AS postId
      ORDER BY cosineSimilarity DESC
          `,
        { userId }
      );

      // Extract the post IDs and similarity
      const postIds = result.records.map((record) => record.get("postId"));

      return postIds;
    } catch (error) {
      console.error("Error recommending posts by embedding similarity:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to recommend posts."
      );
    } finally {
      await session.close();
    }
  }
);
