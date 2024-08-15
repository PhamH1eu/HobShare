import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  persistentMultipleTabManager,
  initializeFirestore,
  persistentLocalCache
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // @ts-ignore
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-3358f.firebaseapp.com",
  projectId: "reactchat-3358f",
  storageBucket: "reactchat-3358f.appspot.com",
  messagingSenderId: "609784046145",
  appId: "1:609784046145:web:c64666456b59b8f9cd5cc0",
  databaseURL: "https://reactchat-3358f-default-rtdb.asia-southeast1.firebasedatabase.app"
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
