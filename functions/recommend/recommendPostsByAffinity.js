const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig"); // Ensure this points to your Neo4j driver setup
const { log } = require("firebase-functions/logger");

exports.recommendPostsByAffinity = functions
  .region("asia-southeast1")
  .https.onCall(async (data, context) => {
    const session = neo4jDriver.session();
    const userId = context.auth.uid; // Get the current user's ID from the Firebase context

    try {
      // Get the current timestamp and the timestamp for two days ago
      const currentTimestamp = new Date().toISOString(); // Current time in ISO format
      const twoDaysAgo = new Date(
        Date.now() - 30 * 24 * 60 * 60 * 1000
      ).toISOString(); // 30 days ago in ISO format

      // Step 1: Match user with nodes (users or groups) they have an affinity with and filter posts by createdAt
      const result = await session.run(
        `
        MATCH (u:User {id: $userId})-[r:AFFINITY]->(t) 
        WHERE (t:User OR t:Group)
        WITH t, r.affinity AS affinity

        OPTIONAL MATCH (t)-[:HAVE|:WRITE]->(p:Post)
        WHERE p.createdAt >= $twoDaysAgo AND p.createdAt <= $currentTimestamp
        RETURN p.id AS postId, p.createdAt AS createdAt, affinity
        ORDER BY affinity DESC, createdAt DESC
        `,
        {
          userId,
          twoDaysAgo,
          currentTimestamp,
        }
      );

      const postIds = result.records.map((record) => record.get("postId"));
      log("Recommended posts by affinity:", postIds);

      return postIds;
    } catch (error) {
      console.error("Error recommending posts by affinity:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to recommend posts."
      );
    } finally {
      await session.close();
    }
  });
