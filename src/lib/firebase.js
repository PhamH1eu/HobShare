import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  persistentMultipleTabManager,
  initializeFirestore,
  persistentLocalCache,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getMessaging, getToken } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyCbm7J9dowaJyngnO7EKu2jWg_sgpiEuzc",
  authDomain: "reactchat-3358f.firebaseapp.com",
  databaseURL:
    "https://reactchat-3358f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "reactchat-3358f",
  storageBucket: "reactchat-3358f.appspot.com",
  messagingSenderId: "609784046145",
  appId: "1:609784046145:web:c64666456b59b8f9cd5cc0",
};

const app = initializeApp(firebaseConfig);
initializeFirestore(app, {
  localCache: persistentLocalCache(
    /*settings*/ { tabManager: persistentMultipleTabManager() }
  ),
});

export const database = getDatabase(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    return;
  }
  const token = await getToken(messaging, {
    vapidKey:
      "BMJpJFxVk_jJtbT62xlYvlEgFAyyYqX00xL6F-ZOlj_ON-Hr8Ri0D8Wvp_EkjclMLPdqmlori77fUNC8neKUOCk",
  });
  console.log(token);
};