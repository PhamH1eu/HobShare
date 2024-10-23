const admin = require("firebase-admin");
const functions = require("firebase-functions");

exports.countHashtagPosts = functions.pubsub
  .schedule("every 12 hours")
  .onRun(async (context) => {
    const db = admin.firestore();
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

      combinedTags.sort((a, b) => a.postCount - b.postCount);

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