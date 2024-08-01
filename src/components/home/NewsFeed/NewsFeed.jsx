import NewPostInput from "./component/NewPostInput";
import Post from "./component/Post";
import FriendsRecommend from "./component/FriendsRecommend";
import styled from "styled-components";

const NewFeed = styled.div`
  flex: 2;
  .posts {
    display: flex;
    flex-direction: column;
  }
  margin-right: 80px;
  margin-left: 80px;
`;

const NewsFeed = () => {
  const posts = [
    {
      authorAvatar:
        "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
      authorName: "Planet Rus",
      time: "14 giờ",
      postContent:
        "Nghịch lý Uzbekistan: Xăng A95 25.000 vnđ/lít, A92 20500 đ/lít, diesel 22.000đ/lít. Giá taxi (yandex go): 6-7000 đ/km Buýt intercity 50 km: 12.000 đ Tàu điện ngầm: 3400 đ (vé thẻ) hay 4000 đ (vé giấy)...",
      postImage:
        "https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/453085177_1021074410020002_5201186084923834649_n.jpg?stp=dst-jpg_p180x540&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=9KsdV_kTft0Q7kNvgG0pnQW&_nc_ht=scontent.fhan2-5.fna&gid=Aum5o8cGum5_xLSlVfGXhSF&oh=00_AYD4Ddim3SPPyScqo5Td8bQVQGPq9M-WfadMQqz3I3lPww&oe=66AB8D91",
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
    {
      authorAvatar:
        "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
      authorName: "Planet Rus",
      time: "14 giờ",
      postContent:
        "Nghịch lý Uzbekistan: Xăng A95 25.000 vnđ/lít, A92 20500 đ/lít, diesel 22.000đ/lít. Giá taxi (yandex go): 6-7000 đ/km Buýt intercity 50 km: 12.000 đ Tàu điện ngầm: 3400 đ (vé thẻ) hay 4000 đ (vé giấy)...",
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
    {
      authorAvatar:
        "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
      authorName: "Planet Rus",
      time: "14 giờ",
      postContent:
        "Nghịch lý Uzbekistan: Xăng A95 25.000 vnđ/lít, A92 20500 đ/lít, diesel 22.000đ/lít. Giá taxi (yandex go): 6-7000 đ/km Buýt intercity 50 km: 12.000 đ Tàu điện ngầm: 3400 đ (vé thẻ) hay 4000 đ (vé giấy)...",
      postImage:
        "https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/453085177_1021074410020002_5201186084923834649_n.jpg?stp=dst-jpg_p180x540&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=9KsdV_kTft0Q7kNvgG0pnQW&_nc_ht=scontent.fhan2-5.fna&gid=Aum5o8cGum5_xLSlVfGXhSF&oh=00_AYD4Ddim3SPPyScqo5Td8bQVQGPq9M-WfadMQqz3I3lPww&oe=66AB8D91",
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
    {
      authorAvatar:
        "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
      authorName: "Planet Rus",
      time: "14 giờ",
      postContent:
        "Nghịch lý Uzbekistan: Xăng A95 25.000 vnđ/lít, A92 20500 đ/lít, diesel 22.000đ/lít. Giá taxi (yandex go): 6-7000 đ/km Buýt intercity 50 km: 12.000 đ Tàu điện ngầm: 3400 đ (vé thẻ) hay 4000 đ (vé giấy)...",
      postImage:
        "https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/453085177_1021074410020002_5201186084923834649_n.jpg?stp=dst-jpg_p180x540&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=9KsdV_kTft0Q7kNvgG0pnQW&_nc_ht=scontent.fhan2-5.fna&gid=Aum5o8cGum5_xLSlVfGXhSF&oh=00_AYD4Ddim3SPPyScqo5Td8bQVQGPq9M-WfadMQqz3I3lPww&oe=66AB8D91",
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
    {
      authorAvatar:
        "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
      authorName: "Planet Rus",
      time: "14 giờ",
      postContent:
        "Nghịch lý Uzbekistan: Xăng A95 25.000 vnđ/lít, A92 20500 đ/lít, diesel 22.000đ/lít. Giá taxi (yandex go): 6-7000 đ/km Buýt intercity 50 km: 12.000 đ Tàu điện ngầm: 3400 đ (vé thẻ) hay 4000 đ (vé giấy)...",
      postImage:
        "https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/453085177_1021074410020002_5201186084923834649_n.jpg?stp=dst-jpg_p180x540&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=9KsdV_kTft0Q7kNvgG0pnQW&_nc_ht=scontent.fhan2-5.fna&gid=Aum5o8cGum5_xLSlVfGXhSF&oh=00_AYD4Ddim3SPPyScqo5Td8bQVQGPq9M-WfadMQqz3I3lPww&oe=66AB8D91",
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
    {
      authorAvatar:
        "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
      authorName: "Planet Rus",
      time: "14 giờ",
      postContent:
        "Nghịch lý Uzbekistan: Xăng A95 25.000 vnđ/lít, A92 20500 đ/lít, diesel 22.000đ/lít. Giá taxi (yandex go): 6-7000 đ/km Buýt intercity 50 km: 12.000 đ Tàu điện ngầm: 3400 đ (vé thẻ) hay 4000 đ (vé giấy)...",
      postImage:
        "https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/453085177_1021074410020002_5201186084923834649_n.jpg?stp=dst-jpg_p180x540&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=9KsdV_kTft0Q7kNvgG0pnQW&_nc_ht=scontent.fhan2-5.fna&gid=Aum5o8cGum5_xLSlVfGXhSF&oh=00_AYD4Ddim3SPPyScqo5Td8bQVQGPq9M-WfadMQqz3I3lPww&oe=66AB8D91",
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
  return (
    <NewFeed>
      <FriendsRecommend />
      <NewPostInput />
      <div>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </NewFeed>
  );
};

export default NewsFeed;
