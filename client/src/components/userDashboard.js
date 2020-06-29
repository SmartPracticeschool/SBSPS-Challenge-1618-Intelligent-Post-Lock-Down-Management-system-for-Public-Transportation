import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { HeaderUser } from './HeaderUser';
import RedZone from './RedZone';
import io from 'socket.io-client';

export default class UserDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.currentpos = { lat: 28.7041, lng: 77.1025 }
        this.socket = io('http://localhost:1234');
        this.userid = localStorage.userId;
        this.state = {
            lat: null,
            lng: null
        }
    }
    getposition() {
        console.log('inside getposition');

        navigator.geolocation.getCurrentPosition(position => {                      //watchposition

            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            console.log('lat:', lat, "lng:", lng);
            this.currentpos = { 'lat': lat, 'lng': lng };

            console.log('currentpos is :', this.currentpos);
            console.log('b4 socket emit');

            var dt = new Date();

            //console.log(dt.getDate()+" "+dt.getMonth()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds());
            this.socket.emit('Coords_update', { 'empId': this.userid, 'coords': { 'ltln': { 'lat': lat, 'lng': lng }, 'time': dt.getTime() } });
            console.log('after socket emit');
            this.forceUpdate();
        },
            err => { console.log("Gogle maps can't be loaded", err) },
            { enableHighAccuracy: true, }
        )


    }

    render() {
        return (
            <>

                <div>
                    <HeaderUser />
                </div>
                <div>

                    <RedZone />
                </div>
            </>
        )
    }
}

//getCurrentPosition() {
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