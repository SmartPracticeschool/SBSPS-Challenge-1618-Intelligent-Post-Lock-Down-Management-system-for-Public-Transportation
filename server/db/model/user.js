const mongoose = require('../connection');
const Schema = mongoose.Schema;



var user = new Schema({
    'name': {
        type: String
    },
    'password': {
        type: String
    },
    'creationDate': {
        type: Date
    },
    'phoneNumber': {
        type: String,
        default: null
    },
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
    'ratings': [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ratingCollection',
        default: null
    }]
});

var userCollection = mongoose.model('userCollection', user);
module.exports = userCollection;