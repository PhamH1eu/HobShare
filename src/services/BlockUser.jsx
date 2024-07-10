import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "src/lib/firebase";

export default async function BlockUser(user, isReceiverBlocked, currentUser) {
  if (!user) return;

  const userDocRef = doc(db, "users", currentUser.id);

  try {
    await updateDoc(userDocRef, {
      blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
    });
  } catch (err) {
    console.log(err);
  }
}
