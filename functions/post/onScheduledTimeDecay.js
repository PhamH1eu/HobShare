const admin = require("firebase-admin");
const functions = require("firebase-functions");

exports.onScheduledTimeDecay = functions
  .region("asia-southeast1")
  .pubsub.schedule("every 24 hours") // Runs every 24 hours
  .onRun(async (context) => {
    const db = admin.firestore();
    const postsRef = db.collection("posts");
    const now = admin.firestore.Timestamp.now(); // Current timestamp
    const decayFactor = 0.1;

    try {
      // Get all posts
      const snapshot = await postsRef.get();

      // Process each post
      snapshot.forEach(async (doc) => {
        const postData = doc.data();
        const { createdAt, priority } = postData;
        if (!createdAt || !priority) return;

        const createdAtTime = createdAt.toDate();
        const nowTime = now.toDate();

        const timeElapsedInMs = nowTime.getTime() - createdAtTime.getTime();
        const timeElapsedInDays = timeElapsedInMs / (1000 * 60 * 60 * 24);

        if (timeElapsedInDays <= 2) {
          return;
        }

        const daysAfterDelay = timeElapsedInDays - 2;

        await doc.ref.update({
          priority: priority * Math.exp(-decayFactor * daysAfterDelay),
        });

        console.log(`Updated post ${doc.id} with new priority: ${priority}`);
      });

      console.log("Priority updates completed successfully.");
    } catch (error) {
      console.error("Error updating post priorities:", error);
    }
  });
