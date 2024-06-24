const express=require('express')
const URL=require('./models/url')
const Users=require('./models/user')
const path=require('path')
const connect=require('./connection')
const ejs=require('ejs')
const cookieparser=require('cookie-parser')

const urlrouter=require('./router/staticroute')
const UserRouter=require('./router/user')
const LoginRouter=require('./router/login')
const {checkForAuth,restrictTo} = require('./middlewares/auth')

const app=express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieparser());
app.use(checkForAuth);

app.set('view engine','ejs');
app.set("views",path.resolve('./views'));

const PORT=8001;
app.listen(PORT,()=>{
    console.log(`server started at port:${PORT}`);
})
connect("mongodb://127.0.0.1:27017/MyUrl").then(()=>{

    console.log("mongoDB connected Successfully")
})
.catch((error)=>{
console.log("error in connecting");
})

app.use('/admin',restrictTo(["admin"]),async (req,res,next)=>{
     const allUsers=await Users.find({});
     res.json(allUsers);
})
app.use('/url',restrictTo(["normal","admin"]),urlrouter)
app.use('/signup',UserRouter)
app.use('/login',LoginRouter)