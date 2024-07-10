import { db } from "src/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function SearchUser(username) {
  try {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
  } catch (error) {
    console.log(error);
  }
}
