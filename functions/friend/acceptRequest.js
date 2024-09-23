const functions = require("firebase-functions");
const admin = require("firebase-admin");
const neo4jDriver = require("../util/neo4jconfig");

exports.acceptFriendRequest = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Request must be authenticated."
    );
  }

  const fromUserId = data.fromUserId; // The sender of the friend request
  const toUserId = context.auth.uid; // The authenticated user (recipient of the friend request)

  // Firestore references
  const db = admin.firestore();
  const fromUserRef = db.collection("users").doc(fromUserId);
  const toUserRef = db.collection("users").doc(toUserId);

  try {
    // Verify the friend request exists
    const friendRequestRef = toUserRef
      .collection("friendRequests")
      .doc(fromUserId);
    const friendRequestSnapshot = await friendRequestRef.get();

    if (!friendRequestSnapshot.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        "No friend request found."
      );
    }

    // Begin Firestore batch operation to delete the requests
    const batch = db.batch();

    // Delete the friend request from recipient's friendRequests subcollection
    batch.delete(friendRequestRef);

    // Delete the friend request from sender's sentRequests subcollection
    const sentRequestRef = fromUserRef.collection("sentRequests").doc(toUserId);
    batch.delete(sentRequestRef);

    // Commit Firestore batch operation
    await batch.commit();

    // Now, add the friend relationship in Neo4j
    const session = neo4jDriver.session();
    try {
      await session.run(
        `
                MATCH (a:User {id: $fromUserId}), (b:User {id: $toUserId})
                CREATE (a)-[:FRIEND]->(b)
                CREATE (b)-[:FRIEND]->(a)
                `,
        { fromUserId, toUserId }
      );
    } finally {
      await session.close();
    }

    console.log(
      `Friend request from ${fromUserId} to ${toUserId} accepted and relationship created.`
    );
    return {
      success: true,
      message: "Friend request accepted and relationship created.",
    };
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to accept friend request."
    );
  }
});
