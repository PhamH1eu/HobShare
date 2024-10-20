const functions = require("firebase-functions");
const admin = require("firebase-admin");
const neo4jDriver = require("../util/neo4jconfig"); // Ensure this points to your Neo4j driver setup

// Firestore Trigger: When a 'like' document is deleted
exports.onLikeDeleted = functions.firestore
  .document("posts/{postId}/like/{userId}")
  .onDelete(async (snap, context) => {
    const session = neo4jDriver.session();
    const userId = context.params.userId;
    const postId = context.params.postId;

    try {
      const postRef = admin.firestore().collection("posts").doc(postId);
      const postSnapshot = await postRef.get();
      const postData = postSnapshot.data();
      const groupId = postData.groupId || null;
      const authorId = postData.authorId;

      await postRef.update({
        priority: admin.firestore.FieldValue.increment(-0.1),
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
      console.error("Error decreasing affinity on like deletion:", error);
    } finally {
      await session.close();
    }
  });
