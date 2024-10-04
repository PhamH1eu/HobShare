import { Box } from "@mui/material";
import styled from "styled-components";

import { Configure, Hits, Index } from "react-instantsearch";
import { HitUser } from "./component/HitUser";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled(Box)`
  width: 60%;
`;

const FriendsContent = () => {
  return (
    <Container>
      <Wrapper>
        <div className="ais-InstantSearch">
          <Index indexName="user_index">
            <Configure hitsPerPage={100} />
            <Hits hitComponent={({ hit }) => <HitUser hit={hit} />} />
          </Index>
        </div>
      </Wrapper>
    </Container>
  );
};

export default FriendsContent;
