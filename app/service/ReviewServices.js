import ReviewModel from "../model/reviewsModel";

const ObjectId = mongoose.Types.ObjectId;

export const ReviewListService = async(req)=>{
    try{
        let productID = new ObjectId(req.params.productID)
        let matchedStage = {$match:{productID:productID}}

        let userStage = {$lookup:{from:"reviews",localField:"userID",foreignField:"_id",as:"user"}}

        let data = await ReviewModel.aggregate([
            matchedStage,
            // userStage,
            // {$unwind:"user"},

        ])
        return res.json({status:"success",message:"All reviews of the product.",data:data})
    }
    catch(err){
        return res.json({status:"fail",message:err.toString()})
    }
}