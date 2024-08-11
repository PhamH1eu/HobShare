import React from "react";
import styled from "styled-components";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const SidebarWrapper = styled(Box)`
  width: 300px;
  background-color: white;
  padding: 20px;
  box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
`;

export const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "600" }}>
        Kỷ niệm
      </Typography>
      <List>
        <ListItem button>
          <IconButton sx={{ backgroundColor: "#6ec924", marginRight: "10px" }}>
            <HomeIcon
              // @ts-ignore
              color="white"
            />
          </IconButton>
          <ListItemText
            primary="Trang chủ kỷ niệm"
            disableTypography={true}
            sx={{ fontWeight: "600" }}
          />
        </ListItem>
      </List>
    </SidebarWrapper>
  );
};
