const admin = require("firebase-admin");
const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig");
const axios = require("axios");

const geminiconfig = functions.config().gemini;

exports.onPostCreated = functions.firestore
  .document("posts/{postId}")
  .onCreate(async (snap, context) => {
    const db = admin.firestore();
    const postId = context.params.postId;
    const data = snap.data();

    const session = neo4jDriver.session();

    // Check if tags exist and are an array
    if (data.tags && Array.isArray(data.tags)) {
      const promises = data.tags.map(async (tag) => {
        const hashtagRef = db.doc(`hashtag/${tag}/posts/${postId}`);
        return hashtagRef.set({
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          postId: postId,
        });
      });

      const promiseCreateTags = data.tags.map(async (tag) => {
        const tagRef = db.doc(`hashtag/${tag}`);
        return tagRef.set({
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          tag: tag,
        });
      });

      // Wait for all the tag document creations to complete
      await Promise.all([...promises, ...promiseCreateTags]);
    }

    const apiKey = geminiconfig.api_key;
    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent`;

    var embedding;
    if (!data.hasImage) {
      const response = await axios.post(
        geminiApiUrl,
        {
          content: {
            parts: [
              {
                text: data.text,
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
      embedding = response.data.embedding.values;
    }

    try {
      const createdAtISO = data.createdAt.toDate().toISOString();
      if (data.groupId) {
        // Create Post node and link to Group node
        await session.run(
          `
            MATCH (g:Group {id: $groupId})
            CREATE (p:Post {id: $postId, embedding: $embedding, createdAt: $createdAtISO})
            CREATE (g)-[:HAVE]->(p)
          `,
          {
            groupId: data.groupId,
            postId: postId,
            embedding: embedding || [],
            createdAtISO: createdAtISO,
          }
        );
      } else {
        // Create Post node and link to User node
        await session.run(
          `
            MATCH (u:User {id: $userId})
            CREATE (p:Post {id: $postId, embedding: $embedding, createdAt: $createdAtISO})
            CREATE (u)-[:WRITE]->(p)
          `,
          {
            userId: data.authorId,
            postId: postId,
            embedding: embedding || [],
            createdAtISO: createdAtISO,
          }
        );
      }
    } catch (error) {
      console.error("Error updating document with labels", error);
    } finally {
      await session.close();
    }

    return null;
  });
