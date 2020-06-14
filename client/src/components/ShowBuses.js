import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function ShowBuses(props) {
    console.log("seat booking object in show buses ",props.seatBookingObj);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <DirectionsBusIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Available Buses
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Available Buses
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Avialable Buses On your route select the correct one and have a safe journey
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                {/* <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid> */}
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} justify="center">
            {props.availableBuses.map((ele,index) => (
              <Grid item key={index} xs={12} sm={6} md={4} >
                <Card className={classes.card}>
                  {/* <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  /> */}
                  <CardContent className={classes.cardContent}>
                    {/* <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography> */}
                    {/* <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography> */}
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Seat No.:{ele.seat}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Vehicle No.:{ele.vehicle}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Price:{ele.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={handleClickOpen}>
                      Book A Bus
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to book this seat
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Disagree
                    </Button>
                    <Button onClick={()=>{props.bookASeat()}} color="primary" autoFocus>
                    Agree
                    </Button>
                    </DialogActions>
                    </Dialog>
                    {/* <Button size="small" color="primary">
                      Edit
                    </Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}





// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import CardActionArea from '@material-ui/core/CardActionArea';

// const useStyles = makeStyles({
//   root: {
//     minWidth: 275,
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
//   gridContainer:{
//     paddingLeft:"40px",
//     paddingTop:"150px"
//   }
// });

// export default function ShowBuses() {
//   const classes = useStyles();
//   const bull = <span className={classes.bullet}>•</span>;

//   return (
//     <Grid container className={classes.gridContainer}>
//      <Card className={classes.root} >
//          <CardActionArea>
//       <CardContent>
//         <Typography className={classes.title} color="textSecondary" gutterBottom>
//           Seat No.:
//         </Typography>
//         <Typography className={classes.title} color="textSecondary" gutterBottom>
//           Vehicle No.:
//         </Typography>
//         <Typography className={classes.title} color="textSecondary" gutterBottom>
//           Price:
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//       </CardActionArea>
//     </Card>
    
// </Grid>

//   );
// }