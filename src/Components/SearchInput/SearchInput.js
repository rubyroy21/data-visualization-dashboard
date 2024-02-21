import React, { useState } from "react";
import {
  FormControl,
  InputAdornment,
  TextField,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles(() => {
  return createStyles({
    search: {
      margin: "0",
      width: "100%",
    },
  });
});

const SearchInput = ({ handleSearchChange }) => {
  const handleClick = () => {
    // TODO: Clear the search input
    console.log("clicked the clear icon...");
  };

  return (
    <>
      <FormControl>
        <TextField
          size="small"
          variant="outlined"
          onChange={handleSearchChange}
          placeholder="Search...."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" onClick={handleClick}>
                <ClearIcon />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </>
  );
};

export default SearchInput;
