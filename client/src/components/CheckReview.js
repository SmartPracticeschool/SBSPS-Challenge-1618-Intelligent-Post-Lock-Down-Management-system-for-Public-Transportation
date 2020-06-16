import React from 'react';
import SearchLocationInput from './smartSearch';
import HoverRating from './StarRating';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


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

        this.state = {
            location: '',
            reviews: [1, 2, 3, 4, 5, 6],
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
        this.setState({
            location: latLng
        });
    }



    onChangesocial_hygiene(e) {

    }

    onChangesocial_distancing(e) {

    }

    onChangesanitation_availability(e) {

    }

    render() {
        return (
            <div>
                check Review Component

                <SearchLocationInput onChangeP={this.onSelect.bind(this)} />

                <div>
                    Social Distancing:
                <HoverRating value={this.state.avg_socialDistancing} readOnly={true} onChangeP={this.onChangesanitation_availability.bind(this)} />
                Social Hygiene:
                <HoverRating value={this.state.avg_socialHygiene} readOnly={true} onChangeP={this.onChangesanitation_availability.bind(this)} />
                Social sanitization:
                <HoverRating value={this.state.avg_sanitization} readOnly={true} onChangeP={this.onChangesanitation_availability.bind(this)} />
                </div>

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
                                <Divider variant="inset" component="li" />
                            </>
                            );
                        })
                    }
                </List>
            </div>
        )
    }
}

export default checkReview;