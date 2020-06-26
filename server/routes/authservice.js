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
    //userObj.creationDate=Date.now();
    const userOperations = require("../db/helpers/useroperation");
    userOperations.addUser(userObj, res);
})

route.post('/rickregister', (req, res) => {
    var erickObj = req.body;
    const erickOperations = require('../db/helpers/erickoperation');
    erickOperations.add(erickObj,res);
})

route.post('/dologin',(req,res)=>{
    var loginObj=req.body;
    const userOperations=require('../db/helpers/useroperation');
    userOperations.loginUser(loginObj,res);
})

module.exports = route;