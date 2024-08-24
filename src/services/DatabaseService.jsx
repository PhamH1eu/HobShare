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
} from "firebase/firestore";

class DatabaseService {
  collection;

  constructor(collectionName) {
    this.collection = collectionName;
  }

  query = async (field, operator, value) => {
    const querySnapshot = await getDocs(
      query(collection(db, this.collection), where(field, operator, value))
    );
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  get = async (id) => {
    const docRef = doc(db, this.collection, id);
    return await getDoc(docRef);
  };

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

  // add a new value to an array field
  union = async (id, field, values) => {
    const docRef = doc(db, this.collection, id);
    return await updateDoc(docRef, {
      [field]: arrayUnion(values),
      updatedAt: serverTimestamp(),
    });
  };

  // remove a value from an array field
  removeFromArray = async (id, field, values) => {
    const docRef = doc(db, this.collection, id);
    return await updateDoc(docRef, {
      [field]: arrayRemove(values),
      updatedAt: serverTimestamp(),
    });
  };

  // delete a document by setting the deletedAt field
  delete = async (id) => {
    const docRef = doc(db, this.collection, id);
    return await updateDoc(docRef, { deletedAt: serverTimestamp() });
  };
}

export const UserService = new DatabaseService("users");

export const ChatService = new DatabaseService("userchats");

export const ActivitiesService = new DatabaseService("activities");
