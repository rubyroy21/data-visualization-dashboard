import React, { createContext, useContext, useState, useEffect } from "react";
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
  Typography,
} from "@mui/material";
import useTableStyles from "../CustomStyles/useTableStyles";
import SearchInput from "../Components/SearchInput/SearchInput";
import { TableData } from "../App";
import paginator from "../Components/Pagination/paginator";
import { Download } from "@mui/icons-material";
import { CSVLink } from "react-csv"; // Import CSVLink component
import "../css/grid-table.css";
import Chart from "./Chart";

export const FilteredDataContext = createContext();

const GridTable = () => {
  const classes = useTableStyles();
  const allData = useContext(TableData);
  const [page, setPage] = React.useState(1);
  const [filterOption, setFilterOption] = useState("");
  const [filteredData, setFilteredData] = useState(allData);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle API request errors
  const handleApiError = (error) => {
    setError(error.message || "An error occurred");
  };

  useEffect(() => {
    try {
      setFilteredData(allData);
    } catch (error) {
      handleApiError(error);
    }
  }, [allData]);

  const handleChange = (event, value) => {
    setPage(paginator(filteredData, value, 5).page);
  };

  const optionSelected = (e) => {
    setFlag(true);
    setFilterOption(e.target.value);
  };

  const handleSearchChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    const filtered = allData.filter((item) =>
      item.username.toLowerCase().includes(inputValue)
    );
    setFilteredData(filtered);
    setPage(1); // Reset pagination to the first page when search is performed
  };

  const renderTableData = (data) => {
    return (
      <>
        {error && <div>Error: {error}</div>}
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
        new Set(allData.map((element) => element[filterOption]))
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
      let filteredData = allData.filter(
        (element) => element[filterOption] == value
      );
      setFilteredData(filteredData);
    }
  };

  const handleReset = () => {
    setFilteredData(allData);
    setFlag(false);
    setFilterOption("");
  };

  // Function to generate CSV data
  const generateCSVData = () => {
    const csvData = filteredData.length ? filteredData : allData;
    if (csvData.length === 0) return []; // Return empty array if no data available
    const csvHeaders = Object.keys(csvData[0]);
    const csvRows = csvData.map((item) =>
      csvHeaders.map((header) => item[header])
    );
    return [csvHeaders, ...csvRows];
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
            <Typography sx={{ fontSize: "30px" }}>All Data</Typography>
          </div>
          <div>
            <div style={{ display: "flex", gap: "10px" }}>
              <SearchInput handleSearchChange={handleSearchChange} />

              <div>
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: 120,
                  }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">
                    Filter By
                  </InputLabel>
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
              </div>
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
                  <div className="center-alignment">
                    <Button
                      variant="contained"
                      onClick={handleReset}
                      size="small"
                    >
                      Reset
                    </Button>
                  </div>
                </>
              ) : null}

              {/* Add CSVLink component for downloading CSV */}
              <div className="center-alignment">
                <CSVLink data={generateCSVData()} filename="data.csv">
                  <Button variant="contained" size="small">
                    <Download />
                  </Button>
                </CSVLink>
              </div>
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
            <FilteredDataContext.Provider value={filteredData}>
              {filteredData.length
                ? renderTableData(filteredData)
                : renderTableData(allData)}
            </FilteredDataContext.Provider>
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
          count={Math.ceil(filteredData.length / 5)}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </div>
      <br />

      {/* Provide filtered data to the context */}
      <FilteredDataContext.Provider value={filteredData}>
        {/* Render the Chart component */}
        <Chart />
      </FilteredDataContext.Provider>
    </div>
  );
};

export default GridTable;
