const {v4:uuidv4}=require('uuid')
const {setUser,getUser}= require('../services/auth')
const User=require('../models/user')
function userLogin(req,res,next){
    
    res.render('login');
     
}
async function handleLogin(req,res,next){

        const {email,password}=req.body;
         const user=await User.findOne({email,password});
        
         if(!user){
           res.redirect('/signup')
           return;
         }
         
         const token=setUser(user);

          res.cookie("token",token);
        res.redirect('/url');
}

module.exports={
    userLogin,
    handleLogin,
}