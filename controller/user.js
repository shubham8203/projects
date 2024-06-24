const {v4:uuidv4} = require('uuid');
const User=require('../models/user');
const { setUser } = require('../services/auth.js');
function userSignUp(req,res){
      
    res.render('signup')
}
async function createUser(req,res,next){
        const {name,email,password}=req.body;
       
        const user= await User.create({
               name,
               email,
               password
        }).catch((error)=>{
            
            res.render('login',{error:"user with same Email is already registered"});
           
        })

        if(user){
            
            const token=setUser(user);
            res.cookie("uid",token);
            res.redirect("/url");

        }
         
}

module.exports={
    userSignUp,
    createUser,
}