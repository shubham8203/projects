const jwt=require('jsonwebtoken');
const secret="Shubham820327@"
function setUser(user){
      
    return jwt.sign({
        "role":user.role,
        "email":user.email,
         "id":user._id,
    },secret);
  
}

function getUser(token){
     try{
        return jwt.verify(token,secret);
     }
     catch(error){
return null;
     }
}

module.exports={
    setUser,
    getUser
}