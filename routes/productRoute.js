const express=require('express');
const router= express.Router();
const {createProduct,getAllProduct}=require('../controllers/productControllers');
const {uploadProductImage}=require('../controllers/uploadController');


router.route('/').post(createProduct).get(getAllProduct);

router.route('/uploads').post(uploadProductImage);







module.exports=router;