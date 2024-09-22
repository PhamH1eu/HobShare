import { Box } from "@mui/material";
import "instantsearch.css/themes/satellite.css";
import "./search.css";
import { Configure, Hits, Index, useInstantSearch } from "react-instantsearch";
import { HitPost } from "./component/HitPost";
import LoadingCircleSlide from "../map/Loading";

const PostContent = () => {
  const { status } = useInstantSearch();

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="ais-InstantSearch">
        <Index indexName="post_index">
          <Configure hitsPerPage={100} />
          <Hits hitComponent={HitPost} />
        </Index>
      </div>
      <LoadingCircleSlide
        loading={status === "loading" || status === "stalled"}
      />
    </Box>
  );
};

export default PostContent;
