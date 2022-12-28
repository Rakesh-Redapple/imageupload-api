const Product=require("../models/product");
const path=require('path');

const {StatusCodes}= require('http-status-codes');

const uploadProductImage= async(req,res)=>{
    console.log(req.files.image.name);
    let productImage=req.files.image;
    const imagePath=path.join(__dirname,'../uploads/'+`${productImage.name}`);
   await productImage.mv(imagePath);

   return  res.status(StatusCodes.CREATED).json({productImage});

}




module.exports={uploadProductImage};
