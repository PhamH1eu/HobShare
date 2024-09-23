const admin = require("firebase-admin");
const functions = require("firebase-functions");

exports.sendUserNotification = functions.firestore
  .document("notifications/{userId}/notifications/{notiId}")
  .onCreate(async (snapshot, context) => {
    const db = admin.firestore();
    const userId = context.params.userId;

    // Fetch the user's FCM token from Firestore
    const userDoc = await db.collection("users").doc(userId).get();
    const receiverToken = userDoc.data()?.receiverToken;

    // Check if the token exists
    if (!receiverToken) {
      console.error(`No receiverToken found for user: ${userId}`);
      return;
    }

    const notificationData = snapshot.data();

    const message = {
      token: receiverToken,
      notification: {
        title: "HobShare",
        body: "Bạn có thông báo mới",
      },
      data: {
        id: context.params.notiId,
        url: notificationData.url,
        content: notificationData.content,
        createdAt: notificationData.createdAt.toDate().toISOString(),
        sourceName: notificationData.sourceName,
        sourceImage: notificationData.sourceImage,
      },
      webpush: {
        fcmOptions: {
          link: notificationData.url,
        },
        notification: {
          icon: "favicon.png", // Same as above or use a different one
        },
      },
    };

    try {
      // Send the FCM notification
      await admin.messaging().send(message);
      console.log(`Notification sent to user: ${userId}`);
    } catch (error) {
      console.error(`Error sending notification to user: ${userId}`, error);
    }
  });