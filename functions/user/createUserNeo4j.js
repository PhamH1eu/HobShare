const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig");

exports.createUserNode = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snap, context) => {
    const userData = snap.data();
    const userId = context.params.userId; // Firestore user document ID

    const name = userData.username || ""; // Extract name field from Firestore
    const email = userData.email || ""; // Extract email field from Firestore
    const avatar = userData.avatar || "";

    const session = neo4jDriver.session();
    try {
      // Create the user node in Neo4j
      await session.run(
        `
                CREATE (u:User {id: $userId, name: $name, email: $email, avatar: $avatar})
                `,
        { userId, name, email, avatar }
      );

      console.log(`Neo4j user node created for userId: ${userId}`);
      return { success: true, message: "User node created in Neo4j" };
    } catch (error) {
      console.error("Error creating Neo4j user node:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Unable to create user node in Neo4j"
      );
    } finally {
      await session.close();
    }
  });
