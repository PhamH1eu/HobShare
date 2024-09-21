import { useState, useRef } from "react";
import { useSearchBox } from "react-instantsearch";
import { styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import "./customsearch.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: "rgba(240,242,245,255)",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "10px",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function CustomSearchBox(props) {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const debounceTimeout = useRef(null);

  const [debouncing, setDebouncing] = useState(false);

  function setQuery(newQuery) {
    setInputValue(newQuery);
    setDebouncing(true);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout for 2 seconds
    debounceTimeout.current = setTimeout(() => {
      refine(newQuery); // Trigger Algolia search after debounce
      setDebouncing(false);
    }, 1000); // 1-second debounce
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length > 0) navigate(`/search`);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon
          // @ts-ignore
          color="greyIcon"
        />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Tìm kiếm..."
        inputProps={{ "aria-label": "search" }}
        ref={inputRef}
        value={inputValue}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchSubmit(e);
          }
        }}
        endAdornment={
          debouncing ? (
            <div className="bouncing-loader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : null
        }
      />
    </Search>
  );
}

export default CustomSearchBox;
