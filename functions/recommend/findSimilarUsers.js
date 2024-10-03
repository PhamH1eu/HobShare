const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig");

const jaccardSimilarityQuery = `
MATCH (u1:User {id: "XB0sIFdXOmN3waXjQE7kzSyVNyo2"})
WITH u1

// Find users that are not friends and have favorite captions
MATCH (u2:User)
WHERE NOT (u1)-[:FRIEND]->(u2) AND u1.id <> u2.id AND u2.favoriteCaptions IS NOT NULL AND size(u2.favoriteCaptions) > 0

// Convert favoriteCaptions to sets
WITH u1, u2,
    apoc.coll.toSet(u1.favoriteCaptions) AS u1Captions,
    apoc.coll.toSet(u2.favoriteCaptions) AS u2Captions

// Calculate intersection and union
WITH u1, u2,
    apoc.coll.intersection(u1Captions, u2Captions) AS intersection,
    apoc.coll.union(u1Captions, u2Captions) AS union

// Calculate Jaccard index
WITH u1, u2, 
    size(intersection) * 1.0 / size(union) AS jaccardIndex
WHERE jaccardIndex > 0  // Optional: Only return results with some similarity

// Return results
RETURN u2.id AS similarUser, jaccardIndex
ORDER BY jaccardIndex DESC
LIMIT 10;

`;

exports.findSimilarUsers = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Request must be authenticated."
    );
  }

  const currentUserId = context.auth.uid;

  const session = neo4jDriver.session();

  try {
    // Run the query to find similar users based on Jaccard similarity
    const result = await session.run(jaccardSimilarityQuery, {
      currentUserId: currentUserId,
    });

    // Process the results
    const similarUsers = result.records.map((record) => ({
      id: record.get("similarUser"), // Use "id" instead of "userId"
      similarity: record.get("jaccardIndex"),
    }));

    return { similarUsers };
  } catch (error) {
    console.error("Error finding similar users:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to find similar users."
    );
  } finally {
    await session.close();
  }
});
