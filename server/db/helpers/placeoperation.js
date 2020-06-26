const placeCollection=require('../model/places');
const ratingOperations=require('../helpers/ratingoperation');

const placeOperations={
    findPlace(reviewObj){
        placeCollection.find({'location.lat':reviewObj.location.lat,'location.long':reviewObj.location.long},(err,doc)=>{
            if(err){
                console.log("Error while finding a particular place ",err);
            }
            else{
                reviewObj.place_id=doc._id;
                console.log("Calling the update function of places");
                ratingOperations.add(reviewObj);
            }
        })
    },

    findToPushReview(reviewdata){
        placeCollection.find({_id:reviewdata.place_id},(err,data)=>{
            if(err){
                console.log("Error in find function in findToPushReview",err);
            }
            else{
               var userReviewsArr= data.User_Reviews;
               userReviewsArr=userReviewsArr.push(data._id);
               data.User_Reviews=userReviewsArr;
               placeCollection.updateOne({_id:reviewdata.place_id},{$set:data},(err)=>{
                   if(err){
                       console.log("Error occured while updating the place review",err);
                   }
                   else{
                       console.log("Successfully data of place collection updated");
                   }
               })
            }
        })
    }
}

module.exports=placeOperations;