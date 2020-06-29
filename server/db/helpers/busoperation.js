const busCollection = require('../model/bus');
// const seatCollection = require('../model/seat');
var passwordHash = require("password-hash");
const seatOperations = require("./seatoperation");
const erickOperations=require("../helpers/erickoperation");

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
                // res.json({"msg" : "Record Added...."});
            }
        })
        for (let i = 0; i < busObj.totalSeats; i++) {
            // console.log("Number of iteration ",i);
            var seatObj = {};
            seatObj.seatNumber=i+1;
            seatObj.price = busObj.price;
            seatObj.busId = busObj.vehicleRegistrationNumber;
            seatOperations.addSeat(seatObj);
        }
        console.log("Registered and seat added successfully");
        res.json({"msg" : "Registered successfully"});
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
                            if (userObject.startLocation == coordinates[j].address ) {
                                passThroughStart = true;
                            }
                            if (userObject.endLocation == coordinates[j].address) {
                                passThroughEnd = true;
                            }
                            // if (userObject.startLocation[0].lat == coordinates[j].lat && userObject.startLocation[1].long == coordinates[j].long) {
                            //     passThroughStart = true;
                            // }
                            // if (userObject.endLocation[0].lat == coordinates[j].lat && userObject.endLocation[1].long == coordinates[j].long) {
                            //     passThroughEnd = true;
                            // }
                        }
                        if (passThroughStart && passThroughEnd) {
                            availableBuses.push(currBus);
                        }
                    }
                }
                res.send(availableBuses);
            }
        })
    },

    loginBus(loginObj,res){
        console.log(loginObj);
        busCollection.findOne({'email':loginObj.email},(err,doc)=>{
            if(err){
                console.log("Error while finding the bus driver");
            }
            else if(doc){
                var result=passwordHash.verify(loginObj.password,doc.password);
                if(result){
                    console.log("User found in bus schema");
                    res.json({"loginObj":doc ,"isLoggedIn" : true});
                }
                else{
                    console.log("Invalid user name or password in bus schema");
                    res.json({"msg":"Invalid userid or password"});
                }
            }
            else{
                console.log("User not found in bus operations");
                erickOperations.loginErick(loginObj,res);
            }
        })
    }
}

module.exports = busOperation;