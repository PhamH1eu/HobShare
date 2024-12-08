const functions = require("firebase-functions");
const admin = require("firebase-admin");
const neo4jDriver = require("../util/neo4jconfig"); // Your Neo4j config file

exports.onPostDeleted = functions
  .region("asia-southeast1")
  .firestore.document("posts/{postId}")
  .onDelete(async (snap, context) => {
    const postId = context.params.postId;
    const data = snap.data();

    const session = neo4jDriver.session();
    const db = admin.firestore();

    try {
      // Delete the post node in Neo4j
      await session.run(
        `
          MATCH (p:Post {id: $postId})
          DETACH DELETE p
        `,
        { postId }
      );

      console.log(`Post ${postId} deleted from Neo4j.`);

      // If the post belongs to a group, delete the post doc from the group's posts collection
      if (data.groupId) {
        const groupPostRef = db.doc(`groups/${data.groupId}/posts/${postId}`);
        await groupPostRef.delete();
        console.log(`Post ${postId} deleted from group ${data.groupId}.`);
      } else if (data.authorId) {
        // If no groupId, delete the post doc from the user's posts collection
        const userPostRef = db.doc(`users/${data.authorId}/posts/${postId}`);
        await userPostRef.delete();
        console.log(`Post ${postId} deleted from user ${data.authorId}.`);
      }
    } catch (error) {
      console.error("Error deleting post from Firestore or Neo4j:", error);
    } finally {
      await session.close();
    }

    return null;
  });
