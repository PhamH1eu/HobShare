import {
  ListItemAvatar,
  Typography,
  ListItemText,
  Divider,
  ListItem,
  styled,
} from "@mui/material";
import Avatar from "../Avatar";

import React from "react";
import { timeDiff } from "src/shared/helper/timeDiff";

const StyledListItem = styled(ListItem)`
  padding: 10px 10px;
  margin: 0px 10px;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const MessItem = ({ chat, handleSelect }) => {
  return (
    <React.Fragment>
      <StyledListItem
        alignItems="flex-start"
        onClick={() => handleSelect(chat)}
      >
        <ListItemAvatar>
          <Avatar src={chat.user?.avatar} receiverId={chat.receiverId} />
        </ListItemAvatar>
        <Typography>
          <ListItemText
            primary={
              <Typography
                variant="body2"
                style={{
                  fontWeight: "bold",
                  fontSize: chat.isSeen ? "0.9rem" : "1rem",
                  marginLeft: "5px",
                }}
              >
                {chat.user.username}
              </Typography>
            }
            secondary={
              <React.Fragment>
                <Typography
                  variant="body2"
                  color={chat.isSeen ? "textSecondary" : "black"}
                  component="span"
                  noWrap={true}
                  sx={{
                    fontWeight: chat.isSeen ? "normal" : "600",
                    marginLeft: "5px",
                  }}
                >
                  {chat.lastMessage}
                </Typography>
                <Typography
                  variant="body2"
                  color={chat.isSeen ? "textSecondary" : "black"}
                  component="span"
                  style={{
                    marginLeft: "5px",
                    fontWeight: chat.isSeen ? "normal" : "600",
                  }}
                >
                  · {timeDiff(chat.updatedAt)}
                </Typography>
              </React.Fragment>
            }
          />
        </Typography>
        {!chat.isSeen && (
          <div
            style={{
              backgroundColor: "#6ec924",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              marginLeft: "auto",
              position: "absolute",
              right: "20px",
              top: "50%",
            }}
          ></div>
        )}
      </StyledListItem>
      <Divider variant="middle" />
    </React.Fragment>
  );
};

export default MessItem;
