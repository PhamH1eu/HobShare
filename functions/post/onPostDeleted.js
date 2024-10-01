const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig"); // Your Neo4j config file

exports.onPostDeleted = functions.firestore
  .document("posts/{postId}")
  .onDelete(async (snap, context) => {
    const postId = context.params.postId;

    const session = neo4jDriver.session();

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
    } catch (error) {
      console.error("Error deleting post from Neo4j:", error);
    } finally {
      await session.close();
    }

    return null;
  });
