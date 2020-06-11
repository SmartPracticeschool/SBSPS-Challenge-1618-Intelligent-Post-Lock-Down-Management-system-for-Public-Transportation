var userCollection = require('../model/user');
var busCollection = require('../model/bus');
var erickCollection = require('../model/eRick');

var socketOperations = {

    updateCoords(obj, res) {

        //obj.role->{user,bus,erick}
        //obj.clientID->{_id}
        //obj.coords->{lat,long,time}

        var collection;
        if (obj.role == 'user') {
            collection = userCollection;
        }
        if (obj.role == 'bus') {
            collection = busCollection;
        }
        if (obj.role == 'erick') {
            collection = erickCollection;
        }


        collection.findOne({
            _id: obj.clientID
        }, (err, doc) => {
            if (err) {
                res.json('Something went Wrong');
                console.log('Error During User Search ', err);
            } else if (doc) {

                if (doc.liveLocation == null) {
                    //simply update livelcation of the collection
                    collection.updateOne({
                        _id: data.clientID
                    }, {
                        liveLocation: obj.coords
                    }, (err, doc) => {
                        if (err) {
                            console.log('Error During updating coords ', err);
                        } else {
                            console.log(obj.role + ' coords updated');
                            res.send(obj.role + ' coords updated');
                        }

                    });
                } else if (doc.liveLocation != null) {

                    if (Math.abs(doc.liveLocation.time - obj.coords.time) >= 10000) {
                        collection.updateOne({
                            _id: data.clientID
                        }, {
                            liveLocation: obj.coords
                        }, (err, doc) => {
                            if (err) {
                                console.log('Error During updating coords ', err);
                            } else {
                                console.log(obj.role + ' coords updated');
                                res.send(obj.role + ' coords updated')
                            }

                        });
                    } else {
                        res.send('early call');
                    }
                }

            }
        })

    }


}
module.exports = socketOperations;