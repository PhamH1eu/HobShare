const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.denyFriendRequest = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Request must be authenticated."
    );
  }

  const receiverId = context.auth.uid; // The authenticated user (receiver of the request)
  const senderId = data.senderId; // The ID of the user who sent the friend request

  if (!senderId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Sender ID must be provided."
    );
  }

  const db = admin.firestore();
  const receiverRef = db.collection("users").doc(receiverId);
  const senderRef = db.collection("users").doc(senderId);

  try {
    // Firestore batch to delete the friend request from both collections
    const batch = db.batch();

    // Remove the friend request from the receiver's "friendRequests" subcollection
    const receiverFriendRequestRef = receiverRef
      .collection("friendRequests")
      .doc(senderId);
    batch.delete(receiverFriendRequestRef);

    // Remove the sent request from the sender's "sentRequests" subcollection
    const senderSentRequestRef = senderRef
      .collection("sentRequests")
      .doc(receiverId);
    batch.delete(senderSentRequestRef);

    // Commit the batch to Firestore
    await batch.commit();

    console.log(`Friend request from ${senderId} to ${receiverId} denied.`);
    return { success: true, message: "Friend request denied." };
  } catch (error) {
    console.error("Error denying friend request:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to deny friend request."
    );
  }
});
