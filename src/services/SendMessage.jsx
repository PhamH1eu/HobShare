import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "src/lib/firebase";
import upload from "src/shared/helper/upload";

export default async function SendMessage(
  currentUser,
  chatId,
  text,
  imgList,
  videoList
) {
  if (text === "" && imgList.length == 0 && videoList.length == 0) return;

  try {
    const [imgUrl, videoUrl] = await Promise.all([
      Promise.all(imgList.map(async (img) => await upload(img.file))),
      Promise.all(videoList.map(async (video) => await upload(video.file))),
    ]);

    //thêm vào mảng messages của chat
    await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion({
        senderId: currentUser.id,
        text,
        createdAt: new Date(),
        ...(imgUrl.length > 0 && { img: imgUrl }),
        ...(videoUrl.length > 0 && { video: videoUrl }),
        //add a video url here
      }),
    });
  } catch (err) {
    console.error(err);
  }
}
