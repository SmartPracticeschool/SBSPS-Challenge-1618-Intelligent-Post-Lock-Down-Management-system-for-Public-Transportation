import React,{Component} from 'react';
import HoverRating from './rating';


export default class giveReview extends Component{
    constructor(props){
        super(props);
        this.onChangeuserId = this.onChangeuserId.bind(this);
        this.onChangelocation = this.onChangelocation.bind(this);
        this.onChangesocial_hygiene = this.onChangesocial_hygiene.bind(this);
        this.onChangesocial_distancing = this.onChangesocial_distancing.bind(this);
        this.onChangesanitation_availability = this.onChangesanitation_availability.bind(this);
        this.onChangeremarks = this.onChangeremarks.bind(this);
        this.onChangeaverage_score = this.onChangeaverage_score.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
       

        this.state={
            userId:'',
            location:'',
            social_hygiene:0,
            social_distancing:0,
            sanitation_availability:0,
            remarks:'',
            average_score:'',
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

    onChangeuserId(e){
        this.setState({
            userId: e.target.value
        });
    }

    onChangelocation(e){
        this.setState({
            location: e.target.value
        });
    }

    onChangesocial_hygiene(e){
        // this.props.onChange(e.target.value)
        
        // setvalue('4');
        this.setState({
            social_hygiene: e.target.value
        });
    }

    onChangesocial_distancing(e){
        this.setState({
            social_distancing: e.target.value
        });
    }

    onChangesanitation_availability(e){
        this.setState({
            sanitation_availability: e.target.value
        });
    }

    onChangeremarks(e){
        this.setState({
            remarks: e.target.value
        });
    }

    onChangeaverage_score(e){
        this.setState({
            average_score: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();

        const rating = {
            userId:this.state.userId,
            location:this.state.location,
            social_hygiene:this.state.social_hygiene,
            social_distancing:this.state.social_distancing,
            sanitation_availability:this.state.sanitation_availability,
            remarks:this.state.remarks,
            average_score:this.state.average_score
        }
        console.log(rating);
        // axios.post('http://localhost:1234/url_of_add_review',rating).then(res=>console.log(res.data));
        // window.location='/url_of_Showreview';
    }

    render(){
        return(
            <div>
                <h3>ADD A Review</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group"> 
                            <label>Place search box here </label>
                        </div>

                        <div className="form-group"> 
                            <label>UserId: </label>
                            <input  type="text" required className="form-control" value={this.state.userId} onChange={this.onChangeuserId}/>
                            {/* <select ref="userInput" required className="form-control" value={this.state.userId} onChange={this.onChangeuserId}>
                                {
                                    this.state.users.map(function(user) {return <option key={user} value={user}>{user} </option>;})
                                }
                            </select> */}
                        </div>

                        <div className="form-group"> 
                            <label>Location: </label>
                            <input  type="text" required className="form-control" value={this.state.location} onChange={this.onChangelocation}/>
                        </div>

                        <div className="form-group">
                            <label>Social Hygiene: </label>
                            <HoverRating></HoverRating>
                            {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} value={this.state.social_hygiene} onChange={this.onChangesocial_hygiene}/> */}
                            {/* <input type="text" className="form-control" value={this.state.social_hygiene} onChange={this.onChangesocial_hygiene}/> */}
                        </div>
                        
                        <div className="form-group">
                            <label>Social Distancing: </label>
                            <HoverRating></HoverRating>
                            {/* <input type="text" className="form-control" value={this.state.social_distancing} onChange={this.onChangesocial_distancing}/> */}
                        </div>

                        <div className="form-group">
                            <label>Sanitation Availability: </label>
                            <HoverRating>hello</HoverRating>
                            {/* <input type="text" className="form-control" value={this.state.sanitation_availability} onChange={this.onChangesanitation_availability}/> */}
                        </div>

                        <div className="form-group">
                            <label>Remarks: </label>
                            <input type="text" className="form-control" value={this.state.remarks} onChange={this.onChangeremarks}/>
                        </div>

                        <div className="form-group">
                            <label>Average Score: </label>
                            <input type="text" className="form-control" value={this.state.average_score} onChange={this.onChangeaverage_score}/>
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