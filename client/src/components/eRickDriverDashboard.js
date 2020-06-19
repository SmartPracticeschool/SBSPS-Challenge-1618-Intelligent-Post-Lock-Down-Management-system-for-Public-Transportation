import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

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
        backgroundColor: '#43ba45',
        // theme.palette.background.paper,
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

const cards = [1, 2, 3];

export default function ERickDashboard() {
    const classes = useStyles();
    const [status, changeStatus] = useState('for Hire')

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <DirectionsBusIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Driver Name
          </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}
                    style={status == "for Hire" ? { backgroundColor: "#43ba45" } : { backgroundColor: "#fc2646" }}
                >
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            {status}            </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Driver Name<br />
                           Erick Id<br />
                           few details<br />
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={
                                        () => {
                                            if (status == "for Hire") {
                                                changeStatus("Hired");
                                            } else {
                                                changeStatus("for Hire");
                                            }
                                        }
                                    }>
                                        {status == "for Hire" ? "Hired" : "for hire"}
                                    </Button>

                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4} style={{ display: 'inline-block' }} >

                        <Typography variant="h4" align="center" color="textPrimary" >
                            Choose from incoming Ride Requests
                      </Typography>
                        <br />
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={12}>
                                <Card className={classes.card}>

                                    <CardContent className={classes.cardContent}>
                                        <Typography style={{ textAlign: "center" }} gutterBottom variant="h5" component="h2">
                                            Origin: xyz<br />
                                            Destination: cde
                    </Typography>
                                        <Typography style={{ textAlign: "center" }}>
                                            Some more user details
                    </Typography>
                                    </CardContent>
                                    <CardActions style={{ textAlign: "center", display: "inline-block" }} >
                                        <Button size="small" color="primary" >
                                            Accept
                    </Button>
                                        <Button size="small" color="primary" >
                                            Decline
                    </Button>
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
        </React.Fragment >
    );
}