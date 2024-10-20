const admin = require("firebase-admin");
const functions = require("firebase-functions");

exports.onScheduledTimeDecay = functions.pubsub
  .schedule("every 24 hours") // Runs every 24 hours
  .onRun(async (context) => {
    const db = admin.firestore();
    const postsRef = db.collection("posts");
    const now = admin.firestore.Timestamp.now(); // Current timestamp
    const decayFactor = 1 / 6; // Decay factor for 6 days

    try {
      // Get all posts
      const snapshot = await postsRef.get();

      // Process each post
      snapshot.forEach(async (doc) => {
        const postData = doc.data();
        const { createdAt, popularity } = postData; // Assuming popularity is P0
        if (!createdAt || !popularity) return;

        // Calculate the time difference in days since post creation
        const createdAtTime = createdAt.toDate();
        const timeElapsedInDays =
          (now.toDate() - createdAtTime) / (1000 * 60 * 60 * 24);

        // Apply the delayed exponential decay formula
        const priority =
          popularity * Math.exp(-decayFactor * timeElapsedInDays);

        // Update the post with the new priority field
        await doc.ref.update({ priority });

        console.log(`Updated post ${doc.id} with new priority: ${priority}`);
      });

      console.log("Priority updates completed successfully.");
    } catch (error) {
      console.error("Error updating post priorities:", error);
    }
  });
