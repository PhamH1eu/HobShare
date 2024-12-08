const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Cloud Function to cancel a friend request
exports.cancelFriendRequest = functions
  .region("asia-southeast1")
  .https.onCall(async (data, context) => {
    // Ensure the request is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Request must be authenticated."
      );
    }

    const fromUserId = context.auth.uid; // The authenticated user (sender)
    const toUserId = data.toUserId; // The recipient of the friend request

    // Firestore references
    const db = admin.firestore();
    const fromUserRef = db.collection("users").doc(fromUserId);
    const toUserRef = db.collection("users").doc(toUserId);

    try {
      // Find the friend request in the recipient's friendRequests subcollection
      const recipientRequestRef = toUserRef
        .collection("friendRequests")
        .doc(fromUserId);

      const recipientRequestSnapshot = await recipientRequestRef.get();
      if (!recipientRequestSnapshot.exists) {
        throw new functions.https.HttpsError(
          "not-found",
          "Friend request not found."
        );
      }

      // Begin batch operation to delete the requests from both collections
      const batch = db.batch();

      // Delete the friend request from the recipient's friendRequests subcollection
      batch.delete(recipientRequestRef);

      // Delete the friend request from the sender's sentRequests subcollection
      const sentRequestRef = fromUserRef
        .collection("sentRequests")
        .doc(toUserId);
      batch.delete(sentRequestRef);

      // Commit the batch operation
      await batch.commit();

      console.log(
        `Friend request from ${fromUserId} to ${toUserId} has been canceled.`
      );
      return {
        success: true,
        message: "Friend request canceled successfully.",
      };
    } catch (error) {
      console.error("Error canceling friend request:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Unable to cancel friend request."
      );
    }
  });
