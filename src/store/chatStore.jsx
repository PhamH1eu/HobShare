import { create } from "zustand";
import { useUserStore } from "./userStore";
import useUserInfo from "src/shared/hooks/fetch/useUserInfo";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  message: [],
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chatId, user) => {
    const currentUserId = useUserStore.getState().currentUserId;
    const { data: currentUser } = useUserInfo(currentUserId);

    // CHECK IF CURRENT USER IS BLOCKED
    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        message: [],
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // CHECK IF RECEIVER IS BLOCKED
    else if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        message: [],
        user: user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    } else {
      return set({
        message: [],
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }
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
  }
}));
