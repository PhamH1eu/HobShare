const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig"); // Ensure this points to your Neo4j driver setup

exports.recommendPostsByAffinity = functions.https.onCall(
  async (data, context) => {
    const session = neo4jDriver.session();
    const userId = context.auth.uid; // Get the current user's ID from the Firebase context

    try {
      // Step 1: Match user with nodes (users or groups) they have an affinity with
      const result = await session.run(
        `
      MATCH (u:User {id: $userId})-[r:AFFINITY]->(t) 
      WHERE (t:User OR t:Group)
      WITH t, r.affinity AS affinity

      OPTIONAL MATCH (t)-[:HAVE|:WRITE]->(p:Post)
      RETURN p.id AS postId, p.createdAt AS createdAt, affinity
      ORDER BY affinity DESC, createdAt DESC

      `,
        { userId }
      );

      const postIds = result.records.map((record) => record.get("postId"));

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
  }
);
