import { Box } from "@mui/material";
import styled from "styled-components";
import Post from "../home/NewsFeed/component/Post";

const PostContainer = styled(Box)`
  width: 60%;
`;

const posts = [
  {
    authorAvatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
    authorName: "Planet Rus",
    time: "14 giờ",
    postContent:
      "Nghịch lý Uzbekistan: Xăng A95 25.000 vnđ/lít, A92 20500 đ/lít, diesel 22.000đ/lít. Giá taxi (yandex go): 6-7000 đ/km Buýt intercity 50 km: 12.000 đ Tàu điện ngầm: 3400 đ (vé thẻ) hay 4000 đ (vé giấy)...",
    postVideo:
      "https://firebasestorage.googleapis.com/v0/b/reactchat-3358f.appspot.com/o/images%2Fy2mate.com%20-%20GREEN%20GREEN%20WHATS%20YOUR%20PROBLEM_360p.mp4?alt=media&token=e1dbe288-1b84-40af-ac21-9fd78af70d69",
    reactions: 864,
  },
  {
    authorAvatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
    authorName: "Planet Rus",
    time: "14 giờ",
    postContent:
      "Nghịch lý Uzbekistan: Xăng A95 25.000 vnđ/lít, A92 20500 đ/lít, diesel 22.000đ/lít. Giá taxi (yandex go): 6-7000 đ/km Buýt intercity 50 km: 12.000 đ Tàu điện ngầm: 3400 đ (vé thẻ) hay 4000 đ (vé giấy)...",
    postImage:
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1ocvNi.img?w=768&h=576&m=6",
    reaction: 627,
  },
  {
    authorAvatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
    authorName: "Planet Rus",
    time: "14 giờ",
    postContent:
      "Nghịch lý Uzbekistan: Xăng A95 25.000 vnđ/lít, A92 20500 đ/lít, diesel 22.000đ/lít. Giá taxi (yandex go): 6-7000 đ/km Buýt intercity 50 km: 12.000 đ Tàu điện ngầm: 3400 đ (vé thẻ) hay 4000 đ (vé giấy)...",
    postVideo:
      "https://firebasestorage.googleapis.com/v0/b/reactchat-3358f.appspot.com/o/images%2Fy2mate.com%20-%20GREEN%20GREEN%20WHATS%20YOUR%20PROBLEM_360p.mp4?alt=media&token=e1dbe288-1b84-40af-ac21-9fd78af70d69",
    reactions: 864,
  },
];

const PostContent = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <PostContainer>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </PostContainer>
      {/* Add more posts */}
    </Box>
  );
};

export default PostContent;
