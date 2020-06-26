const ratingCollection = require('../model/ratings');
const placeOperations=require('../helpers/placeoperation');

const ratingOperations = {
    add(ratingObj,res){
        ratingCollection.create(ratingObj,(err,data)=>{
            if(err){
                console.log("Error while adding review",err);
            }
            else{
                console.log("Review is added successfully-------");
                placeOperations.findToPushReview(data);
                //res.send(ratingObj);
            }
        })
    }
}
module.exports = ratingOperations