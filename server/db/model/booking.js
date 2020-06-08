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
    }
});

var bookingCollection = mongoose.model('bookingCollection', booking);
module.exports = bookingCollection;