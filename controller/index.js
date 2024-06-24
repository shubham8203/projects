const shortid=require('shortid')
const URL=require('../models/url');

async function generateShortId(req,res){
       const body=req.body;
       if(!body.url){
        res.status(400).end("URL required");
        return;
       }
       const allurls=await URL.find({createdBy:req.user._id});
       const obj=await URL.findOne({redirectUrl:body.url});
       if(obj){
        res.render('home',{id:obj.shortId,urls:allurls,});
        return;
       }
      const data= await URL.create({ 
        shortId:shortid.generate(),
        redirectUrl:body.url,
        visitHistory:[],
        createdBy:req.user._id,
       })
      
         allurls.push(data);

     res.render('home',{
        id:data.shortId,
        urls:allurls,
     });

}
async function redirectToOriginalUrl(req,res){
    const id=req.params.id;
    await URL.findOneAndUpdate({shortId:id},{
        $push:{
            visitHistory:{timestamp:Date.now()},
        }
    })
    

    res.redirect(data.redirectUrl);
    
}
module.exports={
    generateShortId,
    redirectToOriginalUrl,
}