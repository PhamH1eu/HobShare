const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig");

exports.removeFriend = functions
  .region("asia-southeast1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Request must be authenticated."
      );
    }

    const friendId = data.friendId; // The ID of the friend to remove
    const userId = context.auth.uid; // The authenticated user (the one requesting to remove the friend)

    try {
      // Now, remove the friend relationship in Neo4j
      const session = neo4jDriver.session();
      try {
        await session.run(
          `
                MATCH (a:User {id: $userId})-[r:FRIEND]->(b:User {id: $friendId})
                DELETE r
                `,
          { userId, friendId }
        );
        await session.run(
          `
                MATCH (b:User {id: $friendId})-[r:FRIEND]->(a:User {id: $userId})
                DELETE r
                `,
          { userId, friendId }
        );
      } finally {
        await session.close();
      }

      console.log(`Friendship between ${userId} and ${friendId} removed.`);
      return { success: true, message: "Friendship removed." };
    } catch (error) {
      console.error("Error removing friendship:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Unable to remove friendship."
      );
    }
  });
