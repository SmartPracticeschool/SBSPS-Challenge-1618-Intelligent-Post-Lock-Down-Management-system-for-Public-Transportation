const mongoose = require('../connection');
const Schema = mongoose.Schema;



var booking = new Schema({
    'VehicleID': {
        type: String,
        default: false
    },
    'UserID': {
        type: String,
        default: false
    },
    'seatId': {
        type: String,
        default: false
    },
    'price': {
        type: String,
        default: false
    },
    'creationDate': {
        type: Date
    },
    'pickUp':{
        'lat':{
            type:String,
            default:null
        },
        'long':{
            type:String,
            default:null
        }
    },
    'drop':{
        'lat':{
            type:String,
            default:null
        },
        'long':{
            type:String,
            default:null
        }
    }
});

var bookingCollection = mongoose.model('bookingCollection', booking);
module.exports = bookingCollection;