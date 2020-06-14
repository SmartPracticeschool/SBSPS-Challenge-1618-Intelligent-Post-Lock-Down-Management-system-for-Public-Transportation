const busCollection = require('../model/bus');
// const seatCollection = require('../model/seat');
var passwordHash = require("password-hash");
const seatOperations = require("./seatoperation");

const busOperation = {
    add(busObj, res) {
        var hash = passwordHash.generate(busObj.password);
        busObj.password = hash;
        busCollection.create(busObj, (err) => {
            if (err) {
                // res.send("Error while adding bus driver");
                console.log("Error while adding the bus driver", err);
            }
            else {
                console.log("The bus driver has been registered successfully");
                // res.send("Record Added....");
            }
        })
        for (let i = 0; i < busObj.totalSeats; i++) {
            // console.log("Number of iteration ",i);
            var seatObj = {};
            seatObj.price = busObj.price;
            seatObj.busId = busObj.vehicleRegistrationNumber;
            seatOperations.addSeat(seatObj);
        }
        res.send("Registered and seat added successfully");
    },
    findBuses(userObject, res) {
        busCollection.find({}, (err, doc) => {
            if (err) {
                console.log(err);
                res.send("Error occured during searching in db");
            }
            if (doc) {
                let allBuses = doc;
                let availableBuses = [];
                for (let i = 0; i < allBuses.length; i++) {
                    let currBus = allBuses[i];
                    let days = currBus.scheduled_days;
                    if (days.indexOf(userObject.day) != -1) {
                        let coordinates = currBus.CoordinatesBusStop;
                        let passThroughStart = false;
                        let passThroughEnd = false;
                        for (let j = 0; j < coordinates.length; j++) {
                            if (userObject.startLocation[0].lat == coordinates[j].lat && userObject.startLocation[1].long == coordinates[j].long) {
                                passThroughStart = true;
                            }
                            if (userObject.endLocation[0].lat == coordinates[j].lat && userObject.endLocation[1].long == coordinates[j].long) {
                                passThroughEnd = true;
                            }
                        }
                        if (passThroughStart && passThroughEnd) {
                            availableBuses.push(currBus);
                        }
                    }
                }
                res.send(availableBuses);
            }
        })
    }
}

module.exports = busOperation;