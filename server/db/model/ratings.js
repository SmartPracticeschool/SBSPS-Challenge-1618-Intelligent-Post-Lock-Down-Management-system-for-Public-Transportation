const mongoose = require('../connection');
const Schema = mongoose.Schema;



var rating = new Schema({
    'userId': {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userCollection',
        default: null
    },
    'location': {
        'lat': {
            type: String,
            default: null
        },
        'long': {
            type: String,
            default: null
        }
        // 'lat': '',             // Change this during connection
        // 'long': ''
    },
    'social_hygiene': {
        type: String
    },
    'social_distancing': {
        type: String
    },
    'sanitation_availability': {
        type: String
    },
    'remarks': {
        type: String
    },
    'average_score': {
        type: String,
        default: null
    },
    'place_id': {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'placeCollection',
        default: null
    }

});

var ratingCollection = mongoose.model('ratingCollection', rating);
module.exports = ratingCollection;