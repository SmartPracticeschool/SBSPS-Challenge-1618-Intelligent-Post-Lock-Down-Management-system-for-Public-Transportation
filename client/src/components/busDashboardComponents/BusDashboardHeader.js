import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function BusDashBoardHeader() {
  const classes = useStyles();
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  return (
    <div className={classes.root}>
      <AppBar position="relative">
                <Toolbar>
                    <DirectionsBusIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Welcome {userDetails.driverName}
          </Typography>
                </Toolbar>
            </AppBar>
    </div>
  );
}