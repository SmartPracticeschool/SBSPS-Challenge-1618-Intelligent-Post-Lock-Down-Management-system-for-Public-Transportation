let duration = require('google-distance-matrix');
let rickObject = [
    {
        "driverName": "Shivam",
        "liveLocation": "West Mukherjee Nagar, Tagore Park Extension, Mukherjee Nagar, Delhi, 110009"
    },
    {
        "driverName": "Manik",
        "liveLocation": "Thekedaar Surjeet Singh Marg, GTB Nagar, Delhi, 110009"
    },
    {
        "driverName": "Himank",
        "liveLocation": "49, Om Mandir Marg, Purani Chaupal, Dhaka Colony, Mukherjee Nagar, Delhi, 110033"
    },
    {
        "driverName": "Shobhit",
        "liveLocation": "Shop No.-132, Ground Floor, GTB Nagar, Delhi 110009"
    }
]
let userObject = {"name":"Ram","liveLocation":"65, Ring Rd, Outram Lines, GTB Nagar, New Delhi, Delhi 110009"};
let eRickList = [];
function findErick(userObject) {
    let isERickNearP = findDistance(userObject.liveLocation,rickObject[0].liveLocation);
    for(let i = 1 ; i < rickObject.length ; i++){
        isERickNearP = isERickNearP.then(function(isNear){
            if(isNear){
                // console.log(rickObject[i - 1])
                eRickList.push(rickObject[i - 1]);
            }
            return findDistance(userObject.liveLocation,rickObject[i].liveLocation);
        });
    }
    isERickNearP.then(function(isNear){
        if(isNear){
            // console.log(rickObject[rickObject.length - 1])
            eRickList.push(rickObject[rickObject.length - 1]);
        }
        console.log("E-Rick list");
        for(let i = 0 ; i < eRickList.length ; i++){
            console.log(i+1+". Driver Name : "+eRickList[i].driverName+" , Location : "+eRickList[i].liveLocation);
        }
    });
}
function findDistance(origin, destination) {
    return new Promise(function (resolve, reject) {
        var origins = [origin];
        var destinations = [destination];
        duration.key('API_KEY');
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
                        }
                    }
                }
            }
        })
    })
}
findErick(userObject);