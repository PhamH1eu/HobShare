const functions = require("firebase-functions");
const admin = require("firebase-admin");
const neo4jDriver = require("../util/neo4jconfig"); // Neo4j config file

exports.onMemberLeft = functions.firestore
  .document("groups/{groupId}/members/{userId}")
  .onDelete(async (snap, context) => {
    const groupId = context.params.groupId;
    const userId = context.params.userId;

    // Neo4j session
    const session = neo4jDriver.session();
    const db = admin.firestore();

    try {
      // Remove the relationship between the User and Group in Neo4j
      await session.run(
        `
          MATCH (u:User {id: $userId})-[r:MEMBER_OF]->(g:Group {id: $groupId})
          DELETE r
        `,
        {
          userId: userId,
          groupId: groupId,
        }
      );

      console.log(
        `Removed MEMBER_OF relationship between User ${userId} and Group ${groupId}`
      );

      // Delete the document from users/{userId}/joinedgroups/{groupId} in Firestore
      const joinedGroupRef = db.doc(`users/${userId}/joinedgroups/${groupId}`);
      await joinedGroupRef.delete();

      console.log(
        `Deleted document at users/${userId}/joinedgroups/${groupId}`
      );
    } catch (error) {
      console.error(
        "Error removing relationship in Neo4j or Firestore:",
        error
      );
    } finally {
      await session.close();
    }

    return null;
  });
