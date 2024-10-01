import { create } from "zustand";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  message: [],
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chatId, user) => {
    return set({
      message: [],
      chatId,
      user,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },

  changeBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },
  resetChat: () => {
    set({
      chatId: null,
      user: null,
      message: [],
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },
  setMessages: (newMess) => {
    set(() => ({ message: newMess }));
  },
}));
