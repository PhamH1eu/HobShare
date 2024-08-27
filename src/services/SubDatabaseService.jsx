import { db } from "../lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  arrayUnion,
  arrayRemove,
  getDocs,
  query,
  deleteDoc,
  runTransaction,
  serverTimestamp,
  orderBy,
  limit,
  startAfter,
  startAt,
  endBefore,
  DocumentSnapshot,
} from "firebase/firestore";

class SubDatabaseService {
  collection;

  constructor(collectionName) {
    this.collection = collectionName;
  }

  createSubCollection = async (path, data) => {
    return await setDoc(doc(db, this.collection, path), {
      ...data,
      createdAt: serverTimestamp(),
    });
  };

  updateSubCollection = async (path, data, value) => {
    const docRef = doc(db, this.collection, path);

    await runTransaction(db, async (transaction) => {
      const doc = await transaction.get(docRef);
      if (!doc.exists()) {
        throw "Document does not exist!";
      }

      transaction.update(docRef, { [data]: value });
    });
  };

  removeSubCollection = async (path) => {
    const docRef = doc(db, this.collection, path);
    return await deleteDoc(docRef);
  };

  removeCollection = async (path) => {
    const q = query(collection(db, this.collection, path));
    const querySnapshot = await getDocs(q);
    const parallel = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(parallel);
    return;
  };

  checkExistSubCollection = async (path) => {
    const docRef = doc(db, this.collection, path);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  };

  getDocument = async (path) => {
    const docRef = doc(db, this.collection, path);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
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

  getSubCollectionWithLimit = async (path, quantity) => {
    const q = query(
      collection(db, this.collection, path),
      orderBy("createdAt", "desc"),
      limit(quantity)
    );
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  };

  loadMoreSubCollection = async (path, quantity, lastDocTimestamp) => {
    const q = query(
      collection(db, this.collection, path),
      orderBy("createdAt", "desc"),
      startAfter(lastDocTimestamp),
      limit(quantity)
    );
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  };

  addDataToArray = async (path, data, value) => {
    const docRef = doc(db, this.collection, path);
    return await updateDoc(docRef, {
      [data]: arrayUnion(value),
    });
  };

  removeDataFromArray = async (path, data, value) => {
    const docRef = doc(db, this.collection, path);
    return await updateDoc(docRef, {
      [data]: arrayRemove(value),
    });
  };
}

export const SavedService = new SubDatabaseService("saved");

export const PostService = new SubDatabaseService("posts");
