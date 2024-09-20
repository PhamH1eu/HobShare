import {
  query,
  collection,
  where,
  orderBy,
  startAt,
  endAt,
  getDocs,
} from "firebase/firestore";
import { distanceBetween, geohashQueryBounds } from "geofire-common";
import { useQuery } from "react-query";
import { db } from "src/lib/firebase";

const useMapDistance = (radius, latitude, longitude) => {
  const { data: users, isLoading, isRefetching } = useQuery(["map", radius], async () => {
    const center = [latitude, longitude];
    const radiusInM = radius * 1000;

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
      const q = query(
        collection(db, "users"),
        where("location.denyExposingLocation", "==", false),
        orderBy("location.geohash"),
        startAt(b[0]),
        endAt(b[1])
      );

      promises.push(getDocs(q));
    }

    // Collect all the query results together into a single list
    const snapshots = await Promise.all(promises);

    const matchingDocs = [];
    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        const lat = doc.get("location.latitude");
        const lng = doc.get("location.longitude");

        // We have to filter out a few false positives due to GeoHash
        // accuracy, but most will match
        const distanceInKm = distanceBetween([lat, lng], center);
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= radiusInM) {
          matchingDocs.push(doc);
        }
      }
    }

    var data = [];
    matchingDocs.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  });

  return {
    users,
    isLoading,
    isRefetching
  };
};

export default useMapDistance;
