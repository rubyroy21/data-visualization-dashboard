import React from "react";
import { Button, Grid, Paper, Container } from "@material-ui/core";
import clsx from "clsx";
import "../css/dashboard.css";
import Card from "../Container/Card";
import Chart from "../Container/Chart";
import BasicPie from "../Container/BasicPie";
import GridTable from "../Container/GridTable";
import useDashboardStyles from "../CustomStyles/useDashboardStyles";
import Navbar from "../Components/Navbar/Navbar";

const Dashboard = () => {
  const classes = useDashboardStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h1>Dashboard</h1>
            </div>
          </div>
          <br />
          <Grid container spacing={3}>
            {/* Card Box */}
            {/* Total Item Card*/}
            {/* <Grid item xs={12} md={4} lg={3}>
              <Paper sx={{ height: "125px !important" }}>
                <Card />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper sx={{ height: "125px !important" }}>
                <Card />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper sx={{ height: "125px !important" }}>
                <Card />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper sx={{ height: "125px !important" }}>
                <Card />
              </Paper>
            </Grid> */}
            {/* Table */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <GridTable />
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={7}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Pie Chart */}
            <Grid item xs={12} md={4} lg={5}>
              <Paper className={fixedHeightPaper}>
                <BasicPie />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
