const express = require('express');
var socketOperations = require('./db/helpers/socketOperations');
var socket = require('socket.io');

const app = express();

const PORT = process.env.PORT || 1234;
var bodyParser = require('body-parser');

//app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers", "*");
    next();
});

app.get('/', (req, res) => {
    console.log('request on server is :', req.method);
    res.send('Main Server api started');
});
app.use('/', require('./routes/authservice'));
//app.use('/auth', require('./route/authservice'));
app.use('/rate',require('./routes/ratingservice'));
//
//
app.use((req, res) => res.send('invalid request configured'));



var server = app.listen(PORT, () => {
    console.log("Connected to port:" + PORT);
})

var io = socket(server);
io.sockets.on('connection', (socket) => { //customise for the working of react

    console.log('New Connection Established: ', socket.request.connection._peername + ' Total number of connections:', io.sockets.server.engine.clientsCount); //interface of coords sharing

    socket.on('Coords_update', (data) => {

        socketOperations.updateCoords(data);

    });
    socket.on('disconnect', () => console.log('connection gone..'));

});