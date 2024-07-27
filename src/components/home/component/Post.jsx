import React from "react";
import styled from "styled-components";

const PostWrapper = styled.div`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  margin: 25px 0;
  padding: 10px;
`;

const Post = ({ post }) => {
  return (
    <PostWrapper>
      <div className="post-header">
        <img src={post.avatar} alt="avatar" />
        <div className="user-info">
          <span className="user-name">{post.user}</span>
          <span className="user-handle">{post.handle}</span>
        </div>
      </div>
      <div className="post-content">
        {post.content}
        {post.poll && (
          <div className="poll">
            {post.poll.options.map((option, index) => (
              <div key={index} className="poll-option">
                {option} - {post.poll.votes[index]}
              </div>
            ))}
            <div className="poll-days-left">{post.poll.daysLeft} Days Left</div>
          </div>
        )}
        {post.images && (
          <div className="post-images">
            {post.images.map((image, index) => (
              <img key={index} src={image} alt="post" />
            ))}
          </div>
        )}
      </div>
      <div className="post-footer">
        <span>{post.date}</span>
        <span>{post.likes} likes</span>
      </div>
    </PostWrapper>
  );
};

export default Post;
