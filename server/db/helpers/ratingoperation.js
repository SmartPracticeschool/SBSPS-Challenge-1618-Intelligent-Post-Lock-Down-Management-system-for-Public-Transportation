const ratingCollection = require('../model/ratings');

const ratingOperations = {
    add(ratingObj,res){
        ratingCollection.create(ratingObj,(err)=>{
            if(err){
                console.log("Error while adding review");
            }
            else{
                console.log("Review is added successfully-------");
                res.send(ratingObj);
            }
        })
    }
}
module.exports = ratingOperations