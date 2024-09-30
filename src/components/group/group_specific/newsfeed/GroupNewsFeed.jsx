import Post from "src/components/home/NewsFeed/component/Post";
import NewPostInput from "src/components/home/NewsFeed/new_post/NewPostInput";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useGroupInfo from "src/shared/hooks/fetch/group/useGroupInfo";
import useGroupPosts from "src/shared/hooks/fetch/group/useGroupPosts";
import CircularLoading from "src/shared/components/Loading";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 64px;
  width: 100%;
  align-items: center;

  overflow-y: auto;
`;

const NoPosts = styled.div`
  margin-top: 20px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 20px;
  font-weight: 600;
`;

const GroupNewsFeed = () => {
  const { groupId } = useParams();
  const { isLoading, isAdmin, group } = useGroupInfo(groupId);
  const { posts, isLoading: isPostLoading } = useGroupPosts(groupId);

  useEffect(() => {
    const expires = Number(
      localStorage.getItem("Expires") ?? Date.now() + 60 * 1000
    );
    localStorage.setItem("Expires", expires.toString());

    let tid;
    let timeLeft = expires - Date.now();
    const countdown = (t) => {
      if (timeLeft > 0) {
        tid = window.setTimeout(() => {
          window.location.reload();
          //increase affinity
          timeLeft = timeLeft - t;
          countdown(60 * 1000);
        }, t);
      } else {
        localStorage.removeItem("Expires");
      }
    };
    countdown(timeLeft % (60 * 1000) || 60 * 1000);
    return () => {
      clearTimeout(tid);
    };
  }, []);

  if (isLoading || isPostLoading) {
    return (
      <Wrapper>
        <CircularLoading />
      </Wrapper>
    );
  }

  return (
    <>
      <NewPostInput
        groupId={groupId}
        groupName={group.name}
        groupWallpaper={group.wallpaper}
      />
      <div>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Post
              key={index}
              postId={post.id}
              initComt={undefined}
              isAdminGroup={isAdmin}
            />
          ))
        ) : (
          <NoPosts>Chưa có bài viết nào</NoPosts>
        )}
      </div>
    </>
  );
};

export default GroupNewsFeed;
