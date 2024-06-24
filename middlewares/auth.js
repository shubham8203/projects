const {getUser}=require('../services/auth')

function checkForAuth(req,res,next){
       

      const token=req.cookies.token;
      if(!token){
        return next();
      }
      const user=getUser(token);
     
      req.user=user;
      return next();
}

function restrictTo(roles=[]){
    return (req,res,next)=>{
        if(!(req.user)){
            return res.redirect('/login');
        }
        const role=req.user.role;
        if(roles.includes(role)){
            return next();
        }
        return res.end("You are unauthorised to access the Page");

    }
}

module.exports={
    checkForAuth,
    restrictTo
}


