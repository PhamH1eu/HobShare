import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import styled from "styled-components";
import PostContent from "./PostContent";
import FriendsContent from "./FriendsContent";

const Sidebar = styled(Box)`
  position: fixed;
  top: 64px;
  left: 0;
  height: 100%;
  width: 300px;
  padding: 20px;
  background-color: #ffffff;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #d3d6db;

  h6 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .MuiListItem-root {
    color: #1c1e21;
    padding: 10px 15px;
    border-radius: 8px;
    &:hover {
      background-color: #e4e6eb;
    }
  }

  .Mui-selected {
    background-color: #e7f3ff !important;
    color: #6ec924;
  }

  .MuiTabs-flexContainer {
    gap: 8px;

    button {
      border-radius: 8px 0 0 8px;
      align-items: flex-start !important;
    }
  }
`;

const ContentArea = styled(Box)`
  margin-left: 300px;
  padding: 20px;
  width: 100vw;
`;

const MainLayout = styled(Box)`
  display: flex;
  height: calc(100vh - 64px);
  margin-top: 64px;
  overflow-x: hidden;
`;

const TabLabel = styled(Typography)`
  font-weight: bold;
`;

const SearchScreen = () => {
  const [selectedTab, setSelectedTab] = useState("baiviet");

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <MainLayout>
      <Sidebar>
        <Typography variant="h6" gutterBottom>
          Kết quả tìm kiếm
        </Typography>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          orientation="vertical"
          textColor="inherit"
          indicatorColor="primary"
        >
          <Tab label={<TabLabel>Bài viết</TabLabel>} value="baiviet" />
          <Tab label={<TabLabel>Mọi người</TabLabel>} value="moinguoi" />
        </Tabs>
      </Sidebar>
      <ContentArea>
        {selectedTab === "baiviet" && <PostContent />}
        {selectedTab === "moinguoi" && <FriendsContent />}
        {/* Add more components for other tabs */}
      </ContentArea>
    </MainLayout>
  );
};

export default SearchScreen;
