import React from 'react';
import SearchLocationInput from './smartSearch';
import HoverRating from './StarRating';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { HeaderUser } from './HeaderUser';
import axios from 'axios';


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



class checkReview extends React.Component {

    constructor(props) {
        super(props);
        this.avg_socialHygiene = 2;
        this.state = {
            location: '',
            reviews: ["xyz", "eyz", "abx", "abc"],
            covid_zone: 'red',
            avg_socialHygiene: 0,
            avg_socialDistancing: 0,
            avg_sanitization: 0,
        }
    }

    componentDidMount() {
        console.log('axios call to fetch and setState reviews');
    }


    onSelect(latLng, address) {
        console.log(latLng, address);
        //add these into respective states
        // setvalue('4');
        axios.post("http://localhost:1234/rate/checkreview", { location: { lat: latLng.lat, long: latLng.lng } })
            .then(res => {
                console.log(res.data);
                this.setState({
                    location: latLng,
                    avg_sanitization: res.data.sanitation_availability,
                    avg_socialDistancing: res.data.social_distancing,
                    avg_socialHygiene: res.data.social_hygiene,
                    reviews: res.data.remarks,
                });
                this.avg_socialHygiene = res.data.social_hygiene;


            }).catch(err => { console.log(err) })

    }



    onChangesocial_hygiene(e) {

    }

    onChangesocial_distancing(e) {

    }

    onChangesanitation_availability(e) {

    }

    render() {
        return (
            <>
                <div>
                    <HeaderUser />
                </div>
                <div>

                    <Container maxWidth="md">

                        <h1> check Review Component </h1>

                        <Divider variant="inset" />
                        <br />
                        <div >
                            <label>Search for a Place: </label>
                        </div>
                        <SearchLocationInput onChangeP={this.onSelect.bind(this)} />
                        <br />
                        <div>
                            <h2>  Social Distancing:</h2>
                            <HoverRating value={this.state.avg_socialDistancing} comp="check" readOnly={true} onChangeP={this.onChangesanitation_availability.bind(this)} />
                            <Divider variant="inset" />
                            <h2> Social Hygiene: </h2>
                            <HoverRating value={this.state.avg_socialHygiene} comp="check" readOnly={true} onChangeP={this.onChangesanitation_availability.bind(this)} />
                            <Divider variant="inset" />
                            <h2>  Social sanitization:</h2>
                            <HoverRating value={this.state.avg_sanitization} comp="check" readOnly={true} onChangeP={this.onChangesanitation_availability.bind(this)} />
                            <Divider variant="inset" />
                        </div>
                        <br />
                        <br />
                        <h2>User Reviews</h2>
                        <Divider />
                        <List className={useStyles.root}>

                            {
                                this.state.reviews.map(r => {
                                    return (<>
                                        <ListItem alignItems="flex-start">
                                            <ListItemText
                                                primary="user has said"
                                                secondary={
                                                    <React.Fragment>
                                                        {r}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider />
                                    </>
                                    );
                                })
                            }
                        </List>
                    </Container>
                </div>
            </>
        )
    }
}

export default checkReview;