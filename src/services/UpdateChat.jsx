import { ChatService } from "src/services/SubDatabaseService";

export default async function UpdateChat(currentUserId, userId, chatId, text) {
  //ID của 2 user trong chat
  const userIDs = [currentUserId, userId];

  //update lại last message, isSeen, updatedAt trong userchats của 2 user
  userIDs.forEach(async (id) => {
    const path = `${id}/chat/${chatId}`;
    await ChatService.updateDocument(path, {
      lastMessage: text == "" ? "đã gửi một phương tiện" : text,
      isSeen: id === currentUserId ? true : false,
      updatedAt: Date.now(),
    });
  });
}
