import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';

function Copyright() {
    return (
        <Typography variant="body2" align="center" color="textSecondary">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                smartTravelSystem
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        //  minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <CssBaseline></CssBaseline>
            <Box>
                <footer className={classes.footer}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Developed with {<FavoriteIcon />} by Team "Maniacs for a cause"
        </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                        Himank Gupta, Manik Singh, Shobhit Aggarwal, Shivam Chauhan
        </Typography>
                    <Copyright />
                </footer>
            </Box>
        </div>
    );
}