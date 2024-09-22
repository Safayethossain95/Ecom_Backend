import WishModel from './../model/wishesModel.js';
import mongoose from 'mongoose';

export const SaveWishListService=async(req)=>{
    try{
        const user_id = req.headers.user_id
    const reqBody = req.body;

    await WishModel.updateOne({productID:reqBody.productID,userID:user_id},{$set:reqBody},{upsert:true})
    return {status:"success", message:"Wishlist Saved Successfully"}
    }catch(err){
        return {status:"fail", message:err.toString()}
    }
}
export const RemoveWishListService=async(req)=>{
    try{
      
    const {productID} = req.body;

    await WishModel.deleteOne({productID:productID})
    return {status:"success", message:"Removed wishlist Successfully"}
    }catch(err){
        return {status:"fail", message:err.toString()}
    }
}
export const ReadWishListService=async(req)=>{
    try{
      
    const ObjectId = mongoose.Types.ObjectId;
    const user_id = new ObjectId(req.headers.user_id)

    const matchStage = {$match:{userID:user_id}}

    const joinStagewithProduct = {
        $lookup:{
            from:'products',
            localField:'productID',
            foreignField:'_id',
            as:'product'
        }
    }

    let data = await WishModel.aggregate([
        matchStage,
        joinStagewithProduct
        
    ])
    if(data.length == 0){
        return {status:"fail", message:"No Items found"}
    }
    return {status:"success", data:data}
    }catch(err){
        return {status:"fail", message:err.toString()}
    }
}