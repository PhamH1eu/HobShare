import { Box } from "@mui/material";
import styled from "styled-components";

import { Configure, Hits, Index } from "react-instantsearch";
import { HitGroup } from "./component/HitGroup";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled(Box)`
  width: 60%;
`;

const GroupsContent = () => {
  return (
    <Container>
      <Wrapper>
        <div className="ais-InstantSearch">
          <Index indexName="group-index">
            <Configure hitsPerPage={100} />
            <Hits hitComponent={({ hit }) => <HitGroup hit={hit} />} />
          </Index>
        </div>
      </Wrapper>
    </Container>
  );
};

export default GroupsContent;
