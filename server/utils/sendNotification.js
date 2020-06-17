let duration = require('google-distance-matrix');
let bookingCollection = [
    { "vehilcleId": "Dl-12", "userId": "20shivamchauhan@gmail.com", "pickUp": "GTB nagar metro station, Outram Lines, Mukherjee Nagar, Delhi", "userLocation": "GTB nagar metro station, Outram Lines, Mukherjee Nagar, Delhi" },
    { "vehilcleId": "Dl-12", "userId": "manik@gmail.com", "pickUp": "GTB nagar metro station, Outram Lines, Mukherjee Nagar, Delhi", "userLocation": "GTB nagar metro station, Outram Lines, Mukherjee Nagar, Delhi" },
    { "vehilcleId": "Dl-12", "userId": "himank@gmail.com", "pickUp": "Model Town Metro Station, Police Residential Colony, Pocket B, Gujranwala Town Part 1, Gujranwala Town, Delhi", "userLocation": "Model Town Metro Station, Police Residential Colony, Pocket B, Gujranwala Town Part 1, Gujranwala Town, Delhi" },
    { "vehilcleId": "Dl-12", "userId": "shobhit@gmail.com", "pickUp": "Vishwa Vidyalaya Metro Station, Delhi", "userLocation": "Vishwa Vidyalaya Metro Station, Delhi" },
];
let busObject = {
    'liveLocation': "Azadpur metro station, G, Sector 23 Road, Vijay vihar Phase I, Pocket 5, Sector-24, Rohini, Delhi",
    "CoordinatesBusStop": ["Model Town Metro Station, Police Residential Colony, Pocket B, Gujranwala Town Part 1, Gujranwala Town, Delhi", "GTB nagar metro station, Outram Lines, Mukherjee Nagar, Delhi", "Vishwa Vidyalaya Metro Station, Delhi"],
    "scheduled_time": "9:00"
}
function getBookings(pickUp) {
    let users = [];
    for (let i = 0; i < bookingCollection.length; i++) {
        let userPickUp = bookingCollection[i].pickUp;
        if (userPickUp == pickUp) {
            users.push(bookingCollection[i]);
        }
    }
    return users;
}
let busArrivalTimeToEachStop = [];
function calculateArrivalTime() {
    let timeP = getTime(busObject.liveLocation, busObject.CoordinatesBusStop[0]);
    for (let i = 1; i < busObject.CoordinatesBusStop.length; i++) {
        timeP = timeP.then(function (data) {
            // console.log(data + " I is "+i);
            busArrivalTimeToEachStop[i - 1] = data;
            return getTime(busObject.liveLocation, busObject.CoordinatesBusStop[i]);
        })
    }
    timeP.then(function (data) {
        busArrivalTimeToEachStop[busObject.CoordinatesBusStop.length - 1] = data;
        // console.log(data + "I is 3");
        // console.log(busArrivalTimeToEachStop);
        sendNotification();
    })
}
// console.log(busArrivalTimeToEachStop);
function sendNotification() {
    for (let i = 0; i < busObject.CoordinatesBusStop.length; i++) {
        let users = getBookings(busObject.CoordinatesBusStop[i]);
        if (users.length > 0) {
            let timeFromHomeToBusStopP = getTime(users[0].userLocation, users[0].pickUp);
            for (let j = 1; j < users.length; j++) {
                timeFromHomeToBusStopP = timeFromHomeToBusStopP.then(function (data) {
                    console.log("User is " + users[j - 1].userId);
                    calculateSetTimeoutTime(users[j - 1].userId,data,busArrivalTimeToEachStop[i]);  
                    return getTime(users[j].userLocation, users[j].pickUp);
                })
            }
            timeFromHomeToBusStopP.then(function (data) {
                console.log("User is " + users[users.length - 1].userId);
                calculateSetTimeoutTime(users[users.length - 1].userId,data,busArrivalTimeToEachStop[i]);  
            })
        }
    }
}
function getTime(origins, destinations) {
    var origins = [origins];                     //user location
    var destinations = [destinations];     // bus stop location
    return new Promise(function (resolve, reject) {
        duration.key('API_KEY');
        duration.mode('walking');
        duration.units('metric');
        duration.matrix(origins, destinations, function (err, durations) {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (!durations) {
                console.log('no durations');
            }
            if (durations.status == 'OK') {
                //console.log(durations);
                for (var i = 0; i < origins.length; i++) {
                    for (var j = 0; j < destinations.length; j++) {
                        var origin = durations.origin_addresses[i];
                        var destination = durations.destination_addresses[j];
                        if (durations.rows[i].elements[j].status == 'OK') {
                            var duration = (durations.rows[i].elements[j].duration.text);
                            // console.log('Time from ' + origin + ' to ' + destination + ' is ' + duration);
                            time = ((durations.rows[i].elements[j].duration.value + 300) / 60);
                            // console.log("Send Notification to the user before " + time + " minutes");
                            resolve(time);
                        } else {
                            // console.log(destination + ' is not reachable by land from ' + origin);
                        }
                    }
                }
            }
        });
    });
}
function calculateSetTimeoutTime(userId,timeFromHomeToBusStop,timeToBusStop){
    let time = busObject.scheduled_time.split(":");
    let hours = time[0];
    let minutes = time[1];
    let busTime = new Date();
    busTime.setHours(hours,minutes);
    let functionTime = new Date();
    functionTime.setHours(8,0);
    // console.log("Bus time is "+busTime.getTime());
    // console.log("Time from Home to bus stop "+timeFromHomeToBusStop * 60000);
    // console.log("Function calling time "+functionTime.getTime());
    let diff = busTime.getTime() + (timeToBusStop * 60000) - (timeFromHomeToBusStop * 60000) - functionTime.getTime();
    let nTime = new Date();
    nTime.setHours(19,functionTime.getMinutes() + (diff/60000));
    console.log("Notification will be send at "+nTime.getHours() + ":" + nTime.getMinutes()+" to "+userId);  
    // console.log("Value in setTimeout will be "+diff);  
    console.log("****************************************************************");
}
calculateArrivalTime();
// function every8am (yourcode) {
//     var now = new Date(),
//         start,
//         wait;

//     if (now.getHours() < 7) {
//         start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0, 0);
//     } else {
//         start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 8, 0, 0, 0);
//     }

//     wait = start.getTime() - now.getTime();

//     if(wait <= 0) { //If missed 8am before going into the setTimeout
//         console.log('Oops, missed the hour');
//         every8am(yourcode); //Retry
//     } else {
//         setTimeout(function () { //Wait 8am
//             setInterval(function () {
//                 yourcode();
//             }, 86400000); //Every day
//         },wait);
//     }
// }
// var yourcode = function () {
//     console.log('This will run everyday at 8am');
// };
// every8am(yourcode);