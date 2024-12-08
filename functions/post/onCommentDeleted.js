const functions = require("firebase-functions");
const admin = require("firebase-admin");
const neo4jDriver = require("../util/neo4jconfig"); // Ensure this points to your Neo4j driver setup

// Firestore Trigger: When a 'comment' document is deleted
exports.onCommentDeleted = functions
  .region("asia-southeast1")
  .firestore.document("posts/{postId}/comments/{comId}")
  .onDelete(async (snap, context) => {
    const session = neo4jDriver.session();
    const postId = context.params.postId;

    try {
      const commentSnapshot = snap.data(); // The deleted comment document data
      const userId = commentSnapshot.userId;

      const postRef = admin.firestore().collection("posts").doc(postId);
      const postSnapshot = await postRef.get();
      const postData = postSnapshot.data();
      const groupId = postData.groupId || null;
      const authorId = postData.authorId;

      await postRef.update({
        priority: admin.firestore.FieldValue.increment(-0.2),
      });

      // Determine target node (either a group or an author)
      const targetId = groupId ? groupId : authorId;
      const targetLabel = groupId ? "Group" : "User";

      // Decrease affinity by 0.1
      await session.run(
        `
        MATCH (u:User {id: $userId})-[r:AFFINITY]->(t:${targetLabel} {id: $targetId})
        SET r.affinity = r.affinity - 0.1
        WHERE r.affinity > 0
        RETURN r
        `,
        { userId, targetId }
      );
    } catch (error) {
      console.error("Error decreasing affinity on comment deletion:", error);
    } finally {
      await session.close();
    }
  });
