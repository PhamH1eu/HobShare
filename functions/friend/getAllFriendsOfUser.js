const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig");

exports.getAllFriendsOfUser = functions.https.onCall(async (data, context) => {
  const userId = data.userId; // Pass the userId in the data

  // Neo4j session
  const session = neo4jDriver.session();

  try {
    // Query to find all friends and their friendship timestamps
    const result = await session.run(
      `
      MATCH (user:User {id: $userId})-[friendship:FRIEND]->(friend:User)
      RETURN friend.id AS friendId, friend.name AS friendName, friend.avatar AS friendAvatar, 
             friendship.since AS friendshipSince
      `,
      { userId }
    );

    // Extract friends and their friendship timestamps
    const friends = result.records.map((record) => ({
      id: record.get("friendId"),
      name: record.get("friendName"),
      avatar: record.get("friendAvatar"),
      friendshipSince: record.get("friendshipSince"),
    }));

    return { success: true, friends };
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to fetch friends for user."
    );
  } finally {
    await session.close();
  }
});
