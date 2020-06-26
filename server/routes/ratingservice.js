const express = require('express');
const ratingCollection = require('../db/model/ratings');

const route = express.Router();

route.post('/addreview',(req,res)=>{
    var reviewObj=req.body;
    const placeOperations=require("../db/helpers/placeoperation");
    placeOperations.findPlace(reviewObj);
})

module.exports = route;