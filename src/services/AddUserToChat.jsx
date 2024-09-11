import { db } from "src/lib/firebase";
import {
  collection,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export default async function AddUserToChat(targetUser, currentUser) {
  const chatRef = collection(db, "chats");

  try {
    const newChatRef = doc(chatRef);

    await setDoc(newChatRef, {
      createdAt: serverTimestamp(),
      participants: [targetUser.id, currentUser.id],
    });

    await setDoc(doc(db, "userchats", targetUser.id, "chat", newChatRef.id), {
      chatId: newChatRef.id,
      lastMessage: "",
      receiverId: currentUser.id,
      receiverName: currentUser.username,
      receiverAvatar: currentUser.avatar,
      createdAt: Date.now(),
    });

    await setDoc(doc(db, "userchats", currentUser.id, "chat", newChatRef.id), {
      chatId: newChatRef.id,
      lastMessage: "",
      receiverId: targetUser.id,
      receiverName: targetUser.username,
      receiverAvatar: targetUser.avatar,
      createdAt: Date.now(),
    });
  } catch (error) {
    console.log(error);
  }
}
