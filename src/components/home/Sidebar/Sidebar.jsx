import Tabs from "./Tabs";
import NewRecommend from "./NewRecommend";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  position: sticky;
  top: 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 10px;
  }

  &:hover {
    &::-webkit-scrollbar {
      background-color: white;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 10px;
    }
  }
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Tabs />
      <NewRecommend />
    </SidebarWrapper>
  );
};

export default Sidebar;
