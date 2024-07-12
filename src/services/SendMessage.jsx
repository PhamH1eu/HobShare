import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "src/lib/firebase";
import upload from "src/shared/helper/upload";

export default async function SendMessage(currentUser, chatId, text, imgList) {
  // //ko cho phép bấm send khi ko có gì
  // if (text === "" && img.file == null) return;

  // let imgUrl = null;

  // try {
  //   if (img.file) {
  //     imgUrl = await upload(img.file);
  //   }

  //   //thêm vào mảng messages của chat
  //   await updateDoc(doc(db, "chats", chatId), {
  //     messages: arrayUnion({
  //       senderId: currentUser.id,
  //       text,
  //       createdAt: new Date(),
  //       ...(imgUrl && { img: imgUrl }),
  //     }),
  //   });
  // } catch (err) {
  //   console.error(err);
  // }
  
  //ko cho phép bấm send khi ko có gì
  //check video more
  if (text === "" && imgList.length == 0) return;

  try {
    const imgUrl = await Promise.all(
      imgList.map(async (img) => await upload(img.file))
    );

    //thêm vào mảng messages của chat
    await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion({
        senderId: currentUser.id,
        text,
        createdAt: new Date(),
        ...(imgUrl && { img: imgUrl }),
        //add a video url here
      }),
    });
  } catch (err) {
    console.error(err);
  }
}
