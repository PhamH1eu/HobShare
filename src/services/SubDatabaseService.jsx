import { db } from "../lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

class SubDatabaseService {
  collection;

  constructor(collectionName) {
    this.collection = collectionName;
  }

  createSubCollection = async (path, data) => {
    return await setDoc(doc(db, this.collection, path), data);
  };

  removeSubCollection = async (path) => {
    const docRef = doc(db, this.collection, path);
    return await deleteDoc(docRef);
  };

  checkExistSubCollection = async (path) => {
    const docRef = doc(db, this.collection, path);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  };

  getAllSubCollection = async (path) => {
    const q = query(collection(db, this.collection, path));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  };
}

export const SavedService = new SubDatabaseService("saved");
