const userCollection=require('../model/user');
const busOperation=require('../helpers/busoperation');
var passwordHash=require('password-hash');

const userOperations={
    addUser(userObj,res){
        var hash=passwordHash.generate(userObj.password);
        userObj.password=hash;
        userCollection.create(userObj,(err)=>{
            if(err){
                console.log("error while adding a user",err);
                res.json({"msg":"error while adding a user "});
            }
            else{
                res.send({"msg" : "Registered Successfully"});
            }
        })
    },

    loginUser(loginObj,res){
        userCollection.findOne({'email':loginObj.email},(err,doc)=>{
            if(err){
                console.log("Error occured during searching in db");
                res.json({"msg" : "Error occured during searching in db"})
            }
            else if(doc){
                var result=passwordHash.verify(loginObj.password,doc.password);
                if(result){
                    res.json({"loginObj":doc , "isLoggedIn" : true});
                }
                else{
                    console.log("Invalid userid or password in user schema");
                    res.json({"msg":"Invalid userid or password"});   
                }
            }
            else{
                console.log("User not present in user schema");
                busOperation.loginBus(loginObj,res);
            }
        })
    }
}

module.exports=userOperations;