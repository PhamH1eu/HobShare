const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig");

exports.getFriendPosts = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Request must be authenticated."
    );
  }

  const userId = context.auth.uid;
  const session = neo4jDriver.session();

  try {
    // Query Neo4j to get post IDs from groups the user is a member of
    const neo4jResult = await session.run(
      `
      MATCH (u:User {id: $userId})-[:FRIEND]->(f:User)-[:WRITE]->(p:Post)
      RETURN p.id AS postId
      ORDER BY p.createdAt DESC
      `,
      { userId }
    );

    // Extract post IDs from Neo4j query result
    const postIds = neo4jResult.records.map((record) => record.get("postId"));

    return { postIds };
  } catch (error) {
    console.error("Error getting post IDs:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to retrieve post IDs."
    );
  } finally {
    await session.close();
  }
});
