const placeCollection=require('../model/places');
const ratingOperations=require('../helpers/ratingoperation');

const placeOperations={
    addPlace(reviewObj,res){
        var placeObj={};
        placeObj.location=reviewObj.location;
        placeCollection.create(placeObj,(err,doc)=>{
            if(err){
                console.log("Error occured while creating place",err);
            }
            else{
                console.log(doc);
                reviewObj.place_id=doc._id;
                console.log("Calling the update function of places from addPlace");
                ratingOperations.add(reviewObj,res);
            }
        })
    },
    findPlace(reviewObj,res){
        placeCollection.findOne({'location.lat':reviewObj.location.lat,'location.long':reviewObj.location.long},(err,doc)=>{
            if(err){
                console.log("Error while finding a particular place ",err);
            }
            else if(doc==null){
                placeOperations.addPlace(reviewObj,res);
            }
            else {
                console.log(doc);
                reviewObj.place_id=doc._id;
                console.log("Calling the update function of places");
                ratingOperations.add(reviewObj,res);
            }
        })
    }
    // findToPushReview(reviewdata){
    //     placeCollection.findOne({_id:reviewdata.place_id},(err,data)=>{
    //         if(err){
    //             console.log("Error in find function in findToPushReview",err);
    //         }
    //         else{
    //            console.log(data);
    //            var userReviewsArr= data.User_Reviews;
    //            console.log(userReviewsArr);
    //            userReviewsArr=userReviewsArr.push(reviewdata._id);
    //            console.log(userReviewsArr);
    //            data.User_Reviews=userReviewsArr;
    //            placeCollection.updateOne({_id:reviewdata.place_id},{$set:data},(err)=>{
    //                if(err){
    //                    console.log("Error occured while updating the place review",err);
    //                }
    //                else{
    //                    console.log("Successfully data of place collection updated");
    //                }
    //            })
    //         }
    //     })
    // }
}

module.exports=placeOperations;