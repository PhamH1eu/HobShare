import { useState, useMemo, useEffect } from "react";

import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import useMembers from "src/shared/hooks/fetch/group/useMembers";
import { useParams } from "react-router-dom";
import { GroupService, UserService } from "src/services/SubDatabaseService";
import useGroupInfo from "src/shared/hooks/fetch/group/useGroupInfo";
import { useUserStore } from "src/store/userStore";

const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  fontWeight: "bold",
  padding: "12px",
});

const StyledIconButton = styled(IconButton)({
  position: "absolute",
  right: 8,
  top: 8,
});

const FooterActions = styled(DialogActions)({
  justifyContent: "flex-end",
});

const SearchBar = styled.div`
  display: flex;
  margin: 0 10px;
  border-bottom: 1px solid #ddd;
  background-color: #f0f2f5;
  padding: 6px;
  padding-left: 8px;
  border-radius: 20px;

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    background-color: #f0f2f5;
    margin-left: 5px;
  }
`;

const RecipientList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px;
  max-height: 50vh;
  overflow-y: auto;
  gap: 10px;
`;

const RecipientItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  span {
    flex: 1;
    font-weight: 600;
    font-size: 1.1rem;
  }

  &:hover {
    background-color: #f0f2f5;
    cursor: pointer;
  }

  input {
    width: 18px;
    height: 18px;
    accent-color: #6ec924;
    margin-right: 10px;
  }
`;

const Error = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 10px;
`;

const NewAdminModal = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { currentUserId } = useUserStore();
  const { groupId } = useParams();
  const { group } = useGroupInfo(groupId);
  const { members } = useMembers(groupId);

  const [search, setSearchinput] = useState("");
  const [error, setError] = useState("");
  const handleSearch = (e) => {
    setSearchinput(e.target.value);
  };
  const searchChat = useMemo(
    () => members.filter((x) => x.username.includes(search)),
    [members, search]
  );

  const [newAdmin, setNewAdmin] = useState(null);
  const handleClick = (item) => {
    setError("");
    setNewAdmin(item);
  };
  //cleanup
  useEffect(() => {
    setSearchinput("");
    setError("");
    setNewAdmin(null);
  }, [open]);

  const handleLeave = async () => {
    if (!newAdmin) {
      setError("Vui lòng chọn quản trị viên mới");
    }
    setLoading(true);
    await GroupService.removeDataFromArray(
      `${groupId}`,
      "admins",
      group.admins[0]
    );
    await GroupService.addDataToArray(`${groupId}`, "admins", {
      avatar: newAdmin.avatar,
      userId: newAdmin.userId,
      username: newAdmin.username,
    });
    await Promise.all([
      UserService.removeSubCollection(
        `${currentUserId}/admingroups/${groupId}`
      ),
      UserService.removeSubCollection(
        `${newAdmin.userId}/joinedgroups/${groupId}`
      ),
      UserService.createSubCollection(
        `${newAdmin.userId}/admingroups/${groupId}`
      ),
      await GroupService.removeSubCollection(
        `${groupId}/members/${newAdmin.userId}`
      ),
    ]);
    setLoading(false);
    onClose();
    window.location.reload();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <StyledDialogTitle>
        Bạn có chắc không?
        <StyledIconButton onClick={onClose}>
          <Close />
        </StyledIconButton>
      </StyledDialogTitle>
      <Divider />
      <DialogContent sx={{ padding: "16px" }}>
        Trước khi rời đi, hãy chỉ định một thành viên mới làm quản trị viên
      </DialogContent>
      <SearchBar>
        <SearchIcon
          // @ts-ignore
          color="greyIcon"
        />
        <input
          type="text"
          placeholder="Tìm kiếm thành viên"
          onChange={(e) => handleSearch(e)}
        />
      </SearchBar>
      <RecipientList>
        {searchChat.map((item, index) => (
          <RecipientItem key={index} onClick={() => handleClick(item)}>
            <img src={item.avatar} alt="Profile Picture" />
            <span>{item.username}</span>
            <input
              type="checkbox"
              readOnly
              checked={item.userId === newAdmin?.userId}
            />
          </RecipientItem>
        ))}
      </RecipientList>
      {error !== "" && <Error>{error}</Error>}
      <Divider />
      <FooterActions>
        <Button onClick={onClose} color="primary">
          Huỷ
        </Button>
        <LoadingButton
          loading={loading}
          onClick={handleLeave}
          color="primary"
          variant="contained"
        >
          Rời đi
        </LoadingButton>
      </FooterActions>
    </Dialog>
  );
};

export default NewAdminModal;
