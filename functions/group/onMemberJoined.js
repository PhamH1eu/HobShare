const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig"); // Neo4j config file

exports.onMemberJoined = functions.firestore
  .document("groups/{groupId}/members/{userId}")
  .onCreate(async (snap, context) => {
    const groupId = context.params.groupId;
    const userId = context.params.userId;

    // Neo4j session
    const session = neo4jDriver.session();

    try {
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

      console.log(`Created MEMBER_OF relationship between User ${userId} and Group ${groupId}`);
    } catch (error) {
      console.error("Error creating relationship in Neo4j:", error);
    } finally {
      await session.close();
    }

    return null;
  });
