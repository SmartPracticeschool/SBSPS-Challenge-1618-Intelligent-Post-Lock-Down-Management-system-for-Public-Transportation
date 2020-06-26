const express = require('express');
const busCollection = require('../db/model/bus');

const route = express.Router();

//Register and login for Bus driver routes

route.post('/busregister', (req, res) => {
    var busObj = req.body;
    //busObj.creationDate=Date.now();
    const busOperations = require('../db/helpers/busoperation');
    busOperations.add(busObj, res);
})
//Register and login for user routes

route.post('/userregister', (req, res) => {
    var userObj = req.body;
    console.log(userObj);
    //userObj.creationDate=Date.now();
    const userOperations = require("../db/helpers/useroperation");
    userOperations.addUser(userObj, res);
})

route.post('/bookingbus', (req, res) => {
    var bookingObj = req.body;
    const seatOperations = require("../db/helpers/seatoperation");
    var emptySeat = seatOperations.findEmptySeat(bookingObj, res);
    //console.log(emptySeat);
})

route.post('/findbuses', (req, res) => {
    var userObject = req.body;
    userObject.day = findDay(new Date());
    const busOperations = require("../db/helpers/busoperation");
    busOperations.findBuses(userObject, res);
})
function findDay(date) {
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    let n = weekday[date.getDay()];
    return n;
}

route.post('/findstop',(req,res)=>{
    var userObject = req.body;
    const busstopOperation = require('../db/helpers/busstopoperation');
    busstopOperation.findStop(userObject,res);
})


route.post('/notification',(req,res)=>{
    const notificationOperations = require("../db/helpers/notificationoperation");
    notificationOperations.calculateArrivalTime(res);
})


route.post('/rickregister', (req, res) => {
    var erickObj = req.body;
    const erickOperations = require('../db/helpers/erickoperation');
    erickOperations.add(erickObj,res);
})


route.post('/findrick', (req, res) => {
    var userObject = req.body;
    const erickOperations = require('../db/helpers/erickoperation');
    erickOperations.findErick(userObject,res);
})

route.post('/dologin',(req,res)=>{
    var loginObj=req.body;
    const userOperations=require('../db/helpers/useroperation');
    userOperations.loginUser(loginObj,res);
})


route.post('/addreview',(req,res)=>{
    var reviewObj=req.body;
    const placeOperations=require("../db/helpers/placeoperation");
    placeOperations.findPlace(reviewObj);
})

module.exports = route;