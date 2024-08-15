import { auth } from "./firebase";
import { database } from "./firebase";
import { ref, set, onValue, onDisconnect } from "firebase/database";
import { serverTimestamp } from "firebase/database";

const useStatus = () => {
  var uid = auth.currentUser?.uid;

  // Create a reference to this user's specific status node.
  // This is where we will store data about being online/offline.
  var userStatusDatabaseRef = ref(database, "/status/" + uid);

  // We'll create two constants which we will write to
  // the Realtime database when this device is offline
  // or online.
  var isOfflineForDatabase = {
    state: "offline",
    last_changed: serverTimestamp(),
  };

  var isOnlineForDatabase = {
    state: "online",
    last_changed: serverTimestamp(),
  };

  // Create a reference to the special '.info/connected' path in
  // Realtime Database. This path returns `true` when connected
  // and `false` when disconnected.
  onValue(ref(database, ".info/connected"), (snapshot) => {
    // If we're not currently connected, don't do anything.
    if (snapshot.val() == false) {
      return;
    }

    // If we are currently connected, then use the 'onDisconnect()'
    // method to add a set which will only trigger once this
    // client has disconnected by closing the app,
    // losing internet, or any other means.
    onDisconnect(userStatusDatabaseRef)
      .set(isOfflineForDatabase)
      .then(function () {
        // The promise returned from .onDisconnect().set() will
        // resolve as soon as the server acknowledges the onDisconnect()
        // request, NOT once we've actually disconnected:
        // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

        // We can now safely set ourselves as 'online' knowing that the
        // server will mark us as offline once we lose connection.
        set(userStatusDatabaseRef, isOnlineForDatabase);
      });
  });
};

export default useStatus;
