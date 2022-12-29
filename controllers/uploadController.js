const Product=require("../models/product");
const path=require('path');
const fs=require('fs');
const cloudinary=require('cloudinary').v2

const {StatusCodes}= require('http-status-codes');

const uploadProductImageLocal= async(req,res)=>{
    console.log(req.files,'UTF-8');

    if(!req.files){
        return res.status(StatusCodes.NOT_FOUND).json({message:'file field is empty'});
    }
    
    let productImage=req.files.image;

    if(!productImage.mimetype.startsWith('image')){
        // return res.status(StatusCodes.NOT_FOUND).json({message:'image not found'})
        return res.send('fields not found')
    }

    const maxSize=1000;
    if(productImage.size>maxSize){
        return res.send('more than 1000KB  file not allowed');
    }
    const imagePath=path.join(__dirname,'../uploads/'+`${productImage.name}`);
   await productImage.mv(imagePath);

   return  res.status(StatusCodes.CREATED).json({image:{src:imagePath}});

}

const uploadProductImage= async(req,res)=>{
    try{
        console.log(req.files.image);
        const result= await cloudinary.uploader.upload(req.files.image.tempFilePath,{
            use_filename:true,
            folder:'file-upload'
        },(error,results)=>{
            console.log(results);
        });
        // fs.unlinksync is used for not save file in temp folder
        fs.unlinkSync(req.files.image.tempFilePath);
    
    return res.status(StatusCodes.OK).json({message:'uploded on cloudinary folder'})
    }catch(error){
        console.log(error.message);
    }
   
}




module.exports={uploadProductImage};
