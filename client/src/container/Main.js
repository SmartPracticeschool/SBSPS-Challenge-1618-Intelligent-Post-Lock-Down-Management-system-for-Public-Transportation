import React from 'react';
import SignIn from '../components/SignIn';
import { Config } from '../utils/Config';
import { Switch, Route, withRouter } from 'react-router-dom';
import UserRegister from '../components/UserRegister';
import BusRegister from '../components/BusDriverRegister';
import RickRegister from '../components/RickDriverRegister';
// import { Header } from '../components/Header';
// import io from 'socket.io-client';
import UserDashboard from '../components/userDashboard';
import BusDriverDashboard from '../components/BusDriverDashboard';
import ERickDashboard from '../components/eRickDriverDashboard';
import { smartVisit } from '../components/SmartVisit';
import giveReview from '../components/GiveReview';

import checkReview from '../components/CheckReview';
import BusBooking from '../components/BookaBus';
import eRickBooking from '../components/BookaErick';
import ShowBuses from '../components/ShowBuses';
import RedZone from '../components/RedZone';
import ERickBooking from '../components/BookaErick';
import ShowEricks from '../components/ShowEricks';
// import Loader2 from '../components/Loader2';
import {TicketDisplay} from '../components/TicketDisplay';
import axios from 'axios';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.obj = {};
        this.inputs = {};
        this.routeObject = {};
        this.availableBuses = [];
        this.seatBookingObj = { VehicleID: "", UserID: "", price: "" }
        this.state = { "loading": false };

        // this.state = {
        //     'lat': '28.7041',
        //     'lng': '77.1025',
        //     clientID: '',
        //     role: '',
        //     socket: io('http://localhost:1234'),
        // };
    }
    takeInput(event) {
        this.inputs[event.target.id] = event.target.value;
    }
    handleSelectedDays(selectedDays) {
        this.inputs['scheduled_days'] = selectedDays;
    }
    handleRouteObject(routeObject) {
        this.routeObject = routeObject;
    }
    login() {
        // this.setState({ "loading": true });
        console.log('Login Call');
        var userObject = { "email": this.inputs['email'], "password": this.inputs['password'] };
        fetch(Config.BASEURL + Config.LOGIN, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(userObject)
        }).then(response => response.json()
            .then(data => {
                console.log('Data is ', data);
                //if login successful, update state with clientID and role(user,busDriver,erickDriver)
                if (data.isLoggedIn) {
                    let loginObj = data.loginObj;
                    let role = loginObj.role;
                    let clientID = (role === "user") ? loginObj.name : loginObj.driverName;
                    localStorage.clientID = clientID;
                    localStorage.role = role;
                    this.setState({ "clientID": clientID, "role": role });
                    let redirectUrl = (role === "user") ? "userDashboard" : (role === "busdriver") ? "busDashboard" : "eRickDashboard";
                    // this.setState({ "loading": false });
                    this.props.history.push(redirectUrl);
                }
                else {
                    // this.setState({ "loading": false });
                    alert("Invalid UserId or password");
                }
            })
            .catch(err => console.log('Json Error is ', err)))
            .catch(e => console.log('Server Error is ', e));
    }
    userRegister() {
        console.log('User Register Call');
        // let fullName=this.inputs['firstName']+this.inputs['lastName'];
        // console.log('The value of fullName ',fullName);
        var userObject = { "name": this.inputs['firstName'] + " " + this.inputs['lastName'], "email": this.inputs['email'], "password": this.inputs['password'], "creationDate": new Date(), "phoneNumber": this.inputs['phoneno'] };
        console.log('The value of userObject is ', userObject);
        fetch(Config.BASEURL + Config.USERREGISTER, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(userObject)
        }).then(response => response.json()
            .then(data => {
                console.log('Data is ', data);
                alert(data.msg);
            })
            .catch(err => console.log('Json Error is ', err)))
            .catch(e => console.log('Server Error is ', e));
    }
    handleCoordinateBusStop() {
        let coordinateBusStop = [];
        let rObj = this.routeObject
        for (let i = 0; i < rObj.inputAddress.length; i++) {
            let currObj = { "address": rObj.inputAddress[i], "lat": rObj.inputLatLng[i].lat, "long": rObj.inputLatLng[i].lng };
            coordinateBusStop.push(currObj);
        }
        return coordinateBusStop;
    }
    busRegister() {
        console.log('Bus Driver Register Call');
        let coordinateBusStop = this.handleCoordinateBusStop();
        this.inputs['startTime'] = this.inputs['startTime'] == null ? "7:00" : this.inputs['startTime'];
        this.inputs['endTime'] = this.inputs['endTime'] == null ? "19:00" : this.inputs['endTime'];
        var busObject = { "ownerName": this.inputs['ownerName'], "driverName": this.inputs['driverName'], "email": this.inputs['email'], "password": this.inputs['password'], "vehicleRegistrationNumber": this.inputs['vehicleRegistrationNumber'], "creationDate": new Date(), "phoneNumber": this.inputs['phoneno'], "totalSeats": this.inputs['totalSeats'], "scheduled_days": this.inputs['scheduled_days'], "schedule_time": [this.inputs['startTime'], this.inputs['endTime']], "CoordinatesBusStop": coordinateBusStop };
        fetch(Config.BASEURL + Config.BUSREGISTER, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(busObject)
        }).then(response => response.json()
            .then(data => {
                console.log('Data is ', data);
                alert(data.msg);
            })
            .catch(err => console.log('Json Error is ', err)))
            .catch(e => console.log('Server Error is ', e));
    }
    rickRegister() {
        var erickObject = { "ownerName": this.inputs['ownerName'], "driverName": this.inputs['driverName'], "email": this.inputs['email'], "password": this.inputs['password'], "vehicleRegistrationNumber": this.inputs['vehicleRegistrationNumber'], "creationDate": new Date(), "phoneNumber": this.inputs['phoneno'], "totalSeats": this.inputs['totalSeats'] };
        fetch(Config.BASEURL + Config.RICKREGISTER, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(erickObject)
        }).then(response => response.json()
            .then(data => {
                console.log('Data is ', data);
                alert(data.msg);
            })
            .catch(err => console.log('Json Error is ', err)))
            .catch(e => console.log('Server Error is ', e));
    }

    findBuses() {
        // this.setState({ "loading": true });
        var objStartEnd = { "startLocation": this.inputs['startLocation'], "endLocation": this.inputs['endLocation'] };
        console.log(this.inputs);
        console.log(objStartEnd);
        this.availableBuses = [{ seat: "1", vehicle: "1221", price: "10" }, { seat: "1", vehicle: "1221", price: "10" }, { seat: "1", vehicle: "1221", price: "10" }, { seat: "1", vehicle: "1221", price: "10" }];
        //availableBusesDisplay(availableBuses);
        // axios.post(Config.BASEURL + Config.FINDBUSES,objStartEnd)
        // .then(data=>{
        // console.log("Data recevied",data);
        // //this.setState({"loading":false})
        // })
        // .catch(err=>console.log("Error occured",err))
    }

    bookASeat(vehicleId, price) {
        this.seatBookingObj = { VehicleID: vehicleId, price: price, UserID: "12232424" }
        console.log("the seat booking object in main js", this.seatBookingObj);
        // axios.post(Config.BASEURL+Config.BOOKINGBUS,this.seatBookingObj)
        // .then(data=>{
        //     this.seatBookingObj.SeatNo=data.SeatNo;
        // })
        // .catch(err=>console.log('Error occured while fetching data for seat',err))
    }



    // getCurrentPosition() {
    //     console.log('getposition called');

    //     navigator.geolocation.getCurrentPosition(position => {
    //         var lat = position.coords.latitude;
    //         var lng = position.coords.longitude;
    //         console.log('lat:', lat, "lng:", lng, "timestamp", position.timestamp);

    //         this.setState({
    //             'lat': lat,
    //             'lng': lng
    //         });

    //         console.log('b4 socket emit');
    //         this.state.socket.emit('Coords_update', {
    //             'clientID': this.state.clientID,
    //             'role': this.state.role,
    //             'coords': {
    //                 'lat': lat,
    //                 'lng': lng,
    //                 'time': position.timestamp
    //             }
    //         });
    //         console.log('after socket emit');
    //     },
    //         err => {
    //             alert("Gogle maps can't be loaded", err)
    //         }, {
    //         enableHighAccuracy: true,
    //     }
    //     )

    // }


    render() {
        // if (this.state.loading) {
        //     // return <Loader/>
        //     return <Loader2 />
        // }
        return (
            <div>
                {/* <div>
                    <Header />
                    <hr />
                </div> */}
                <Switch>
                    <Route exact path='/' render={() => <SignIn login={this.login.bind(this)} takeInput={this.takeInput.bind(this)} />} />
                    <Route path='/userRegister' render={() => <UserRegister takeInput={this.takeInput.bind(this)} userRegister={this.userRegister.bind(this)} />} />
                    <Route path='/busRegister' render={() => <BusRegister takeInput={this.takeInput.bind(this)} busRegister={this.busRegister.bind(this)} handleSelectedDays={this.handleSelectedDays.bind(this)} handleRouteObject={this.handleRouteObject.bind(this)} />} />
                    <Route path='/rickRegister' render={() => <RickRegister takeInput={this.takeInput.bind(this)} rickRegister={this.rickRegister.bind(this)} />} />
                    <Route path='/userDashboard' render={() => <UserDashboard loading={this.state.loading} />} />
                    <Route path='/busDashboard' render={() => <BusDriverDashboard loading={this.state.loading} />} />
                    <Route path='/eRickDashboard' render={() => <ERickDashboard loading={this.state.loading} />} />
                    <Route path='/smartVisit' component={smartVisit} />
                    <Route path='/giveReview' component={giveReview} />
                    <Route path='/checkReviews' component={checkReview} />
                    {/* <Route path='/busBooking' component={BusBooking} /> */}
                    <Route path='/busBooking' render={() => <BusBooking takeInput={this.takeInput.bind(this)} findBuses={this.findBuses.bind(this)} />} />
                    <Route path='/eRickBooking' component={ERickBooking} />
                    <Route path="/showbuses" render={() => <ShowBuses availableBuses={this.availableBuses} seatBookingObj={this.seatBookingObj} bookASeat={this.bookASeat.bind(this)} />}></Route>
                    <Route path='/showericks' component={ShowEricks} />
                    <Route path='/ticketdisplay' component={TicketDisplay} />
                </Switch>
            </div>
        )
    }
}
export default withRouter(Main);