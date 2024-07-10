import { db } from "../lib/firebase";
import {
  doc,
  setDoc,
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

class DatabaseService {
  collection;

  constructor(collectionName) {
    this.collection = collectionName;
  }

  get = async (id) => {
    const docRef = doc(db, this.collection, id);
    return await getDoc(docRef);
  }

  // save a new document in the database
  create = async (data, id) => {
    if (id) {
      return await setDoc(doc(db, this.collection, id), {
        ...data,
        createdAt: serverTimestamp(),
      });
    } else {
      return await addDoc(collection(db, this.collection), {
        ...data,
        createdAt: serverTimestamp(),
      });
    }
  };

  // update an existing document with new data
  update = async (id, values) => {
    const docRef = doc(db, this.collection, id);
    return await updateDoc(docRef, { ...values, updatedAt: serverTimestamp() });
  };
}

export const UserService = new DatabaseService("users");

export const ChatService = new DatabaseService("userchats");
