const functions = require("firebase-functions");
const neo4jDriver = require("../util/neo4jconfig");
const admin = require("firebase-admin");
const { geohashQueryBounds, distanceBetween } = require("geofire-common");

exports.findSimilarUsers = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Request must be authenticated."
    );
  }
  const session = neo4jDriver.session();

  const currentUserId = context.auth.uid;

  // First, retrieve the current user's location from Firestore
  const userDoc = await admin
    .firestore()
    .collection("users")
    .doc(currentUserId)
    .get();

  const [sentRequestsSnapshot, friendRequestsSnapshot] = await Promise.all([
    admin.firestore().collection(`users/${currentUserId}/sentRequests`).get(),
    admin.firestore().collection(`users/${currentUserId}/friendRequests`).get(),
  ]);
  const sentRequests = sentRequestsSnapshot.docs.map((doc) => doc.id);
  const friendRequests = friendRequestsSnapshot.docs.map((doc) => doc.id);
  const excludedUsers = [...sentRequests, ...friendRequests, currentUserId]; // Include current user

  if (userDoc.data().favorite && userDoc.data().favorite.length > 0) {
    // If user has liked activity, perform Jaccard similarity in Neo4j
    const jaccardSimilarityQuery = `
      MATCH (u1:User {id: $currentUserId})
      WITH u1
      
      // Find users that are not friends and have favorite captions
      MATCH (u2:User)
      WHERE NOT (u1)-[:FRIEND]->(u2) 
        AND u1.id <> u2.id 
        AND NOT u2.id IN $excludedUsers 
        AND u2.favoriteCaptions IS NOT NULL 
        AND size(u2.favoriteCaptions) > 0
      
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
      LIMIT 5;
    `;

    try {
      // Run the query to find similar users based on Jaccard similarity
      const result = await session.run(jaccardSimilarityQuery, {
        currentUserId: currentUserId,
        excludedUsers: excludedUsers, // Pass the excluded users to the query
      });

      const similarUsers = result.records.map((record) => ({
        id: record.get("similarUser"),
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
  }

  // The rest of your function logic regarding location...
  const userLocation = userDoc.data().location;

  if (!userLocation || !userLocation.latitude || !userLocation.longitude) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "User location is missing or invalid."
    );
  }

  const latitude = userLocation.latitude;
  const longitude = userLocation.longitude;
  const radius = 2; // Define the search radius in km
  const center = [latitude, longitude];
  const radiusInM = radius * 1000;

  const bounds = geohashQueryBounds(center, radiusInM);
  const promises = [];
  for (const b of bounds) {
    const q = admin
      .firestore()
      .collection("users")
      .where("location.denyExposingLocation", "==", false)
      .orderBy("location.geohash")
      .startAt(b[0])
      .endAt(b[1]);

    promises.push(q.get());
  }

  const snapshots = await Promise.all(promises);

  const matchingDocs = [];
  for (const snap of snapshots) {
    snap.forEach((doc) => {
      const lat = doc.get("location.latitude");
      const lng = doc.get("location.longitude");
      const distanceInKm = distanceBetween([lat, lng], center);
      const distanceInM = distanceInKm * 1000;
      if (distanceInM <= radiusInM) {
        matchingDocs.push(doc);
      }
    });
  }

  try {
    const result = await session.run(
      `
        MATCH (user:User {id: $currentUserId})-[friendship:FRIEND]->(friend:User)
        RETURN friend.id AS friendId
      `,
      { currentUserId }
    );

    const friends = result.records.map((record) => record.get("friendId"));

    const nearestUsers = matchingDocs
      .filter((doc) => ![...excludedUsers, ...friends].includes(doc.id))
      .slice(0, 5)
      .map((doc) => ({
        id: doc.id,
        location: doc.data().location,
      }));

    if (nearestUsers.length > 0) {
      return { nearestUsers, basedOnLocation: true };
    }
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to fetch friends."
    );
  } finally {
    await session.close();
  }
});
