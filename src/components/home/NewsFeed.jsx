import React from "react";

import NewPostInput from "./component/NewPostInput";
import Post from "./component/Post";
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

const Posts = styled.div`
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 10px;
`;

const NewsFeed = () => {
  const posts = [
    {
      id: 1,
      user: "Jessica Alba",
      handle: "@jessicaalba",
      avatar: "url-to-avatar",
      content: "Guys what should I post more about? Let me know!",
      poll: {
        options: ["Music", "Dance", "Movies"],
        votes: [33, 12, 41],
        daysLeft: 7,
      },
      date: "March 24",
    },
    {
      id: 2,
      user: "Cole",
      handle: "@colejanson",
      avatar: "url-to-avatar",
      content: "Photo of a person in a forest",
      images: ["url-to-image1", "url-to-image2", "url-to-image3"],
      date: "March 24",
      likes: 122,
    },
    {
      id: 1,
      user: "Jessica Alba",
      handle: "@jessicaalba",
      avatar: "url-to-avatar",
      content: "Guys what should I post more about? Let me know!",
      poll: {
        options: ["Music", "Dance", "Movies"],
        votes: [33, 12, 41],
        daysLeft: 7,
      },
      date: "March 24",
    },
    {
      id: 2,
      user: "Cole",
      handle: "@colejanson",
      avatar: "url-to-avatar",
      content: "Photo of a person in a forest",
      images: ["url-to-image1", "url-to-image2", "url-to-image3"],
      date: "March 24",
      likes: 122,
    },
    {
      id: 1,
      user: "Jessica Alba",
      handle: "@jessicaalba",
      avatar: "url-to-avatar",
      content: "Guys what should I post more about? Let me know!",
      poll: {
        options: ["Music", "Dance", "Movies"],
        votes: [33, 12, 41],
        daysLeft: 7,
      },
      date: "March 24",
    },
    {
      id: 2,
      user: "Cole",
      handle: "@colejanson",
      avatar: "url-to-avatar",
      content: "Photo of a person in a forest",
      images: ["url-to-image1", "url-to-image2", "url-to-image3"],
      date: "March 24",
      likes: 122,
    },
    {
      id: 1,
      user: "Jessica Alba",
      handle: "@jessicaalba",
      avatar: "url-to-avatar",
      content: "Guys what should I post more about? Let me know!",
      poll: {
        options: ["Music", "Dance", "Movies"],
        votes: [33, 12, 41],
        daysLeft: 7,
      },
      date: "March 24",
    },
    {
      id: 2,
      user: "Cole",
      handle: "@colejanson",
      avatar: "url-to-avatar",
      content: "Photo of a person in a forest",
      images: ["url-to-image1", "url-to-image2", "url-to-image3"],
      date: "March 24",
      likes: 122,
    },
    {
      id: 1,
      user: "Jessica Alba",
      handle: "@jessicaalba",
      avatar: "url-to-avatar",
      content: "Guys what should I post more about? Let me know!",
      poll: {
        options: ["Music", "Dance", "Movies"],
        votes: [33, 12, 41],
        daysLeft: 7,
      },
      date: "March 24",
    },
    {
      id: 2,
      user: "Cole",
      handle: "@colejanson",
      avatar: "url-to-avatar",
      content: "Photo of a person in a forest",
      images: ["url-to-image1", "url-to-image2", "url-to-image3"],
      date: "March 24",
      likes: 122,
    },
    {
      id: 1,
      user: "Jessica Alba",
      handle: "@jessicaalba",
      avatar: "url-to-avatar",
      content: "Guys what should I post more about? Let me know!",
      poll: {
        options: ["Music", "Dance", "Movies"],
        votes: [33, 12, 41],
        daysLeft: 7,
      },
      date: "March 24",
    },
    {
      id: 2,
      user: "Cole",
      handle: "@colejanson",
      avatar: "url-to-avatar",
      content: "Photo of a person in a forest",
      images: ["url-to-image1", "url-to-image2", "url-to-image3"],
      date: "March 24",
      likes: 122,
    },
  ];
  return (
    <NewFeed>
      <NewPostInput />
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </NewFeed>
  );
};

export default NewsFeed;
