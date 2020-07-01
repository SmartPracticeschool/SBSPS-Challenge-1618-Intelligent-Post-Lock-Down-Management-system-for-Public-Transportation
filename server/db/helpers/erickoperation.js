const erickCollection = require('../model/eRick');
var passwordHash = require("password-hash");
var duration = require('google-distance-matrix');
let credentials = require('../../utils/credentials');
// const findERicks = require('../../utils/findEricks');
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
                res.json({ "msg": "Registerd Successfully" });
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
                    res.json({ "loginObj": doc, "isLoggedIn": true });
                }
                else {
                    console.log("Invalid userid or password in erick collection");
                    res.json({ "isLogged": false, "msg": "Invalid userid or password" });
                }
            }
            else {
                console.log("Invalid userid or password");
                res.json({ "isLogged": false });
            }
        })
    },
    async findErick(userObject, res) {
        let eRickList;
        let eRickListNearMe = [];
        let promises = [];
        await erickCollection.find({}, (err, doc) => {
            if (err) {
                console.log("Error while finding in erick collection");
            }
            else if (doc) {
                // console.log(doc);
                eRickList = doc;
            }
        });
        // if (eRickList.length > 0) {
            for (let i = 0; i < eRickList.length; i++) {
                promises.push(this.findDistance(userObject.liveLocation, eRickList[i].liveLocation.address));
            }
            let resolvedPromises = await Promise.all(promises);
            // console.log("All promises resolved");
            for (let i = 0; i < resolvedPromises.length; i++) {
                // console.log(resolvePromises[i]);
                if (resolvedPromises[i]) {
                    eRickListNearMe.push(eRickList[i]);
                }
            }
            res.send(eRickListNearMe);
            // console.log("E-Rick List ", eRickListNearMe);
            // if (eRickListNearMe.length > 0) {
            //     res.send(eRickListNearMe);
            // }
            // else {
            //     res.send("No E-Ricks Available in your area");
            // }
        // }
        // else {
        //     res.send("No E-Ricks Available in your area");
        // }
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