import React from 'react';
import SearchLocationInput from './smartSearch';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AWrappedMap from './map';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    inline: {
        display: 'inline',
    },
}));


class RouteMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputAddress: [],
            inputLatLng: [],

        }

    }

    onSelect(latLng, address) {
        console.log(latLng, address);
        //add these into respective states

        this.setState({
            inputAddress: [...this.state.inputAddress, address],
            inputLatLng: [...this.state.inputLatLng, latLng]
        })
        console.log(this.state);
        this.props.handleRouteObject(this.state);
       
    }

    render() {
        return (
            <>
                <Grid container direction="row"
                    justify="center"
                    alignItems="baseline" spacing={1}>
                    <Grid item xs={6}>
                        <h1>Enter your stop locations from your Bus Route</h1>
                        <SearchLocationInput onChangeP={this.onSelect.bind(this)} />
                        {/* update setstate on selection */}
                        <br />
                        <List className={useStyles.root}>

                            {
                                this.state.inputAddress.map((r, index) => {
                                    return (<>
                                        <ListItem alignItems="flex-start">
                                            <ListItemText
                                                primary={index + 1}
                                                secondary={
                                                    <React.Fragment>
                                                        {r}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </>
                                    );
                                })
                            }
                        </List>

                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ color: "white" }}>
                            <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Real Time Locations for all Registered Employees</h3>
                            <AWrappedMap
                                //   googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,visualization"}
                                loadingElement={< div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                posArray={this.state.inputLatLng}
                            />

                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default RouteMap;