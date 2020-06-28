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
import SearchLocationInput from './smartSearch';
import { Link } from 'react-router-dom';
import { HeaderUser } from './HeaderUser';

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
    gridContainer: {
        paddingLeft: "40px",
        paddingTop: "150px"
    },
    divStyle: {
        width: '100%',
        height: '800px',
        backgroundImage: `url(${BackImage})`,
        backgroundSize: 'cover'
    }
});

export default function ERickBooking(props) {
    const classes = useStyles();
    // const bull = <span className={classes.bullet}>•</span>;

    return (
        <>
            <div>
                <HeaderUser />
            </div>
            <div className={classes.divStyle}>

                <Grid container className={classes.gridContainer}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Enter Start And End Location
    </Typography>
                            <Grid container spacing={4} >
                                <Grid item sm>
                                    <SearchLocationInput placeholder="PickUpLocation" onChangeP={(latLng, address) => { console.log(latLng, address) }}>
                                        <TextField id="startLocation" label="PickUp" onChange={props.takeInput} />
                                    </SearchLocationInput>
                                </Grid>
                                <Grid item sm>
                                    <SearchLocationInput placeholder="endLocation" onChangeP={(latLng, address) => { console.log(latLng, address) }} >
                                        <TextField id="endLocation" label="Drop" onChange={props.takeInput} />
                                    </SearchLocationInput>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => { console.log('find available ericks query called') }}>
                                <p><Link to="/showericks">Find available Ericks</Link></p>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </div>
        </>
    );
}

// export const eRickBooking = () => {
//     return (
//         <>
//         <div>
//             <HeaderUser/>
//         </div>
//         <div>
//             eRickBooking Component
//         </div>
//         </>
//     )
// }