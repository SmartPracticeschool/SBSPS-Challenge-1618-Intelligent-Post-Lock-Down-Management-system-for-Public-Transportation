const userCollection=require('../model/user');
var passwordHash=require('password-hash');

const userOperations={
    addUser(userObj,res){
        // var hash=passwordHash.generate(userObj.password);
        // userObj.password=hash;
        userCollection.create(userObj,(err)=>{
            if(err){
                console.log("error while adding a user",err);
                res.send("error while adding a user ");
            }
            else{
                res.send("User added successfully");
            }
        })
    }
}

module.exports=userOperations;