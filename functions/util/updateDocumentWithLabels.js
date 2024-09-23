const admin = require("firebase-admin");
const functions = require("firebase-functions");

exports.updateDocumentWithLabels = functions.firestore
  .document("imageLabels/{docId}")
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();
    const filePath = data.file; // e.g., 'gs://reactchat-3358f.appspot.com/namecollection/docId.png'
    const labels = data.labels; // Array of labels

    if (!filePath || !labels) {
      console.error("Invalid data: file or labels missing");
      return null;
    }

    try {
      // Extract 'namecollection' and 'docId' from the file path
      const regex = /gs:\/\/[^/]+\/([^/]+)\/([^/]+)\.png/;
      const match = filePath.match(regex);

      if (!match || match.length !== 3) {
        console.error(
          "Failed to extract namecollection and docId from the file path."
        );
        return null;
      }

      const namecollection = match[1]; // The collection name
      const docId = match[2]; // The document ID

      // Filter labels with score > 0.85
      const filteredLabels = labels.filter((label) => label.score > 0.85);

      // Sort the filtered labels by score in descending order
      filteredLabels.sort((a, b) => b.score - a.score);

      // Take the top 4 labels and only extract their 'description' field
      const topDescriptions = filteredLabels
        .slice(0, 4)
        .map((label) => label.description);

      // Reference to the target document
      const docRef = admin.firestore().collection(namecollection).doc(docId);

      // Write the top descriptions to the target document
      await docRef.update({ labels: topDescriptions });

      console.log(
        `Successfully updated ${namecollection}/${docId} with labels: `,
        topDescriptions
      );
      return null;
    } catch (error) {
      console.error("Error updating document with labels:", error);
      return null;
    }
  });
