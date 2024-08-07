import Box from "@mui/material/Box";
import styled from "styled-components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SearchBar = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
  }
`;

const RecipientList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RecipientItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  span {
    flex: 1;
  }

  input {
    margin-left: 10px;
  }
`;

const SendButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 0 0 8px 8px;
`;

const Share = ({ post }) => {
  return (
    <Box sx={style}>
        {/* header */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Gửi đến</h2>
        </Box>
      <SearchBar>
        <input type="text" placeholder="Tìm kiếm người và nhóm" />
      </SearchBar>
      <RecipientList>
        <RecipientItem>
          <img src="path_to_image" alt="Profile Picture" />
          <span>Lựa chọn chia sẻ khác</span>
          <input type="checkbox" />
        </RecipientItem>
        <RecipientItem>
          <img src="path_to_image" alt="Profile Picture" />
          <span>em iêu ơi</span>
          <input type="checkbox" />
        </RecipientItem>
        <RecipientItem>
          <img src="path_to_image" alt="Profile Picture" />
          <span>Thụ Nhân</span>
          <input type="checkbox" />
        </RecipientItem>
        <RecipientItem>
          <img src="path_to_image" alt="Profile Picture" />
          <span>Phòng trọ không hề bất ổn</span>
          <input type="checkbox" />
        </RecipientItem>
        <RecipientItem>
          <img src="path_to_image" alt="Profile Picture" />
          <span>Anh Bạn Học Không Thân Thiết💩👹</span>
          <input type="checkbox" />
        </RecipientItem>
        <RecipientItem>
          <img src="path_to_image" alt="Profile Picture" />
          <span>Lê Bá Trường</span>
          <input type="checkbox" />
        </RecipientItem>
      </RecipientList>
      <SendButton>Gửi</SendButton>
    </Box>
  );
};

export default Share;
