const mongoose = require('../connection');
const Schema = mongoose.Schema;



var rating = new Schema({
    'userId': {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userCollection',
        default: null
    },
    'location': {
        'lat': '',
        'long': ''
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
        type: string
    },
    'average_score': {
        type: String,
        default: null
    }

});

var ratingCollection = mongoose.model('ratingCollection', rating);
module.exports = ratingCollection;