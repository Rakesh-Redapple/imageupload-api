const express= require("express");
const mongoose=require("mongoose");
const app=express();
const dotenv=require("dotenv");
const fileupload=require('express-fileupload');
const productRouter=require('./routes/productRoute');
dotenv.config({path:"./.env"});
const cloudinary=require('cloudinary');
let port=process.env.PORT;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET

})
console.log(process.env.CLOUD_API_KEY);

app.use(express.json());
app.use(fileupload({useTempFiles:true}));
//app.use(express.urlencoded({extended:false}));

app.use("/api/v1",productRouter);


mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI,()=>{
    console.log("DB Connected!!!");
});
// app.use(errorHandlerMiddleware);
app.all("*",(req,res,next)=>{
    res.status(404).json({status:"fail",message:`page not found ${req.originalUrl}`});
})
//dadsdsf
app.listen(port,()=>{
    console.log(`Server is up on port:${port}`);
})


