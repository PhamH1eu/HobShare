const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig"); // Neo4j config file
const axios = require("axios");

const geminiconfig = functions.config().gemini;

exports.onUserUpdateActivity = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const beforeData = change.before.data();
    const afterData = change.after.data();
    const userId = context.params.userId;

    // Check if the 'favorite' field was updated
    if (beforeData.favorite === afterData.favorite) {
      return null; // No changes in the favorite field
    }

    const updatedFavorites = afterData.favorite;

    if (!updatedFavorites || !Array.isArray(updatedFavorites)) {
      return null; // Favorite field is empty or not an array
    }

    // Extract the "formatted_caption" from each object in the favorite array
    const formattedCaptions = updatedFavorites
      .filter((fav) => fav.formatted_capption) // Only take objects with a formatted_caption key
      .map((fav) => fav.formatted_capption); // Extract the formatted_caption value

    const apiKey = geminiconfig.api_key;
    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent`;

    const response = await axios.post(
      geminiApiUrl,
      {
        content: {
          parts: [
            {
              text: formattedCaptions.join(" "),
            },
          ],
        },
        outputDimensionality: 256,
      },
      {
        params: {
          key: apiKey,
        },
      }
    );
    // Sync the formatted captions array back to the Neo4j user node
    const session = neo4jDriver.session();
    try {
      await session.run(
        `
          MERGE (u:User {id: $userId})
          SET u.favoriteCaptions = $formattedCaptions,
              u.embedding = $embedding
        `,
        { userId, embedding: response.data.embedding.values || [], formattedCaptions }
      );

      console.log(`Updated favorite captions for user ${userId} in Neo4j.`);
    } catch (error) {
      console.error("Error updating user in Neo4j:", error);
    } finally {
      await session.close();
    }

    return null;
  });
