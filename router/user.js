const express=require('express')
const {userSignUp,createUser}=require('../controller/user')
const router=express.Router();

router.get('/',userSignUp);
router.post('/',createUser);


module.exports=router;

