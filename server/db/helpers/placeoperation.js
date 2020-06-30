const placeCollection=require('../model/places');
const ratingOperations=require('../helpers/ratingoperation');
const ratingCollection = require('../model/ratings');

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
    },
    checkReview(reviewObj,res){
        placeCollection.findOne({'location.lat':reviewObj.location.lat,'location.long':reviewObj.location.long},(err,doc)=>{
            if(err){
                console.log("Error while finding a particular place ",err);
            }
            else if(doc==null){
                console.log("No Review present please be the first one to add the review");
                //res.send("No Review present please be the first one to add the review");
            }
            else {
                //console.log(doc);
                ratingCollection.find({'place_id':doc._id},(err,data)=>{
                    if(err){
                        console.log("Error while finding the review",err);
                    }
                    else{
                        //console.log("rating",data);
                        let id = data._id;
                        let social_hygiene = 0;
                        let social_distancing = 0;
                        let sanitation_availability = 0;
                        let average_score = 0;
                        var obj = {remarks:[]};
                        for(let i=0;i<data.length;i++){
                            social_hygiene = parseInt(social_hygiene) + parseInt(data[i].social_hygiene);
                            social_distancing = parseInt(social_distancing) + parseInt(data[i].social_distancing);
                            sanitation_availability = parseInt(sanitation_availability) + parseInt(data[i].sanitation_availability);
                            obj.remarks.push(data[i].remarks);
                        }
                        //average_score = (social_hygiene/data.length + social_distancing/data.length + sanitation_availability/data.length)/3;

                        obj.social_hygiene = social_hygiene/data.length;
                        obj.social_distancing = social_distancing/data.length;
                        obj.sanitation_availability = sanitation_availability/data.length;
                        //obj.average_score = average_score;
                        
                        console.log("object is",obj);
                        res.send(obj);

                        // console.log("social_hyg",social_hygiene/data.length);
                        // console.log("social_hyg",social_distancing/data.length);
                        // console.log("social_hyg",sanitation_availability/data.length);
                        // console.log(remarks);
                    }
                })
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