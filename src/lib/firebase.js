import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-3358f.firebaseapp.com",
  projectId: "reactchat-3358f",
  storageBucket: "reactchat-3358f.appspot.com",
  messagingSenderId: "609784046145",
  appId: "1:609784046145:web:c64666456b59b8f9cd5cc0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
