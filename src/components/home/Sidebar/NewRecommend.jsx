import CircularLoading from "src/shared/components/Loading";
import StyledLink from "src/shared/components/StyledLink";
import usePopularHashtags from "src/shared/hooks/fetch/hashtag/usePopularHashtags";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  width: 280px;
  margin: 20px;
  padding: 10px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;

  h3 {
    margin: 10px;
    margin-bottom: 0;
  }
`;

const Hashtag = styled.div`
  padding: 10px;
  border-radius: 5px;

  span {
    font-size: 16px;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  p {
    font-size: 14px;
    color: #6b6b6b;
  }
`;

const tag = [
  {
    tag: "#12",
    count: 2,
  },
  {
    tag: "#typescript",
    count: 3,
  },
  {
    tag: "#react",
    count: 4,
  },
];

const NewRecommend = () => {
  const { tags, isLoading } = usePopularHashtags();
  if (isLoading)
    return (
      <SidebarWrapper>
        <h3>Xu hướng</h3>
        <CircularLoading />
      </SidebarWrapper>
    );
  return (
    <SidebarWrapper>
      <h3>Xu hướng</h3>
      {tags.map((t, index) => (
        <StyledLink key={index} to={`/hashtag/${t.tag.replace("#", "")}`}>
          <Hashtag key={index}>
            <span>{t.tag}</span>
            <p>{t.postCount} bài viết</p>
          </Hashtag>
        </StyledLink>
      ))}
    </SidebarWrapper>
  );
};

export default NewRecommend;
