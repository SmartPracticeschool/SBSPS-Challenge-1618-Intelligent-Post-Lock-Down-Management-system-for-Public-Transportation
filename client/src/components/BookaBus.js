import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import BackImage from '../img/BackgroundImageForBusBooking.jpg';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  gridContainer:{
    paddingLeft:"40px",
    paddingTop:"150px"
  },
  divStyle:{
    width: '100%',
    height: '800px',
    backgroundImage: `url(${BackImage})`,
    backgroundSize: 'cover'   
  }
});

export default function BusBooking(props) {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  return (
      <div className={classes.divStyle}>

    <Grid container className={classes.gridContainer}>
    <Card className={classes.root} variant="outlined">
      <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
            Enter Start And End Location
    </Typography>
          <Grid container spacing={4} >
             <Grid item sm>
             <TextField id="startLocation" label="PickUp" onChange={props.takeInput} />
             </Grid>
             <Grid item sm>
             <TextField id="endLocation" label="Drop" onChange={props.takeInput}/>
           </Grid>
          </Grid>
      </CardContent>
      <CardActions>
      <Button onClick={()=>{props.findBuses()}}>
            <p><Link to="/showbuses">Temp link to user dashboard</Link></p>
      </Button>
        {/* <Button size="small" onClick={()=>{props.findBuses()}}>Find Buses</Button> */}
      </CardActions>
    </Card>
    </Grid>
    </div>
  );
}