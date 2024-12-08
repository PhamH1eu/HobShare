const functions = require("firebase-functions");
const admin = require("firebase-admin");
const neo4jDriver = require("../util/neo4jconfig"); // Neo4j config file

exports.onMemberJoined = functions
  .region("asia-southeast1")
  .firestore.document("groups/{groupId}/members/{userId}")
  .onCreate(async (snap, context) => {
    const groupId = context.params.groupId;
    const userId = context.params.userId;

    // Firestore database reference
    const db = admin.firestore();

    // Neo4j session
    const session = neo4jDriver.session();

    try {
      // Fetch group information from Firestore
      const groupDoc = await db.doc(`groups/${groupId}`).get();
      if (!groupDoc.exists) {
        throw new Error(`Group ${groupId} does not exist`);
      }

      const groupData = groupDoc.data();
      const name = groupData.name;
      const wallpaper = groupData.wallpaper;

      // Set the document at users/{userId}/joinedgroups/{groupId}
      await db.doc(`users/${userId}/joinedgroups/${groupId}`).set({
        groupId: groupId,
        name: name,
        wallpaper: wallpaper,
      });

      console.log(
        `Created document at users/${userId}/joinedgroups/${groupId}`
      );

      // Create relationship between User and Group in Neo4j
      await session.run(
        `
          MATCH (u:User {id: $userId}), (g:Group {id: $groupId})
          CREATE (u)-[:MEMBER_OF]->(g)
        `,
        {
          userId: userId,
          groupId: groupId,
        }
      );

      console.log(
        `Created MEMBER_OF relationship between User ${userId} and Group ${groupId}`
      );
    } catch (error) {
      console.error(
        "Error creating relationship in Neo4j or Firestore:",
        error
      );
    } finally {
      await session.close();
    }

    return null;
  });
