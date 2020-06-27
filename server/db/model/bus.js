const mongoose = require('../connection');
const Schema = mongoose.Schema;



var busDetails = new Schema({
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
    'role':{
        type:String,
        default:'busdriver'
    },
    'vehicleRegistrationNumber': {
        type: String
    },

    'creationDate': {
        type: Date,
        default:Date.now()
    },
    'phoneNumber': {
        type: String,
        default: null
    },
    'totalSeats': {
        type: String
    },
    'price':{
        type:Number
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
    'CoordinatesBusStop': [{
        'address' : {
            type : String
        },
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