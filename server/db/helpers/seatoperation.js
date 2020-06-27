const seatCollection=require('../model/seat');
const bookingOperation=require("./bookingoperation");

const seatOperations={
    addSeat(seatObj){
        //var seatObj={};
        
        seatCollection.create(seatObj,(err)=>{
            if(err){
                console.log("Error while adding seats",err);
                //res.send("Error while creating seats");
            }
            else{
                console.log(seatObj);
                console.log("Seats created successfuly");
               // res.send("Seats created successfully");
            }
        })
    },

    findEmptySeat(bookinObj,res){
        seatCollection.find({busId:bookinObj.VehicleID,isoccupied:false},(err,doc)=>{
            if(err){
                console.log("Error while finding");
            }
            else{
                console.log("Inside find empty seat");
                bookinObj.seatId=doc[0]._id;
                bookinObj.price=doc[0].price;
                console.log(bookinObj);
                doc[0].isoccupied=true;
                seatCollection.updateOne({_id:doc[0]._id},{$set:doc[0]},(err)=>{
                    if(err){
                        console.log("Error occured while updating seat status",err);
                    }
                    else{
                        console.log("Successfully updated seat status");
                        bookingOperation.bookSeat(bookinObj,res);
                    }
                })                
            }
        })
    }

}

module.exports=seatOperations;