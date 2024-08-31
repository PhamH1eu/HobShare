import { ChatService } from "src/services/DatabaseService";

export default async function UpdateChat(currentUserId, userId, chatId, text) {
  //ID của 2 user trong chat
  const userIDs = [currentUserId, userId];
  //update lại last message, isSeen, updatedAt trong userchats của 2 user
  userIDs.forEach(async (id) => {
    const userChatsSnapshot = await ChatService.get(id);

    if (userChatsSnapshot.exists()) {
      const userChatsData = userChatsSnapshot.data();
      //get chat from a list of chats of a user
      const chatIndex = userChatsData.chats.findIndex(
        (c) => c.chatId === chatId
      );

      userChatsData.chats[chatIndex].lastMessage =
        text == "" ? "đã gửi một phương tiện" : text;
      userChatsData.chats[chatIndex].isSeen =
        id === currentUserId ? true : false;
      userChatsData.chats[chatIndex].updatedAt = Date.now();

      await ChatService.update(id, {
        chats: userChatsData.chats,
      });
    }
  });
}
