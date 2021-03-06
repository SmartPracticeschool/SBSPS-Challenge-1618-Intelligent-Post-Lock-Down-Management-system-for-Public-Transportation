import React, { Component } from 'react';
// import { Config } from '../utils/Config';
import HoverRating from './StarRating';
import SearchLocationInput from './smartSearch';
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';

// import Typography from '@material-ui/core/Typography';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { HeaderUser } from './HeaderUser';
import axios from 'axios';
import { Config } from '../utils/Config';
import Footer from './footer';



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

export default class giveReview extends Component {
    constructor(props) {
        super(props);
        //this.onChangeuserId = this.onChangeuserId.bind(this);
        this.onChangelocation = this.onChangelocation.bind(this);
        this.onChangesocial_hygiene = this.onChangesocial_hygiene.bind(this);
        this.onChangesocial_distancing = this.onChangesocial_distancing.bind(this);
        this.onChangesanitation_availability = this.onChangesanitation_availability.bind(this);
        this.onChangeremarks = this.onChangeremarks.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.userDetails = JSON.parse(localStorage.getItem('userDetails'));


        this.state = {
            userId: this.userDetails._id,
            location: '',
            social_hygiene: 2,
            social_distancing: 2,
            sanitation_availability: 2,
            remarks: '',
            //users:[]
        }
    }


    // componentDidMount(){
    //     axios.get('http://localhost:1234/dologin').then(response => {
    //     if (response.data.length > 0) {
    //       this.setState({
    //         users: response.data.map(user => user.userId),
    //         userId: response.data[0].userId
    //       })
    //     }
    //   }).catch((error) => {
    //     console.log(error);
    //   })
    // }
    onSelect(latLng, address) {
        console.log(latLng, address);
        //add these into respective states
        // setvalue('4');
        latLng.long = latLng.lng;
        this.setState({
            location: latLng
        });
    }

    // onChangeuserId(e) {
    //     this.setState({
    //         userId: e.target.value
    //     });
    // }

    onChangelocation(e) {
        this.setState({
            location: e.target.value
        });
    }

    onChangesocial_hygiene(e) {
        // this.props.onChange(e.target.value)

        // setvalue('4');
        this.setState({
            social_hygiene: e
        });
    }

    onChangesocial_distancing(e) {
        this.setState({
            social_distancing: e
        });
    }

    onChangesanitation_availability(e) {
        this.setState({
            sanitation_availability: e
        });
    }

    onChangeremarks(e) {
        this.setState({
            remarks: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        const rating = {
            userId: this.state.userId,
            location: this.state.location,
            social_hygiene: this.state.social_hygiene,
            social_distancing: this.state.social_distancing,
            sanitation_availability: this.state.sanitation_availability,
            remarks: this.state.remarks,
        }
        console.log(rating);
        axios.post(Config.BASEURL + Config.ADDREVIEW, rating)
            .then(data => { console.log("Data recevied"); alert("review added"); })
            .catch(err => console.log("Error occured", err))

        //window.location='/url_of_Showreview';
    }

    render() {
        return (
            <>
                <div>
                    <HeaderUser />
                </div>
                <div>
                    <Container maxWidth="md" className={useStyles.root}>
                        <br />
                        <h1 style={{ textAlign: "center" }}>Add Review for a place</h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Search for a Place: </label>
                            </div>

                            <SearchLocationInput onChangeP={this.onSelect.bind(this)} />
                            <br />
                            <Divider variant="inset" />
                            <br />
                            <br />

                            {/* <div className="form-group"> 
                            <label>UserId: </label>
                            <input  type="text" required className="form-control" value={this.state.userId} onChange={this.onChangeuserId}/>
                        </div> */}

                            <div className="form-group">
                                <label>Social Distancing: </label>
                                <HoverRating name="socialDistancing" comp="give" onChangeP={this.onChangesocial_distancing} value={2.5} readOnly={false} />
                            </div>
                            <Divider variant="inset" />
                            <div className="form-group">
                                <label>Social hygiene: </label>
                                <HoverRating name="socialHygiene" comp="give" onChangeP={this.onChangesocial_hygiene} value={2.5} readOnly={false} />
                            </div>

                            <Divider variant="inset" />
                            <div className="form-group">
                                <label>Sanitation Availability: </label>
                                <HoverRating name="sanitization" comp="give" onChangeP={this.onChangesanitation_availability} value={2.5} readOnly={false} />
                            </div>
                            <Divider variant="inset" />
                            <div className="form-group">
                                <label>Remarks: </label>
                                <input type="text" className="form-control" value={this.state.remarks} onChange={this.onChangeremarks} />
                            </div>

                            {/* <Divider variant="inset" /> */}

                            <br />
                            <div className="form-group">
                                <input type="submit" value="Add Review" className="btn btn-primary" />
                            </div>
                        </form>


                    </Container>
                </div>
            </>
        );
    }
}








