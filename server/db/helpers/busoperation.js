const busCollection=require('../model/bus');
const seatCollection=require('../model/seat');
var passwordHash=require("password-hash");
const seatOperations=require("./seatoperation");

const busOperation={
    add(busObj,res){
        var hash=passwordHash.generate(busObj.password);
        busObj.password=hash;
        busCollection.create(busObj,(err)=>{
            if(err){
                //res.send("Error while adding bus driver");
                console.log("Error while adding the bus driver",err);
            }
            else{
                console.log("The bus driver has been registered successfully");
                //res.send("Record Added....");
            }
        })
        for(let i=0;i<busObj.totalSeats;i++){
            // console.log("Number of iteration ",i);
            var seatObj={};
            seatObj.price=busObj.price;
            seatObj.busId=busObj.vehicleRegistrationNumber;
            seatOperations.addSeat(seatObj);
        }
        res.send("Registered and seat added successfully");
    }
}

module.exports=busOperation;