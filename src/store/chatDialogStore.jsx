import { create } from "zustand";

export const useChatDialogStore = create((set, get) => ({
  openChats: [],
  minimizedChats: [],
  setMiniMizedChats: (chats) => {
    set({ minimizedChats: chats });
  },
  setOpenChats: (chats) => {
    set({ openChats: chats });
  },

  addChat: (chat) => {
    if (get().minimizedChats.includes(chat)) {
      get().maximizeChat(chat);
      return;
    } else if (get().openChats.includes(chat)) {
      return;
    }
    if (get().openChats.length === 2) {
      const [firstChat, secondChat] = get().openChats;
      get().setOpenChats([secondChat, chat]);
      if (get().minimizedChats.length == 4) {
        get().setMiniMizedChats(get().minimizedChats.slice(1));
      }
      get().setMiniMizedChats([...get().minimizedChats, firstChat]);
    } else {
      get().setOpenChats([...get().openChats, chat]);
    }
  },

  removeOpenChat: (chat) => {
    set({
      openChats: get().openChats.filter((c) => c.chatId !== chat.chatId),
    });
    if (get().minimizedChats.length > 0) {
      const newMinimizedChats = get().minimizedChats.pop();
      get().setOpenChats([...get().openChats, newMinimizedChats]);
    }
  },

  removeMinimizedChat: (chat) => {
    set((state) => ({
      minimizedChats: state.minimizedChats.filter((c) => c.chatId !== chat.chatId),
    }));
  },

  minimizeChat: (chat) => {
    if (get().minimizedChats.length == 4) {
      get().setMiniMizedChats(get().minimizedChats.slice(1));
    }
    set({
      openChats: get().openChats.filter((c) => c.chatId !== chat.chatId),
      minimizedChats: [...get().minimizedChats, chat],
    });
  },

  maximizeChat: (chat) => {
    if (get().openChats.length === 2) {
      const [firstChat, secondChat] = get().openChats;
      get().setOpenChats([secondChat, chat]);
      get().setMiniMizedChats(get().minimizedChats.filter((c) => c.chatId !== chat.chatId));
      get().setMiniMizedChats([...get().minimizedChats, firstChat]);
    } else {
      set({
        minimizedChats: get().minimizedChats.filter((c) => c.chatId !== chat.chatId),
        openChats: [...get().openChats, chat],
      });
    }
  },
}));
