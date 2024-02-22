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

const Chart = () => {
  const filteredData = useContext(FilteredDataContext);
  const [filterApplied, setFilterApplied] = useState(false);
  const [zone, setZone] = useState("All Zones");

  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      setFilterApplied(true);
      setZone(filteredData[0].zone);
    } else {
      setFilterApplied(false);
      setZone("All Zones");
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
    return {
      deviceBrandDistribution,
      vehicleBrandDistribution,
      vehicleCCDistribution,
    };
  };

  // Get data for the selected zone or all zones if zone is not chosen
  const chartData = getChartData();

  // Check if filteredData is empty
  if (!filteredData || filteredData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {/* <h2>Zone: {filterApplied && zone}</h2> */}
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
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
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
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
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
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      {/* Bar charts */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData.deviceBrandDistribution}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData.vehicleBrandDistribution}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
