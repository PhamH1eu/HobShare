const admin = require("firebase-admin");
const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig");

exports.recommendGroups = functions
  .region("asia-southeast1")
  .https.onCall(async (data, context) => {
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
      // Step 1: Check if the user has any friends
      const friendCheckQuery = `
      MATCH (u1:User {id: $userId})-[:FRIEND]->(u2:User)
      RETURN COUNT(u2) AS friendCount;
    `;

      const friendCheckResult = await session.run(friendCheckQuery, { userId });
      const friendCount = friendCheckResult.records[0]
        .get("friendCount")
        .toInt();

      let recommendedGroups = [];

      // Step 2: If the user has friends, recommend groups based on friends' memberships
      if (friendCount > 0) {
        const groupRecommendationQuery = `
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
        WITH u1, collect(u2) AS topUsers
        UNWIND topUsers AS similarUser
        MATCH (similarUser)-[:MEMBER_OF]->(g:Group)
        WHERE NOT (u1)-[:MEMBER_OF]->(g)
        WITH g
        MATCH (g)<-[:MEMBER_OF]-(allMembers:User) 
        RETURN g.id AS groupId, 
              g.name AS groupName, 
              g.wallpaper AS wallpaper, 
              count(allMembers) AS memberCount    
        ORDER BY memberCount DESC, g.name
        LIMIT 10;
      `;

        const result = await session.run(groupRecommendationQuery, { userId });

        recommendedGroups = result.records.map((record) => ({
          groupId: record.get("groupId"),
          groupName: record.get("groupName"),
          memberCount: record.get("memberCount").toInt(),
          wallpaper: record.get("wallpaper"),
        }));
      } else {
        // Step 3: If the user has no friends, recommend groups with the most members
        const popularGroupQuery = `
        MATCH (g:Group)
        RETURN g.id AS groupId, g.name AS groupName, g.wallpaper AS wallpaper, size((g)<-[:MEMBER_OF]-()) AS memberCount
        ORDER BY memberCount DESC, g.name
        LIMIT 10;
      `;

        const result = await session.run(popularGroupQuery);

        recommendedGroups = result.records.map((record) => ({
          groupId: record.get("groupId"),
          groupName: record.get("groupName"),
          memberCount: record.get("memberCount").toInt(),
          wallpaper: record.get("wallpaper"),
        }));
      }

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
