const mongoose = require('../connection');
const Schema = mongoose.Schema;



var erickDetails = new Schema({
    'ownerName': {
        type: String
    },
    'driverName': {
        type: String
    },
    'email':{
        type:String
    },
    'password': {
        type: String
    },
    'socket_id':{
        type:String
    },
    'role':{
        type:String,
        default:'erickdriver'
    },
    'vehicleRegistrationNumber': {
        type: String
    },
    'creationDate': {
        type: Date
    },
    'phoneNumber': {
        type: String,
        default: null
    },

    'BookedSeats': [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookingCollection',
        default: null
    }],

    'liveLocation': {
        'lat': {
            type: String,
            default: null
        },
        'long': {
            type: String,
            default: null
        }
    },

});

var erickCollection = mongoose.model('erickCollection', erickDetails);
module.exports = erickCollection;