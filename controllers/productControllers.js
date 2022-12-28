const Product=require("../models/product");
const {StatusCodes}= require('http-status-codes');

const createProduct= async(req,res)=>{
    try{
        const product= await Product.create({...req.body});

    res.status(StatusCodes.CREATED).json({product});
    }catch(error){
        console.log(error);
    }

    

}

const getAllProduct= async(req,res)=>{
    res.send('get-product');

}



module.exports={createProduct,getAllProduct};
