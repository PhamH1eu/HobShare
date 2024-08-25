import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { db } from "src/lib/firebase";
import upload from "src/shared/helper/upload";
import truncateString from "src/shared/helper/truncateString";

export default async function SendMessage(
  currentUser,
  chatId,
  text,
  imgList,
  videoList,
  post
) {
  if (text === "" && imgList.length == 0 && videoList.length == 0 && !post)
    return;

  try {
    const [imgUrl, videoUrl] = await Promise.all([
      Promise.all(imgList.map(async (img) => await upload(img.file))),
      Promise.all(videoList.map(async (video) => await upload(video.file))),
    ]);
    //thêm vào mảng messages của chat
    await addDoc(collection(db, `chats/${chatId}/messages`), {
      senderId: currentUser.id,
      senderAvatar: currentUser.avatar,
      text,
      sendAt: serverTimestamp(),
      ...(imgUrl.length > 0 && { img: imgUrl }),
      ...(videoUrl.length > 0 && { video: videoUrl }),
      ...(post && {
        postShared: {
          id: post.id,
          author: post.authorName,
          ...(post.text && { text: truncateString(post.text, 20) }),
          ...(post.image && { img: post.image }),
          ...(post.video && { video: post.video }),
        },
      }),
    });
  } catch (err) {
    console.error(err);
  }
}
