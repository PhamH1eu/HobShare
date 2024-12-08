const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig");
const admin = require("firebase-admin");

exports.onGroupCreated = functions
  .region("asia-southeast1")
  .firestore.document("groups/{groupId}")
  .onCreate(async (snap, context) => {
    const groupId = context.params.groupId;
    const groupData = snap.data();
    const admins = groupData.admins;

    // Ensure group data exists
    if (!groupData) {
      console.error("Group data not found!");
      return null;
    }

    // Neo4j session
    const session = neo4jDriver.session();

    try {
      // Create the Group node in Neo4j
      await session.run(
        `
          CREATE (g:Group {id: $groupId, name: $name, wallpaper: $wallpaper , description: $description})
        `,
        {
          groupId: groupId,
          name: groupData.name || null, // Assuming there is a name field
          description: groupData.description || null, // Assuming there is a description field
          wallpaper: groupData.wallpaper || null, // Assuming there is a wallpaper field
        }
      );
      console.log(`Group node with ID ${groupId} created in Neo4j`);

      if (admins && Array.isArray(admins)) {
        const adminPromises = admins.map(async (adminItem) => {
          const userId = adminItem.userId; // Extract userId from the admin object
          const newAdminDocRef = admin
            .firestore()
            .doc(`users/${userId}/admingroups/${groupId}`);
          const batch = admin.firestore().batch();
          batch.set(newAdminDocRef, {
            wallpaper: groupData.wallpaper,
            name: groupData.name,
            groupId: groupId,
          });
          await batch.commit();

          if (userId) {
            return session.run(
              `
              MATCH (g:Group {id: $groupId}), (u:User {id: $userId})
              CREATE (u)-[:MEMBER_OF]->(g)
              `,
              { groupId, userId }
            );
          } else {
            console.warn(
              `Admin object missing userId: ${JSON.stringify(adminItem)}`
            );
            return null;
          }
        });

        // Wait for all relationships to be created
        await Promise.all(adminPromises);
        console.log(`Admin relationships created for groupId: ${groupId}`);
      }
    } catch (error) {
      console.error("Error creating group node in Neo4j:", error);
    } finally {
      await session.close();
    }

    return null;
  });
