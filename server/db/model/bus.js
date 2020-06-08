const mongoose = require('../connection');
const Schema = mongoose.Schema;



var busDetails = new Schema({
    'ownerName': {
        type: String
    },
    'driverName': {
        type: String
    },
    'password': {
        type: String
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
    'TotalSeats': {
        type: String
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
    'CoordinatesBusStop': [{
        'lat': {
            type: String,
            default: null
        },
        'long': {
            type: String,
            default: null
        }
    }]
});

var busCollection = mongoose.model('busCollection', busDetails);
module.exports = busCollection;