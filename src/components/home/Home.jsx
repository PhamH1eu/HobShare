import Sidebar from "./Sidebar/Sidebar";
import Friends from "./Friends/Friends";
import NewsFeed from "./NewsFeed/NewsFeed";
import styled from "styled-components";
import { useEffect } from "react";
import { useUserStore } from "src/store/userStore";
import { useQueryClient } from "react-query";
import { UserService } from "src/services/DatabaseService";
import { geohashForLocation } from "geofire-common";

const HomePage = styled.div`
  display: flex;
  margin-top: 64px;
  overflow-y: auto;
  width: 100%;
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
`;

const Home = () => {
  const queryClient = useQueryClient();
  const { currentUserId } = useUserStore();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await UserService.update(currentUserId, {
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            denyExposingLocation: false,
            geohash: geohashForLocation([
              position.coords.latitude,
              position.coords.longitude,
            ]),
          },
        });
        queryClient.invalidateQueries("user");
      });
    }
  }, [currentUserId]);

  return (
    <HomePage>
      <Sidebar></Sidebar>
      <NewsFeed />
      <Friends />
    </HomePage>
  );
};

export default Home;
