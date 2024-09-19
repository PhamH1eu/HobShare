const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();

exports.onPostCreated = functions.firestore
  .document("posts/{postId}")
  .onCreate(async (snap, context) => {
    const postId = context.params.postId;
    const data = snap.data();

    // Check if tags exist and are an array
    if (data.tags && Array.isArray(data.tags)) {
      const promises = data.tags.map(async (tag) => {
        const hashtagRef = admin
          .firestore()
          .doc(`hashtag/${tag}/posts/${postId}`);
        return hashtagRef.set({
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          postId: postId,
        });
      });

      const promiseCreateTags = data.tags.map(async (tag) => {
        const tagRef = admin.firestore().doc(`hashtag/${tag}`);
        return tagRef.set({
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          tag: tag,
        });
      });

      // Wait for all the tag document creations to complete
      await Promise.all([...promises, ...promiseCreateTags]);
    }

    return null;
  });

exports.countHashtagPosts = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async (context) => {
    const hashtagCollectionRef = admin.firestore().collection("hashtag");

    try {
      // Get all hashtag documents
      const hashtagSnapshot = await hashtagCollectionRef.get();

      const countPromises = hashtagSnapshot.docs.map(async (hashtagDoc) => {
        const tag = hashtagDoc.id;
        const postsCollectionRef = hashtagCollectionRef
          .doc(tag)
          .collection("posts");

        // Count the number of documents in the posts subcollection
        const postsSnapshot = await postsCollectionRef.get();
        const postCount = postsSnapshot.size;

        // Update the hashtag document with the count
        return hashtagCollectionRef.doc(tag).set(
          {
            postCount: postCount,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true } // Merge with the existing document data
        );
      });

      // Wait for all count operations to complete
      await Promise.all(countPromises);

      console.log("Hashtag post counts updated successfully.");
    } catch (error) {
      console.error("Error updating hashtag post counts:", error);
    }
  });

exports.sendUserNotification = functions.firestore
  .document("notifications/{userId}/notifications/{notiId}")
  .onCreate(async (snapshot, context) => {
    const userId = context.params.userId;

    // Fetch the user's FCM token from Firestore
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();
    const receiverToken = userDoc.data()?.receiverToken;

    // Check if the token exists
    if (!receiverToken) {
      console.error(`No receiverToken found for user: ${userId}`);
      return;
    }

    // Get the notification data from the created document
    const notificationData = snapshot.data();
    const title = notificationData.title || "New Notification";
    const body = notificationData.body || "You have a new message!";

    // Construct the FCM message
    const message = {
      token: receiverToken,
      notification: {
        title: title,
        body: body,
      },
      data: {
        userId: userId,
        notiId: context.params.notiId,
        // Add any additional data you want to send
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
