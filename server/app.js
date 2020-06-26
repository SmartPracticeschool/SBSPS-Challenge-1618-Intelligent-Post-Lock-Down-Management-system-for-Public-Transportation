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
app.use('/book',require('./routes/bookingservice'));
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
    socket.on('UpdateErick',loginObj=>{
        loginObj.socket_id=socket.id;
        socketOperations.updateErickSocketId(loginObj);
    })
    var arr=[{"socket_id":"ddfdf","username":"Manik"},{"socket_id":"gfdgre","username":"Himank"}];
    for(let i=0;i<arr.length;i++){
        io.to(arr[i].socket_id).emit('AcceptTheUserRideRequest', 'Do you want to accept the user ride');
    }
    var response=[];
    //erick ka details ka sat consent attach karka send karna
    socket.on("TheErickDriverConsent",consent=>{
        response.push(consent);
    })
    socket.on('Coords_update', (data) => {

        socketOperations.updateCoords(data);

    });
    socket.on('disconnect', () => console.log('connection gone..'));

});