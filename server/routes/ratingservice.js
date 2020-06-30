const express = require('express');
const ratingCollection = require('../db/model/ratings');

const route = express.Router();

route.post('/addreview',(req,res)=>{
    var reviewObj=req.body;
    const placeOperations=require("../db/helpers/placeoperation");
    placeOperations.findPlace(reviewObj,res);
})

route.post('/checkreview',(req,res)=>{
    var reviewObj=req.body;
    const placeOperations=require("../db/helpers/placeoperation");
    placeOperations.checkReview(reviewObj,res);
})

module.exports = route;