import React from "react";
import { Grid, Paper, Container } from "@material-ui/core";
import "../css/dashboard.css";
import Chart from "../Container/Chart";
import GridTable from "../Container/GridTable";
import useDashboardStyles from "../CustomStyles/useDashboardStyles";
import Navbar from "../Components/Navbar/Navbar";

const Dashboard = () => {
  const classes = useDashboardStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Table */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <GridTable />
              </Paper>
            </Grid>
            {/* Chart */}
            {/* <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <Chart />
              </Paper>
            </Grid> */}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
