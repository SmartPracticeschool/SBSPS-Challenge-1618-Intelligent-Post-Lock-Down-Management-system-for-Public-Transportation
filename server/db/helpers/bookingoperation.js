const bookingCollection=require('../model/booking');

const bookingOperations={
    bookSeat(bookingObj,res){
        bookingCollection.create(bookingObj,(err)=>{
            if(err){
                console.log("Error while booking a seat");
            }
            else{
                console.log("Seat booked successfully");
                res.send(bookingObj);
            }
        })
    }
}
module.exports=bookingOperations