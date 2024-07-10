import { db } from "src/lib/firebase";
import {
  collection,
  setDoc,
  doc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export default async function AddUserToChat(targetUser, currentUser) {
  const chatRef = collection(db, "chats");
  const userChatRef = collection(db, "userchats");

  try {
    const newChatRef = doc(chatRef);

    await setDoc(newChatRef, {
      createdAt: serverTimestamp(),
      messages: [],
    });

    await updateDoc(doc(userChatRef, targetUser.id), {
      chats: arrayUnion({
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: currentUser.id,
        createdAt: Date.now(),
      }),
    });

    await updateDoc(doc(userChatRef, currentUser.id), {
      chats: arrayUnion({
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: targetUser.id,
        createdAt: Date.now(),
      }),
    });
  } catch (error) {
    console.log(error);
  }
}
