import React from 'react';
import SearchLocationInput from './smartSearch';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AWrappedMap from './map';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
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
        this.count = 0;
    }

    onSelect(latLng, address) {
        console.log(latLng, address);
        //add these into respective states

        this.setState({
            inputAddress: [...this.state.inputAddress, address],
            inputLatLng: [...this.state.inputLatLng, latLng]
        })
    }

    render() {
        return (
            <>
                <h1>Enter your stop locations from your Bus Route</h1>
                <SearchLocationInput onChangeP={this.onSelect.bind(this)} />
                {/* update setstate on selection */}
                <br />
                <List className={useStyles.root}>

                    {
                        this.state.inputAddress.map((r) => {
                            return (<>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={this.count++}
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



                <div style={{ color: "white" }}>
                    <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Real Time Locations for all Registered Employees</h3>
                    <AWrappedMap
                        googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization"}
                        loadingElement={< div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />

                </div>
            </>
        )
    }
}

export default RouteMap;