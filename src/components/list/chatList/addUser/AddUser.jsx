import "./addUser.css";
import { useState } from "react";
import { useUserStore } from "../../../../store/userStore";
import SearchUser from "src/services/SearchUser";
import AddUserToChat from "src/services/AddUserToChat";

const AddUser = () => {
  const [targetUser, setTargetUser] = useState(null);
  const currentUser = useUserStore((state) => state.currentUser);

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    const user = await SearchUser(username);
    setTargetUser(user);
  };

  const handleAdd = async () => {
    await AddUserToChat(targetUser, currentUser);
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {targetUser && (
        <div className="user">
          <div className="detail">
            <img src={targetUser.avatar || "./avatar.png"} alt="" />
            <span>{targetUser.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
