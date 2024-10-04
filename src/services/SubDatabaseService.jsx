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
  writeBatch,
  getCountFromServer,
  where,
  Timestamp,
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

  batchWrite = async (path, data) => {
    const batch = writeBatch(db);
    data.forEach((item) => {
      const docRef = doc(db, this.collection, `${path}/${item.receiverId}`);
      batch.set(docRef, {
        userId: item.receiverId,
        username: item.receiverName,
        avatar: item.receiverAvatar,
      });
    });
    return await batch.commit();
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

  updateDocument = async (path, obj) => {
    const docRef = doc(db, this.collection, path);

    await updateDoc(docRef, obj);
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
    if (docSnap.exists()) {
      return docSnap.data();
    } else return null;
  };

  getAll = async () => {
    const q = collection(db, this.collection);
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  };

  getAllSubCollection = async (path) => {
    const q = query(collection(db, this.collection, path));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
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

  count = async (path) => {
    const q = collection(db, this.collection, path);
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  queryByDate = async (path, range) => {
    const now = new Date();
    const rangeAgo = new Date(now);
    rangeAgo.setDate(now.getDate() - range);
    const startOfDay = new Date(rangeAgo);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(rangeAgo);
    endOfDay.setHours(23, 59, 59, 999);
    const startOfDayTimestamp = Timestamp.fromDate(startOfDay);
    const endOfDayTimestamp = Timestamp.fromDate(endOfDay);
    const postsQuery = query(
      collection(db, this.collection, path),
      where("createdAt", ">=", startOfDayTimestamp),
      where("createdAt", "<=", endOfDayTimestamp)
    );
    const querySnapshot = await getDocs(postsQuery);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  };
}

export const SavedService = new SubDatabaseService("saved");

export const PostService = new SubDatabaseService("posts");

export const NotificationService = new SubDatabaseService("notifications");

export const ChatService = new SubDatabaseService("userchats");

export const GroupService = new SubDatabaseService("groups");

export const UserService = new SubDatabaseService("users");

export const HashtagService = new SubDatabaseService("hashtag");

export const PopularHashtagService = new SubDatabaseService("populartags");
