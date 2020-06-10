import React from 'react';
import SignIn from '../components/SignIn';
import { Config } from '../utils/Config';
import { Switch, Route, withRouter } from 'react-router-dom';
import UserRegister from '../components/UserRegister';
import BusRegister from '../components/BusDriverRegister';
import RickRegister from '../components/RickDriverRegister';
import { Header } from '../components/Header';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.obj = {};
        this.inputs = {};
    }
    takeInput(event) {
        this.inputs[event.target.name] = event.target.value;
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
            })
            .catch(err => console.log('Json Error is ', err)))
            .catch(e => console.log('Server Error is ', e));
    }
    userRegister() {
        console.log('User Register Call');
        var userObject = { "name": this.inputs['firstName'] + this.inputs['lastName'], "email": this.inputs['email'], "password": this.inputs['password'], "creationDate": new Date(), "phoneNumber": this.inputs['phoneno'] };
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
    popUp() {
        //To be filled
    }
    busRegister() {
        console.log('Bus Driver Register Call');
        var userObject = { "name": this.inputs['firstName'] + this.inputs['lastName'], "email": this.inputs['email'], "password": this.inputs['password'], "vehicleRegistrationNumber": this.inputs['vehicleRegistrationNumber'], "creationDate": new Date(), "phoneNumber": this.inputs['phoneno'] };
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
    rickRegister() {
        var userObject = { "name": this.inputs['firstName'] + this.inputs['lastName'], "email": this.inputs['email'], "password": this.inputs['password'], "vehicleRegistrationNumber": this.inputs['vehicleRegistrationNumber'], "creationDate": new Date(), "phoneNumber": this.inputs['phoneno'] };
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
    render() {
        return (
            <div>
                <div>
                    <Header />
                    <hr />
                </div>
                <Switch>
                    <Route exact path='/' render={() => <SignIn login={this.login.bind(this)} takeInput={this.takeInput.bind(this)} />} />
                    <Route path='/userRegister' render={() => <UserRegister takeInput={this.takeInput.bind(this)} userRegister={this.userRegister.bind(this)} />} />
                    <Route path='/busRegister' render={() => <BusRegister takeInput={this.takeInput.bind(this)} popUp={this.popUp.bind(this)} busRegister={this.busRegister.bind(this)} />} />
                    <Route path='/rickRegister' render={() => <RickRegister takeInput={this.takeInput.bind(this)} rickRegister={this.rickRegister.bind(this)} />} />
                </Switch>
            </div>
        )
    }
}
export default withRouter(Main);