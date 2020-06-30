import React, { useState } from 'react';
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
import axios from 'axios';
import { useHistory } from "react-router";

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

function ERickBooking(props) {
    const classes = useStyles();
    // const bull = <span className={classes.bullet}>•</span>;
    const [PickUp, updatePickup] = useState({ "a": "h" });
    const [Drop, updateDrop] = useState({ "b": "c" });
    const history = useHistory();

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
                                    <SearchLocationInput placeholder="PickUpLocation" onChangeP={(latLng, address) => {
                                        console.log(latLng, address);
                                        updatePickup({ latLng, "address": address });
                                    }}>
                                        <TextField id="startLocation" label="PickUp" onChange={props.takeInput} />
                                    </SearchLocationInput>
                                </Grid>
                                <Grid item sm>
                                    <SearchLocationInput placeholder="endLocation" onChangeP={(latLng, address) => {
                                        console.log(latLng, address)
                                        updateDrop({ latLng, "address": address });
                                    }} >
                                        <TextField id="endLocation" label="Drop" onChange={props.takeInput} />
                                    </SearchLocationInput>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => {
                                console.log('find available ericks query called');
                                console.log(PickUp, Drop);
                                axios.post('http://localhost:1234/book/findrick', { liveLocation: PickUp.address, dropLocation: Drop.address })
                                    .then(res => {
                                        console.log(res.data);
                                        history.push({
                                            pathname: '/showericks',
                                            state: { ericks: res.data }
                                        })
                                    })
                                    .catch(err => console.log(err));
                                //these pickup and drop will be params for api call

                            }}>

                                {/* <p><Link to="/showericks">Find available Ericks</Link></p> */}
                                Find available Ericks
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </div>
        </>
    );
}

export default ERickBooking;

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