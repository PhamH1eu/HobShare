import { Box } from "@mui/material";
import styled from "styled-components";

import { Configure, Hits, Index } from "react-instantsearch";
import { HitUser } from "./component/HitUser";
import AddRequestModal from "src/shared/components/friend_button/AddRequestModal";
import useModal from "src/shared/hooks/util/useModal";
import { useState } from "react";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled(Box)`
  width: 60%;
`;

const FriendsContent = () => {
  const { open, handleClose, handleOpen } = useModal();
  const [receiverId, setReceiverId] = useState("");
  const handleClick = (id) => {
    setReceiverId(id);
    handleOpen();
  };

  return (
    <Container>
      <Wrapper>
        <div className="ais-InstantSearch">
          <Index indexName="user_index">
            <Configure hitsPerPage={100} />
            <Hits
              hitComponent={({ hit }) => (
                <HitUser
                  hit={hit}
                  handleOpen={() => handleClick(hit.objectID)}
                />
              )}
            />
          </Index>
        </div>
      </Wrapper>
      <AddRequestModal
        open={open}
        handleClose={handleClose}
        receiverId={receiverId}
      />
    </Container>
  );
};

export default FriendsContent;
