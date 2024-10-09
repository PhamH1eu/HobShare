const functions = require("firebase-functions");
const admin = require("firebase-admin");
const neo4jDriver = require("../util/neo4jconfig"); // Ensure this points to your Neo4j driver setup

exports.onGroupDeleted = functions.firestore
  .document("groups/{groupId}")
  .onDelete(async (snap, context) => {
    const groupId = context.params.groupId;
    const groupData = snap.data();
    const session = neo4jDriver.session();

    try {
      // Initialize a batch to handle the deletions
      const batch = admin.firestore().batch();
      const adminRef = admin
        .firestore()
        .doc(`users/${groupData.admins[0].userId}/admingroups/${groupId}`);
      batch.delete(adminRef);
      // Get all posts under groups/{groupId}/posts/
      const postsSnapshot = await admin
        .firestore()
        .collection(`groups/${groupId}/posts`)
        .get();

      if (postsSnapshot.empty) {
        console.log(`No posts found for group ${groupId}`);
      } else {
        postsSnapshot.forEach((postDoc) => {
          const postId = postDoc.id;

          // Delete the post document in the global posts collection
          const postRef = admin.firestore().doc(`posts/${postId}`);
          batch.delete(postRef);

          console.log(`Marked post ${postId} for deletion.`);
        });

        // Commit the batch delete operation
        console.log(
          `Successfully deleted all posts related to group ${groupId}`
        );
      }
      
      await batch.commit();
      // Delete the group node in Neo4j
      await session.run(
        `
        MATCH (g:Group {id: $groupId})
        DETACH DELETE g
        `,
        { groupId }
      );

      console.log(`Successfully deleted group node ${groupId} in Neo4j.`);
    } catch (error) {
      console.error(`Error deleting posts or group ${groupId}:`, error);
    } finally {
      await session.close();
    }

    return null;
  });
