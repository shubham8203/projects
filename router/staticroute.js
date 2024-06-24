const express=require('express')
const {generateShortId,redirectToOriginalUrl}=require('../controller/index')
const router=express.Router();
const URL=require('../models/url')

router.get('/',async (req,res,next)=>{
    const allUrls=await URL.find({createdBy:req.user._id}) ;
   res.render('home',{urls:allUrls});
})
router.post('/',generateShortId);
router.get('/:id',redirectToOriginalUrl);

module.exports=router;
