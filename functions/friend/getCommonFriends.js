const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig"); // Ensure this points to your Neo4j driver setup

exports.getCommonFriendsCount = functions.https.onCall(
  async (data, context) => {
    const userId = context.auth.uid; // Get the current user's ID
    const receiverUserId = data.receiverUserId; // Get the target user's ID

    if (!userId || !receiverUserId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Both userId and receiverUserId must be provided."
      );
    }

    const session = neo4jDriver.session();

    try {
      const result = await session.run(
        `
      MATCH (u:User {id: $userId})-[:FRIEND]->(f:User)<-[:FRIEND]-(r:User {id: $receiverUserId})
      RETURN COUNT(f) AS commonFriendsCount
      `,
        { userId, receiverUserId }
      );

      const count = result.records[0].get("commonFriendsCount").toNumber(); // Convert Neo4j integer to JavaScript number

      return { commonFriendsCount: count };
    } catch (error) {
      console.error("Error querying common friends:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to fetch common friends."
      );
    } finally {
      await session.close();
    }
  }
);
