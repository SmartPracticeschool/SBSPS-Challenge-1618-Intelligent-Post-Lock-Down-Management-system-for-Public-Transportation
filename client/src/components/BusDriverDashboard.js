import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import BusDashBoardHeader from './busDashboardComponents/BusDashboardHeader';
import BusDetails from './busDashboardComponents/BusDetails';
import StopDetails from './busDashboardComponents/BusStopDetails';
import BookingDetails from './busDashboardComponents/BookingDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function BusDriverDashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar)}>
          <BusDashBoardHeader/>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={7}>
              <Paper className={fixedHeightPaper}>
                <BusDetails/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={5}>
              <Paper className={fixedHeightPaper}>
                <StopDetails/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <BookingDetails/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}