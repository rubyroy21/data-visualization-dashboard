import React from "react";
import { FormControl, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

const SearchInput = ({ handleSearchChange }) => {
  const handleClick = () => {
    // TODO: Clear the search input
    console.log("clicked the clear icon...");
  };

  return (
    <>
      <FormControl>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              padding: "6px 10px",
            }}
          >
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearchChange}
              style={{
                border: "none",
                outline: "none",
                marginLeft: "5px",
                width: "150px", // Adjust width as needed
              }}
            />
            <IconButton onClick={handleClick} size="small">
              <ClearIcon />
            </IconButton>
          </div>
        </div>
      </FormControl>
    </>
  );
};

export default SearchInput;
