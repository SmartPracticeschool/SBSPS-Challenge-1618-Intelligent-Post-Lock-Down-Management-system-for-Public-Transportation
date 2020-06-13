const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://:@covidlockdowntransportation-lbmn5.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;
