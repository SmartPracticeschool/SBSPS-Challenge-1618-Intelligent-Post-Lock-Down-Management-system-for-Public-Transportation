const ratingCollection = require('../model/ratings');
const placeOperations=require('../helpers/placeoperation');
const placeCollection=require('../model/places');

const ratingOperations = {
    add(ratingObj,res){
        ratingCollection.create(ratingObj,(err,data)=>{
            if(err){
                console.log("Error while adding review",err);
            }
            else{
                console.log("Review is added successfully-------");
                //console.log(data);
                //placeOperations.findToPushReview(data);
                //res.send(ratingObj);
                placeCollection.findOne({_id:data.place_id},(err,doc)=>{
                    if(err){
                        console.log("error in finding the place in db",err);
                    }
                    else{
                        console.log(doc);
                        let userReviewsArr=doc.User_Reviews;
                        console.log(userReviewsArr);
                        userReviewsArr=userReviewsArr.push(data._id);
                        console.log(userReviewsArr);
                        doc.User_Reviews=userReviewsArr;
                        placeCollection.updateOne({_id:data.place_id},{$set:doc},(err)=>{
                            if(err){
                                console.log("Error occured while updating the place review",err);
                            }
                            else{
                                console.log("Successfuly data of place collection is updated");
                                res.send("Successfuly data of place collection is updated");
                            }
                        })
                    }
                })

            }
        })
    }
}
module.exports = ratingOperations