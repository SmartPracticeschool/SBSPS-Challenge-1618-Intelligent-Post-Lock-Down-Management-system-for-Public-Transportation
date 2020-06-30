const erickCollection = require('../model/eRick');
var passwordHash = require("password-hash");
var duration = require('google-distance-matrix');
let credentials = require('../../utils/credentials');
const { findDistance } = require('./notificationoperation');

const erickOperation = {
    add(erickObj, res) {
        var hash = passwordHash.generate(erickObj.password);
        erickObj.password = hash;
        erickCollection.create(erickObj, (err) => {
            if (err) {
                res.send("Error while adding E-rickshaw driver");
                console.log("Error while adding the E-rickshaw driver", err);
            }
            else {
                console.log("The E-rickshaw driver has been registered successfully");
                res.json({"msg" : "Registerd Successfully"});
            }
        })
    },
    loginErick(loginObj, res) {
        erickCollection.findOne({ 'email': loginObj.email }, (err, doc) => {
            if (err) {
                console.log("Error while finding the user in erick collection");
            }
            else if (doc) {
                var result = passwordHash.verify(loginObj.password, doc.password);
                if (result) {
                    res.json({ "loginObj": doc , "isLoggedIn" : true});
                }
                else {
                    console.log("Invalid userid or password in erick collection");
                    res.json({"isLogged" : false,"msg":"Invalid userid or password"});
                }
            }
            else {
                console.log("Invalid userid or password");
                res.json({"isLogged" : false});
            }
        })
    },
    async findErick(userObject, res) {
        let eRickList;
        let eRickListNearMe = [];
        await erickCollection.find({}, (err, doc) => {
            if (err) {
                console.log("Error while finding in erick collection");
            }
            else if (doc) {
                console.log(doc);
                eRickList = doc;
            }
        });
        if (eRickList.length > 0) {
            let isERickNearP = this.findDistance(userObject.liveLocation, eRickList[0].liveLocation);
            for (let i = 1; i < eRickList.length; i++) {
                isERickNearP = isERickNearP.then(function (isNear) {
                    if (isNear) {
                        // console.log(rickObject[i - 1])
                        eRickListNearMe.push(eRickList[i - 1]);
                    }
                    return findDistance(userObject.liveLocation, eRickList[i].liveLocation);
                });
            }
            isERickNearP.then(function (isNear) {
                if (isNear) {
                    // console.log(rickObject[rickObject.length - 1])
                    eRickListNearMe.push(eRickList[eRickList.length - 1]);
                }
                console.log("E-Rick list");
                for (let i = 0; i < eRickListNearMe.length; i++) {
                    console.log(i + 1 + ". Driver Name : " + eRickListNearMe[i].driverName + " , Location : " + eRickListNearMe[i].liveLocation);
                }
                if(eRickListNearMe > 0){
                    res.send(eRickListNearMe);
                }
                else{
                    res.send("No E-Ricks Available in your area");
                }
            });
        }
        else {
            res.send("No E-Ricks Available in your area");
        }
    },
    findDistance(origin, destination) {
        return new Promise(function (resolve, reject) {
            var origins = [origin];
            var destinations = [destination];
            duration.key(credentials.api_key);
            duration.mode('walking');
            duration.units('metric');

            duration.matrix(origins, destinations, function (err, durations) {
                if (err) {
                    reject(err);
                    console.log(err);
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
                                var distance = (durations.rows[i].elements[j].distance.text);
                                if (distance <= "1 km") {
                                    resolve(true);
                                    //res.send("Erick Within 500 m available");
                                }
                                resolve(false);
                            } else {
                                console.log(destination + ' is not reachable by land from ' + origin);
                                resolve(false);
                            }
                        }
                    }
                }
            })
        })
    }

}

module.exports = erickOperation;