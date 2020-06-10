const mongoose = require('../connection');
const Schema = mongoose.Schema;



var place = new Schema({
    'location': {
        'lat': '',
        'long': ''
    },
    'Covid_Zone': {
        type: String,
        default: null
    },
    'rating': {
        type: String,
        default: null
    },
    'User_Reviews': [{
        type: String
    }]

});

var placeCollection = mongoose.model('placeCollection', place);
module.exports = placeCollection;