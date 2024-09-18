const functions = require("firebase-functions");
const admin = require("firebase-admin");

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

      // Wait for all the tag document creations to complete
      await Promise.all(promises);
    }

    return null;
  });
