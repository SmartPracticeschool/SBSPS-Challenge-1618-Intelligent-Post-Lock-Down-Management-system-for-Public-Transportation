import React, { Component } from 'react';
import HoverRating from './StarRating';
import SearchLocationInput from './smartSearch';



export default class giveReview extends Component {
    constructor(props) {
        super(props);
        this.onChangeuserId = this.onChangeuserId.bind(this);
        this.onChangelocation = this.onChangelocation.bind(this);
        this.onChangesocial_hygiene = this.onChangesocial_hygiene.bind(this);
        this.onChangesocial_distancing = this.onChangesocial_distancing.bind(this);
        this.onChangesanitation_availability = this.onChangesanitation_availability.bind(this);
        this.onChangeremarks = this.onChangeremarks.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            userId: '',
            location: '',
            social_hygiene: 2,
            social_distancing: 2,
            sanitation_availability: 2,
            remarks: '',
            //users:[]
        }
    }


    // componentDidMount(){
    //     axios.get('http://localhost:1234/url_for_userID_from_usercollection').then(response => {
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

    onChangeuserId(e) {
        this.setState({
            userId: e.target.value
        });
    }

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
        // axios.post('http://localhost:1234/url_of_add_review',rating).then(res=>console.log(res.data));
        // window.location='/url_of_Showreview';
    }

    render() {
        return (
            <div>
                <h3>ADD A Review</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Place search box here </label>
                    </div>

                    <SearchLocationInput />

                    {/* <div className="form-group">
                        <HoverRating  />
                    </div>

                    <div className="form-group">
                        <HoverRating2 />
                    </div> */}
                    <div className="form-group">
                        <label>Social Distancing: </label>
                        <HoverRating name="socialDistancing" onChangeP={this.onChangesocial_distancing} value={2.5} readOnly={false} />
                    </div>

                    <div className="form-group">
                        <label>Social hygiene: </label>
                        <HoverRating name="socialHygiene" onChangeP={this.onChangesocial_hygiene} value={2.5} readOnly={false} />
                    </div>


                    <div className="form-group">
                        <label>Sanitation Availability: </label>
                        <HoverRating name="sanitization" onChangeP={this.onChangesanitation_availability} value={2.5} readOnly={false} />
                    </div>

                    <div className="form-group">
                        <label>Remarks: </label>
                        <input type="text" className="form-control" value={this.state.remarks} onChange={this.onChangeremarks} />
                    </div>



                    <div className="form-group">
                        <input type="submit" value="Add Review" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}










// export const giveReview = () => {
//     return (
//         <div>
//             give Review Component

//         </div>
//     )
// }