const express = require('express');
const ratingCollection = require('../db/model/ratings');

const route = express.Router();

//Add a review 

route.post('/addreview',(req,res)=>{
    var ratingObj = req.body;
    const ratingOperations = require('../db/helpers/ratingoperation');
    ratingOperations.add(ratingObj,res);
})

module.exports = route;


// connect rating and places