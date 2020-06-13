import React from 'react';
import SignIn from '../components/SignIn';
import { Config } from '../utils/Config';
import { Switch, Route, withRouter } from 'react-router-dom';
import UserRegister from '../components/UserRegister';
import BusRegister from '../components/BusDriverRegister';
import RickRegister from '../components/RickDriverRegister';
import { Header } from '../components/Header';
import io from 'socket.io-client';
import { UserDashboard } from '../components/userDashboard';
import { BusDashboard } from '../components/BusDriverDashboard';
import { ERickDashboard } from '../components/eRickDriverDashboard';
import { smartVisit } from '../components/SmartVisit';
import { giveReview } from '../components/GiveReview';
import { checkReview } from '../components/CheckReview';
import { busBooking } from '../components/BookaBus';
import { eRickBooking } from '../components/BookaErick';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.obj = {};
        this.inputs = {};

        this.state = {
            'lat': '28.7041',
            'lng': '77.1025',
            clientID: '',
            role: '',
            socket: io('http://localhost:1234'),
        };
    }
    takeInput(event) {
        this.inputs[event.target.name] = event.target.value;
    }
    handleSelectedDays(selectedDays) {
        this.inputs['scheduled_days'] = selectedDays;
    }
    login() {
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

            })
            .catch(err => console.log('Json Error is ', err)))
            .catch(e => console.log('Server Error is ', e));
    }
    userRegister() {
        console.log('User Register Call');
        // let fullName=this.inputs['firstName']+this.inputs['lastName'];
        // console.log('The value of fullName ',fullName);
        var userObject = { "name": this.inputs['firstName'] + this.inputs['lastName'], "email": this.inputs['email'], "password": this.inputs['password'], "creationDate": new Date(), "phoneNumber": this.inputs['phoneno'] };
        console.log('The value of userObject is ', userObject);
        fetch(Config.BASEURL + Config.USERREGISTER, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(userObject)
        }).then(response => response.json()
            .then(data => {
                console.log('Data is ', data);
            })
            .catch(err => console.log('Json Error is ', err)))
            .catch(e => console.log('Server Error is ', e));
    }
    busRegister() {
        console.log('Bus Driver Register Call');
        var userObject = { "ownerName": this.inputs['ownerName'], "driverName": this.inputs['driverName'], "email": this.inputs['email'], "password": this.inputs['password'], "vehicleRegistrationNumber": this.inputs['vehicleRegistrationNumber'], "creationDate": new Date(), "phoneNumber": this.inputs['phoneno'], "totalSeats": this.inputs['totalSeats'], "scheduled_days": this.inputs['scheduled_days'], "schedule_time": [this.inputs['startTime'], this.inputs['endTime']] };
        fetch(Config.BASEURL + Config.BUSREGISTER, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(userObject)
        }).then(response => response.json()
            .then(data => {
                console.log('Data is ', data);
            })
            .catch(err => console.log('Json Error is ', err)))
            .catch(e => console.log('Server Error is ', e));
    }
    rickRegister() {
        var userObject = { "ownerName": this.inputs['ownerName'], "driverName": this.inputs['driverName'], "email": this.inputs['email'], "password": this.inputs['password'], "vehicleRegistrationNumber": this.inputs['vehicleRegistrationNumber'], "creationDate": new Date(), "phoneNumber": this.inputs['phoneno'], "totalSeats": this.inputs['totalSeats'] };
        fetch(Config.BASEURL + Config.RICKREGISTER, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(userObject)
        }).then(response => response.json()
            .then(data => {
                console.log('Data is ', data);
            })
            .catch(err => console.log('Json Error is ', err)))
            .catch(e => console.log('Server Error is ', e));
    }


    getCurrentPosition() {
        console.log('getposition called');

        navigator.geolocation.getCurrentPosition(position => {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            console.log('lat:', lat, "lng:", lng, "timestamp", position.timestamp);

            this.setState({
                'lat': lat,
                'lng': lng
            });

            console.log('b4 socket emit');
            this.state.socket.emit('Coords_update', {
                'clientID': this.state.clientID,
                'role': this.state.role,
                'coords': {
                    'lat': lat,
                    'lng': lng,
                    'time': position.timestamp
                }
            });
            console.log('after socket emit');
        },
            err => {
                alert("Gogle maps can't be loaded", err)
            }, {
            enableHighAccuracy: true,
        }
        )

    }


    render() {
        return (
            <div>
                {/* <div>
                    <Header />
                    <hr />
                </div> */}
                <Switch>
                    <Route exact path='/' render={() => <SignIn login={this.login.bind(this)} takeInput={this.takeInput.bind(this)} />} />
                    <Route path='/userRegister' render={() => <UserRegister takeInput={this.takeInput.bind(this)} userRegister={this.userRegister.bind(this)} />} />
                    <Route path='/busRegister' render={() => <BusRegister takeInput={this.takeInput.bind(this)} busRegister={this.busRegister.bind(this)} handleSelectedDays={this.handleSelectedDays.bind(this)} />} />
                    <Route path='/rickRegister' render={() => <RickRegister takeInput={this.takeInput.bind(this)} rickRegister={this.rickRegister.bind(this)} />} />

                    <Route path='/userDashboard' component={UserDashboard} />
                    <Route path='/busDashboard' component={BusDashboard} />
                    <Route path='/eRickDashboard' component={ERickDashboard} />
                    <Route path='/smartVisit' component={smartVisit} />
                    <Route path='/giveReview' component={giveReview} />
                    <Route path='/checkReviews' component={checkReview} />
                    <Route path='/busBooking' component={busBooking} />
                    <Route path='/eRickBooking' component={eRickBooking} />
                </Switch>
            </div>
        )
    }
}
export default withRouter(Main);