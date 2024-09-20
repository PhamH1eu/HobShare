const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();

const db = admin.firestore();

exports.onPostCreated = functions.firestore
  .document("posts/{postId}")
  .onCreate(async (snap, context) => {
    const postId = context.params.postId;
    const data = snap.data();

    // Check if tags exist and are an array
    if (data.tags && Array.isArray(data.tags)) {
      const promises = data.tags.map(async (tag) => {
        const hashtagRef = db.doc(`hashtag/${tag}/posts/${postId}`);
        return hashtagRef.set({
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          postId: postId,
        });
      });

      const promiseCreateTags = data.tags.map(async (tag) => {
        const tagRef = db.doc(`hashtag/${tag}`);
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
  .schedule("every 12 hours")
  .onRun(async (context) => {
    const hashtagCollectionRef = db.collection("hashtag");

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

      await Promise.all(countPromises);

      console.log("Hashtag post counts updated successfully.");
    } catch (error) {
      console.error("Error updating hashtag post counts:", error);
    }

    try {
      const hashtagSnapshot = await hashtagCollectionRef
        .orderBy("postCount")
        .limit(3)
        .get();
      const topHashtags = [];
      hashtagSnapshot.forEach((doc) => {
        topHashtags.push({ id: doc.id, ...doc.data() });
      });
      const popularTagsSnapshot = await db
        .collection("populartags")
        .orderBy("postCount", "desc")
        .get();
      const popularTags = [];
      popularTagsSnapshot.forEach((doc) => {
        popularTags.push({ id: doc.id, ...doc.data() });
      });
      const combinedTags = [...topHashtags, ...popularTags];

      combinedTags.sort((a, b) => b.postCount - a.postCount);

      // Keep only the top 3 hashtags
      const updatedPopularTags = combinedTags.slice(0, 3);

      // 4. Update the 'populartags' collection
      const batch = db.batch();

      // Clear previous 'populartags' collection
      popularTagsSnapshot.forEach((doc) => {
        batch.delete(db.collection("populartags").doc(doc.id));
      });

      // Add the new top 3 hashtags into the 'populartags' collection
      updatedPopularTags.forEach((tag) => {
        const docRef = db.collection("populartags").doc(tag.id);
        batch.set(docRef, tag);
      });

      // Commit the batch write
      await batch.commit();

      console.log("Successfully updated popular tags");
    } catch (error) {
      console.error("Error updating popular hashtag:", error);
    }
  });

exports.sendUserNotification = functions.firestore
  .document("notifications/{userId}/notifications/{notiId}")
  .onCreate(async (snapshot, context) => {
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
