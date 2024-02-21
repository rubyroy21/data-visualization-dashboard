import React, { useContext, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  MenuItem,
  Pagination,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import useTableStyles from "../CustomStyles/useTableStyles";
import SearchInput from "../Components/SearchInput/SearchInput";
import { TableData } from "../App";
import paginator from "../Components/Pagination/paginator";
import { Download } from "@mui/icons-material";

const GridTable = () => {
  const classes = useTableStyles();
  const data = useContext(TableData);
  const count = Math.ceil(data.length / 3);
  const [page, setPage] = React.useState(1);
  const [filterOption, setFilterOption] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [flag, setFlag] = useState(false);

  const handleChange = (event, value) => {
    setPage(paginator(data, value, 3).page);
  };

  const optionSelected = (e) => {
    setFlag(true);
    setFilterOption(e.target.value);
  };

  const handleSearchChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    const filtered = data.filter((item) =>
      item.username.toLowerCase().includes(inputValue)
    );
    setFilteredData(filtered);
    setPage(1); // Reset pagination to the first page when search is performed
  };

  const renderTableData = (data) => {
    return (
      <>
        {data &&
          paginator(data, page, 5).data.map((item, index) => {
            return (
              <TableRow key={Math.random()}>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.zone}</TableCell>
                <TableCell>{item.device_brand}</TableCell>
                <TableCell>{item.sdk_int}</TableCell>
                <TableCell>{item.vehicle_brand}</TableCell>
                <TableCell>{item.vehicle_cc}</TableCell>
              </TableRow>
            );
          })}
      </>
    );
  };

  const renderFilterOptions = (filterOption) => {
    if (filterOption) {
      let options = Array.from(
        new Set(data.map((element) => element[filterOption]))
      );
      return options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {" "}
          {option}{" "}
        </MenuItem>
      ));
    }
    return [];
  };

  const filterOptionSelected = (e) => {
    let { value } = e.target;
    if (value) {
      let filteredData = data.filter(
        (element) => element[filterOption] == value
      );
      setFilteredData(filteredData);
    }
  };

  const handleReset = () => {
    setFilteredData(data);
    setFlag(false);
    setFilterOption("");
  };

  return (
    <div>
      <TableContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>All Data</h1>
          </div>
          <div>
            <div style={{ display: "flex", gap: "10px" }}>
              <SearchInput handleSearchChange={handleSearchChange} />

              <FormControl
                sx={{ m: 1, minWidth: 120, height: "20px" }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">Filter By</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-simple-select"
                  value={filterOption}
                  label="Filter By"
                  onChange={optionSelected}
                >
                  <MenuItem value="zone">zone</MenuItem>
                  <MenuItem value="device_brand">device_brand</MenuItem>
                  <MenuItem value="sdk_int">sdk_int</MenuItem>
                  <MenuItem value="vehicle_brand">vehicle_brand</MenuItem>
                  <MenuItem value="vehicle_cc">vehicle_cc</MenuItem>
                </Select>
              </FormControl>
              {flag === true ? (
                <>
                  <FormControl
                    sx={{ m: 1, minWidth: 120, height: "20px" }}
                    size="small"
                  >
                    <InputLabel id="demo-select-small-label">
                      {" "}
                      Filter by {filterOption}
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-simple-select"
                      label={`Filter By ${filterOption}`}
                      onChange={filterOptionSelected}
                    >
                      {renderFilterOptions(filterOption)}
                    </Select>
                  </FormControl>
                  <Button variant="contained" onClick={handleReset}>
                    Reset
                  </Button>
                </>
              ) : null}
              <Button variant="contained">
                <Download />
              </Button>
            </div>
          </div>
        </div>
        <br />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>name</TableCell>
              <TableCell className={classes.tableHead}>zone</TableCell>
              <TableCell className={classes.tableHead}>device_brand</TableCell>
              <TableCell className={classes.tableHead}>sdk_int</TableCell>
              <TableCell className={classes.tableHead}>vehicle_brand</TableCell>
              <TableCell className={classes.tableHead}>vehicle_cc</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length
              ? renderTableData(filteredData)
              : renderTableData(data)}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default GridTable;
