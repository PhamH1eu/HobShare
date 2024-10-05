const admin = require("firebase-admin");
const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig");

exports.recommendGroups = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    console.log("Unauthenticated request");
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Request must be authenticated."
    );
  }

  const userId = context.auth.uid;
  console.log("Authenticated user:", userId);
  
  const session = neo4jDriver.session();

  try {
    const result = await session.run(
      `
            MATCH (u1:User {id: $userId})-[:FRIEND]->(u2:User)
            WITH u1, u2,
                apoc.coll.toSet(u1.favoriteCaptions) AS u1Captions,
                apoc.coll.toSet(u2.favoriteCaptions) AS u2Captions
            WITH u1, u2,
                apoc.coll.intersection(u1Captions, u2Captions) AS intersection,
                apoc.coll.union(u1Captions, u2Captions) AS union
            WITH u1, u2,
                size(intersection) * 1.0 / size(union) AS jaccardIndex
            WHERE jaccardIndex > 0
            WITH u1, collect(u2) as topUsers
            UNWIND topUsers as similarUser
            MATCH (similarUser)-[:MEMBER_OF]->(g:Group)
            WHERE NOT (u1)-[:MEMBER_OF]->(g)
            RETURN g.id AS groupId, g.name AS groupName, g.wallpaper AS wallpaper, count(similarUser) AS memberCount
            ORDER BY memberCount DESC, g.name
            LIMIT 10;
        `,
      { userId }
    );

    // Process results and convert Neo4j integers
    const recommendedGroups = result.records.map((record) => ({
      groupId: record.get("groupId"),
      groupName: record.get("groupName"),
      memberCount: record.get("memberCount").toInt(), // Convert Neo4j Integer to JavaScript integer
      wallpaper: record.get("wallpaper"),
    }));

    console.log("Recommended Groups:", recommendedGroups);
    return { recommendedGroups };
  } catch (error) {
    console.error("Error recommending groups:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Error recommending groups"
    );
  } finally {
    session.close();
  }
});
