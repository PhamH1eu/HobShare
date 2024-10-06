const admin = require("firebase-admin");
const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig"); // Ensure this points to your Neo4j driver setup

exports.onCommentAdded = functions.firestore
  .document("posts/{postId}/comments/{comId}")
  .onCreate(async (snap, context) => {
    const db = admin.firestore();
    const postId = context.params.postId;
    const commentData = snap.data();
    const userId = commentData.userId; // userId from comment document

    const session = neo4jDriver.session();

    try {
      // Fetch post data
      const postRef = db.collection("posts").doc(postId);
      const postDoc = await postRef.get();
      const postData = postDoc.data();

      let targetNodeId, targetType;

      if (postData.groupId) {
        // If the post belongs to a group, we will create a relationship with the group node
        targetNodeId = postData.groupId;
        targetType = "Group";
      } else {
        // Otherwise, we create a relationship with the author of the post
        targetNodeId = postData.authorId;
        targetType = "User";
      }

      // Check if an affinity relationship already exists
      const result = await session.run(
        `
        MATCH (u:User {id: $userId})-[r:AFFINITY]->(t:${targetType} {id: $targetNodeId})
        RETURN r
        `,
        { userId, targetNodeId }
      );

      if (result.records.length > 0) {
        // If relationship exists, increase the affinity by 0.1
        await session.run(
          `
          MATCH (u:User {id: $userId})-[r:AFFINITY]->(t:${targetType} {id: $targetNodeId})
          SET r.affinity = r.affinity + 0.2
          RETURN r
          `,
          { userId, targetNodeId }
        );
      } else {
        // If no relationship exists, create a new one with an affinity of 1.1
        await session.run(
          `
          MATCH (u:User {id: $userId}), (t:${targetType} {id: $targetNodeId})
          CREATE (u)-[r:AFFINITY {affinity: 1.2}]->(t)
          RETURN r
          `,
          { userId, targetNodeId }
        );
      }

      console.log(
        `Affinity updated successfully between ${userId} and ${targetType} ${targetNodeId} for comment`
      );
    } catch (error) {
      console.error("Error updating affinity on comment:", error);
    } finally {
      await session.close();
    }

    return null;
  });
