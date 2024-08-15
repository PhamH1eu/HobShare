import create from "zustand";

const useFriendStore = create((set) => ({
  selectedFriends: [],
  addFriend: (friend) =>
    set((state) => ({
      selectedFriends: [...state.selectedFriends, friend],
    })),
  removeFriend: (friend) =>
    set((state) => ({
      selectedFriends: state.selectedFriends.filter(
        (item) => item.id !== friend.id
      ),
    })),
  clearFriends: () => set({ selectedFriends: [] }),
}));

export default useFriendStore;
