const busCollection = require('../model/bus');
const { set } = require('mongoose');

const busstopOperation = {
    findStop(userObject, res) {
        busCollection.find({}, (err, doc) => {
            if (err) {
                console.log(err);
                res.send("Error occured during searching Stops in db");
            }
            if (doc) {
                let allBuses = doc;
                var availableStops = new Array();
                for (let i = 0; i < allBuses.length; i++) {
                    let currBus = allBuses[i];
                    let coordinates = currBus.CoordinatesBusStop;
                        for (let j = 0; j < coordinates.length; j++) {
                                availableStops.push(new Object({"lat":coordinates[j].lat,"long":coordinates[j].long,"address":coordinates[j].address}));
                        }
                }

                //console.log(availableStops);
                jsonObject = availableStops.map(JSON.stringify); 
                //console.log(jsonObject); 
                uniqueSet = new Set(jsonObject); 
                uniqueArray = Array.from(uniqueSet).map(JSON.parse); 
      
                console.log(uniqueArray); 
                res.send(uniqueArray);
            }
        })
    }
}

module.exports = busstopOperation;