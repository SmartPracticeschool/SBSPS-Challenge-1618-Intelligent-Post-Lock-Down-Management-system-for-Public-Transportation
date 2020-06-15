var duration = require('google-distance-matrix');

var usercollection = require('../model/user');
var bookingcollection = require('../model/booking');

const notificationOperations = {

    findDistance(distObj,err){
        //  usercollection.find((err,doc)=>{
        //     if(err){
        //         console.log("Error while finding bus stop",err);
        //     }
        //     else{
          var time;
          var origins = ['Wz-1254 A,Nangal Raya,New Delhi'];                     //user location
          var destinations = ['Janakpuri District CenterJanakpuri, Delhi'];     // bus stop location
          duration.key('YOUR_API_KEY');
          duration.mode('walking');                                 
          duration.units('metric');

          duration.matrix(origins, destinations, function (err, durations) {
            if (err) {
                return console.log(err);
            }
            if(!durations) {
                return console.log('no durations');
            }
            if (durations.status == 'OK') {
              //console.log(durations);
                for (var i=0; i < origins.length; i++) {
                    for (var j = 0; j < destinations.length; j++) {
                        var origin = durations.origin_addresses[i];
                        var destination = durations.destination_addresses[j];
                        if (durations.rows[0].elements[j].status == 'OK') {
                            var duration = (durations.rows[i].elements[j].duration.text);
                            console.log('Time from ' + origin + ' to ' + destination + ' is ' + duration);
                            time = ((durations.rows[i].elements[j].duration.value + 300 ) /60);
                            console.log("Send Notification to the user before "+time+" minutes");
                        } else {
                            console.log(destination + ' is not reachable by land from ' + origin);
                        }
                    }
                }
            }
        });
    }
}
module.exports = notificationOperations;