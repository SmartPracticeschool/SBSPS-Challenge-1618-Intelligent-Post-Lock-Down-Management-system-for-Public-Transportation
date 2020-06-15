const mongoose = require('mongoose');
const credentials  = require('../utils/Config');
mongoose.connect(`mongodb+srv://${credentials.username}:${credentials.password}@covidlockdowntransportation-lbmn5.mongodb.net/<dbname>?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;
