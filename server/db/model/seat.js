const mongoose = require('../connection');
const Schema = mongoose.Schema;



var seat = new Schema({
    'seatNumber':{
        type:String
    },
    'isoccupied': {
        type: Boolean,
        default: false
    },
    'busId': {
        type: String,
        ref: 'busCollection',
        default: null
    },
    'price': {
        type: String
    },
    'bookingId': {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookingCollection',
        default: null
    }

});

var seatCollection = mongoose.model('seatCollection', seat);
module.exports = seatCollection;