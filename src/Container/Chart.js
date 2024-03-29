import React, { useContext, useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { FilteredDataContext } from "./GridTable";
import { Paper } from "@mui/material";

const Chart = () => {
  const filteredData = useContext(FilteredDataContext);
  const [filterApplied, setFilterApplied] = useState(false);
  const [zone, setZone] = useState("All Zones");
  const [error, setError] = useState(null);

  // Function to handle API request errors
  const handleApiError = (error) => {
    setError(error.message || "An error occurred");
  };

  useEffect(() => {
    try {
      if (filteredData && filteredData.length > 0) {
        setFilterApplied(true);
        setZone(filteredData[0].zone);
      } else {
        setFilterApplied(false);
        setZone("All Zones");
      }
    } catch (error) {
      handleApiError(error);
    }
  }, [filteredData]);

  // Function to calculate distribution data for PIE chart
  const calculateDistribution = (data, key) => {
    const distribution = {};
    data.forEach((item) => {
      distribution[item[key]] = (distribution[item[key]] || 0) + 1;
    });
    return Object.keys(distribution).map((label) => ({
      name: label,
      value: distribution[label],
    }));
  };

  // Get data for charts based on the selected zone
  const getChartData = (zone) => {
    const filteredDataByZone = zone
      ? filteredData.filter((item) => item.zone === zone)
      : filteredData;
    const deviceBrandDistribution = calculateDistribution(
      filteredDataByZone,
      "device_brand"
    );
    const vehicleBrandDistribution = calculateDistribution(
      filteredDataByZone,
      "vehicle_brand"
    );
    const vehicleCCDistribution = calculateDistribution(
      filteredDataByZone,
      "vehicle_cc"
    );
    const sdkIntDistribution = calculateDistribution(
      filteredDataByZone,
      "sdk_int"
    );
    return {
      deviceBrandDistribution,
      vehicleBrandDistribution,
      vehicleCCDistribution,
      sdkIntDistribution,
    };
  };

  // Get data for the selected zone or all zones if zone is not chosen
  const chartData = getChartData();

  // Check if filteredData is empty
  if (!filteredData || filteredData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {error && <div>Error: {error}</div>}
      {/* Pie Charts */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Paper sx={{ padding: "10px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.deviceBrandDistribution}
                dataKey="value"
                nameKey="name"
                fill="#8884d8"
                label
              >
                {chartData.deviceBrandDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`#${Math.floor(Math.random() * 16777215).toString(
                      16
                    )}`}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
        <Paper sx={{ padding: "10px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.vehicleBrandDistribution}
                dataKey="value"
                nameKey="name"
                fill="#8884d8"
                label
              >
                {chartData.vehicleBrandDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`#${Math.floor(Math.random() * 16777215).toString(
                      16
                    )}`}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
        <Paper sx={{ padding: "10px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.vehicleCCDistribution}
                dataKey="value"
                nameKey="name"
                fill="#8884d8"
                label
              >
                {chartData.vehicleCCDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`#${Math.floor(Math.random() * 16777215).toString(
                      16
                    )}`}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </div>
      {/* Bar charts */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Paper sx={{ padding: "10px", width: "100%" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.deviceBrandDistribution}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="crimson" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
        <Paper sx={{ padding: "10px", width: "100%" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.vehicleBrandDistribution}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="teal" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </div>
      {/* Add other BarCharts as needed */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Paper sx={{ padding: "10px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.vehicleCCDistribution}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {chartData.vehicleCCDistribution.map((entry, index) => (
                <Bar
                  key={`bar-${index}`}
                  dataKey="value"
                  stackId="a"
                  fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Paper>
        <Paper sx={{ padding: "10px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.sdkIntDistribution}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {chartData.sdkIntDistribution.map((entry, index) => (
                <Bar
                  key={`bar-${index}`}
                  dataKey="value"
                  stackId="a"
                  fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </div>
    </div>
  );
};

export default Chart;
