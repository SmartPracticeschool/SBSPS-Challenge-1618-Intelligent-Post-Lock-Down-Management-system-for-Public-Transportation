const erickCollection = require('../model/eRick');
var passwordHash = require("password-hash");
var duration = require('google-distance-matrix');


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
                res.send("Record Added....");
            }
        })
    },


    loginErick(loginObj,res){
        erickCollection.findOne({'email':loginObj.email},(err,doc)=>{
            if(err){
                console.log("Error while finding the user in erick collection");
            }
            else if(doc){
                var result=passwordHash.verify(loginObj.password,doc.password);
                if(result){
                    res.json({"loginObj":doc});
                }
                else{
                    console.log("Invalid userid or password in erick collection");
                }
            }
            else{
                console.log("Invalid userid or password");
            }
        })
    },



    findErick(erickObj,res){
          var origins = ["28.6296,77.0802","28.7367,77.1121","28.6098,77.1074"];                     //Erick location
          var destinations = ["28.606580,77.108170"];     // User location
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
                        if (durations.rows[i].elements[j].status == 'OK') {
                            var distance = (durations.rows[i].elements[j].distance.text);
                            if(distance<="0.6 km"){
                                console.log("hello.............");
                                //res.send("Erick Within 500 m available");
                            }
                        } else {
                            console.log(destination + ' is not reachable by land from ' + origin);
                        }
                    }
                }
            }
        })
    }
}

module.exports = erickOperation;