const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig");

// Callable function to fetch all friends of the current user
exports.getAllFriends = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Request must be authenticated."
    );
  }

  const userId = context.auth.uid; // The authenticated user's ID

  const session = neo4jDriver.session();
  try {
    // Query to get all friends of the current user based on the FRIEND relationship
    const result = await session.run(
      `
            MATCH (u:User {id: $userId})-[:FRIEND]->(friend:User)
            RETURN friend.id AS id, friend.name AS name, friend.email AS email
            `,
      { userId }
    );

    // Extract the list of friends from the query result
    const friends = result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      email: record.get("email"),
    }));

    return friends;
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to fetch friends."
    );
  } finally {
    await session.close();
  }
});
