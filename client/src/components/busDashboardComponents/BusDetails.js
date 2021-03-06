import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles((theme)=>({
  root: {
    minWidth: 240,
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
}));

export default function BusDetails() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Title>Bus Details</Title>
        <Typography component="p" variant="h6">
          {bull} Registration Number:- {userDetails.vehicleRegistrationNumber}
        </Typography>
        <Typography component="p" variant="h6">
          {bull} Total Seats:- {userDetails.totalSeats}
        </Typography>
        <Typography component="p" variant="h6">
          {bull} Total Seats Booked:- {userDetails.bookedSeats.length}
        </Typography>
        <Typography component="p" variant="h6">
          {bull} Phone No : {userDetails.phoneNumber}
        </Typography>
      </CardContent>
    </Card>
  );
}