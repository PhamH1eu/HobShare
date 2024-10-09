const functions = require("firebase-functions");
const admin = require("firebase-admin");
const neo4jDriver = require("../util/neo4jconfig"); // Neo4j config file

exports.onAdminUpdated = functions.firestore
  .document("groups/{groupId}")
  .onUpdate(async (change, context) => {
    const groupId = context.params.groupId;
    const groupData = change.after.data();

    const beforeAdmins = change.before.data().admins || [];
    const afterAdmins = change.after.data().admins || [];

    if (beforeAdmins.length === 0 && afterAdmins.length === 0) {
      console.log("No admin changes detected.");
      return null;
    }

    // Extract the old and new admin information
    const oldAdmin = beforeAdmins[0]; // Assuming only one admin exists at a time
    const newAdmin = afterAdmins[0]; // Assuming only one admin exists at a time

    // Check if admin has changed
    if (oldAdmin && newAdmin && oldAdmin.userId === newAdmin.userId) {
      console.log("No change in admin detected.");
      return null;
    }

    const batch = admin.firestore().batch();
    const session = neo4jDriver.session(); // Start a Neo4j session

    try {
      // If there's an old admin, delete their admin doc and remove the relationship in Neo4j
      if (oldAdmin && oldAdmin.userId) {
        const oldAdminDocRef = admin.firestore().doc(
          `users/${oldAdmin.userId}/admingroups/${groupId}`
        );
        batch.delete(oldAdminDocRef);
        console.log(`Deleted admin document for user: ${oldAdmin.userId}`);

        // Remove MEMBER_OF relationship in Neo4j
        await session.run(
          `
            MATCH (u:User {id: $oldUserId})-[r:MEMBER_OF]->(g:Group {id: $groupId})
            DELETE r
          `,
          { oldUserId: oldAdmin.userId, groupId: groupId }
        );
        console.log(
          `Removed MEMBER_OF relationship between old admin and group: ${groupId}`
        );
      }

      // If there's a new admin, add their admin doc and create the relationship in Neo4j
      if (newAdmin && newAdmin.userId) {
        const newAdminDocRef = admin.firestore().doc(
          `users/${newAdmin.userId}/admingroups/${groupId}`
        );
        batch.set(newAdminDocRef, {
          wallpaper: groupData.wallpaper,
          name: groupData.name,
          groupId: groupId,
        });
        console.log(`Added admin document for user: ${newAdmin.userId}`);

        // Also remove the new admin from their joinedgroups collection
        const newAdminJoinedGroupRef = admin.firestore().doc(
          `users/${newAdmin.userId}/joinedgroups/${groupId}`
        );
        batch.delete(newAdminJoinedGroupRef);
        console.log(
          `Removed joined group document for new admin: ${newAdmin.userId}`
        );

        // Remove the new admin from the group's members collection
        const groupMemberDocRef = admin.firestore().doc(
          `groups/${groupId}/members/${newAdmin.userId}`
        );
        batch.delete(groupMemberDocRef);
        console.log(
          `Removed member document from group for new admin: ${newAdmin.userId}`
        );

        // Create MEMBER_OF relationship in Neo4j for the new admin
        await session.run(
          `
            MATCH (u:User {id: $newUserId}), (g:Group {id: $groupId})
            CREATE (u)-[:MEMBER_OF]->(g)
          `,
          { newUserId: newAdmin.userId, groupId: groupId }
        );
        console.log(
          `Created MEMBER_OF relationship between new admin and group: ${groupId}`
        );
      }

      // Commit the batched writes in Firestore
      await batch.commit();
      console.log("Admin change handled successfully.");
    } catch (error) {
      console.error("Error processing admin update:", error);
    } finally {
      await session.close(); // Close the Neo4j session
    }

    return null;
  });
