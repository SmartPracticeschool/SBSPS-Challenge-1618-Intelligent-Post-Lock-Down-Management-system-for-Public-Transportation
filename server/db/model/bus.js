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
    'totalSeats': {
        type: String
    },
    'bookedSeats': [{
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
    'scheduled_days': [], //M,W,F types
    'schedule_time': [], //{start,end}
    'avg_duration': {
        type: String
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