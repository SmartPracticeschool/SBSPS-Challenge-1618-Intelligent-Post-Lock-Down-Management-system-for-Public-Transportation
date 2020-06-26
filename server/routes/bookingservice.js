const express = require('express');
const bookingCollection = require("../db/model/booking");
const seatCollection = require("../db/model/seat");

const route = express.Router();

route.post('/findstop',(req,res)=>{
    var userObject = req.body;
    const busstopOperation = require('../db/helpers/busstopoperation');
    busstopOperation.findStop(userObject,res);
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

route.post('/bookingbus', (req, res) => {
    var bookingObj = req.body;
    const seatOperations = require("../db/helpers/seatoperation");
    var emptySeat = seatOperations.findEmptySeat(bookingObj, res);
    //console.log(emptySeat);
})

route.post('/notification',(req,res)=>{
    const notificationOperations = require("../db/helpers/notificationoperation");
    notificationOperations.calculateArrivalTime(res);
})

route.post('/findrick', (req, res) => {
    var userObject = req.body;
    const erickOperations = require('../db/helpers/erickoperation');
    erickOperations.findErick(userObject,res);
})

module.exports = route;