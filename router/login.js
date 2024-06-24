const express=require('express')
const {userLogin,handleLogin}=require('../controller/login')
const router=express.Router();

router.get('/',userLogin);
router.post('/',handleLogin);

module.exports=router;
