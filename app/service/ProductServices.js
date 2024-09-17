import mongoose from "mongoose";
import ProductModel from "../model/productsModel.js";
import ReviewModel from "../model/reviewsModel.js";
const ObjectId = mongoose.Types.ObjectId;

export const ListByCategoryService = async (req) => {
  try {
    let CategoryID = new ObjectId(req.params.CategoryID);
    let MatchStage = { $match: { categoryID: CategoryID } };
    let CateogryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let BrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      CateogryStage,
      BrandStage,
      { $unwind: "$category" },
      { $unwind: "$brand" },
      {
        $project: {
          _id: 0,
          "brand._id": 0,
          "category._id": 0,
          categoryID: 0,
          brandID: 0,
        },
      },
    ]);

    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", message: err.toString() };
  }
};
export const ListByBrandService = async (req) => {
  try {
    let BrandID = new ObjectId(req.params.BrandID);
    let MatchStage = { $match: { brandID: BrandID } };
    let CateogryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let BrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      CateogryStage,
      BrandStage,
      { $unwind: "$category" },
      { $unwind: "$brand" },
      {
        $project: {
          _id: 0,
          "brand._id": 0,
          "category._id": 0,
          categoryID: 0,
          brandID: 0,
        },
      },
    ]);

    return { status: "success", data: data,message:"brand" };
  } catch (err) {
    return { status: "fail", message: err.toString() };
  }
};
export const ListByRemarkService = async (req)=>{
    try{
        let Remark = req.params.Remark;
        let MatchStage = {$match:{ remark: Remark}}
        let CategoryStage = {$lookup:{ from:"categories", localField:"categoryID",foreignField:"_id",as:"category"}}
        let BrandStage = {$lookup:{ from:"brands", localField:"brandID",foreignField:"_id",as:"brand"}}

        let data = await ProductModel.aggregate([
            MatchStage,
            CategoryStage,
            BrandStage,
            {$unwind:"$category"},
            {$unwind:"$brand"},
            {
                $project:{
                    _id:0,
                    "brand._id":0,
                    "category._id":0,
                    categoryID:0,
                    brandID:0
                }
            }
        ])
        return {status:"success",data:data,message:"remark"}
    }
    catch(err){
        return {status:"fail",message:err.toString()}
    }
}
export const DetailsService = async (req) => {
    try {
      let ProductID = new ObjectId(req.params.ProductID);
      let MatchStage = { $match: { _id: ProductID } };
      let JoinWithBrandStage = {
        $lookup: {
          from: "brands",
          localField: "brandID",
          foreignField: "_id",
          as: "brand",
        },
      };
      let JoinWithCategoryStage = {
        $lookup: {
          from: "categories",
          localField: "categoryID",
          foreignField: "_id",
          as: "category",
        },
      };
      let JoinWithDetailsStage = {
        $lookup: {
          from: "productdetails",
          localField: "_id",
          foreignField: "productID",
          as: "details",
        },
      };
  
      let UnwindBrandStage = { $unwind: "$brand" };
      let UnwindCategoryStage = { $unwind: "$category" };
      let UnwindDetailsStage = { $unwind: "$details" };
  
      let ProjectionStage = {
        $project: {
          "brand._id": 0,
          "category._id": 0,
          categoryID: 0,
          brandID: 0,
        },
      };
  
      let data = await ProductModel.aggregate([
        MatchStage,
        JoinWithBrandStage,
        JoinWithCategoryStage,
        JoinWithDetailsStage,
        UnwindBrandStage,
        UnwindCategoryStage,
        UnwindDetailsStage,
        ProjectionStage,
      ]);
  
      return { status: "success", data: data };
    } catch (error) {
      return { status: "fail", data: error.toString() };
    }
  };
export const ProductReviewListService = async (req) => {
    try {
      let ProductID = new ObjectId(req.params.ProductID);
      let MatchStage = { $match: { productID: ProductID } };
      let JoinWithProfileStage = {$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}}

      let UnwindProfileStage = {$unwind:"$profile"}
  
  
      let ProjectionStage = {
        $project: {
          "des":1,
          "rating":1,
          "profile.cus_name":1,
          "_id":0
        },
      };
  
      let data = await ReviewModel.aggregate([
        MatchStage,
        JoinWithProfileStage,
        UnwindProfileStage,
        ProjectionStage,
      ]);
  
      return { status: "success", data: data };
    } catch (error) {
      return { status: "fail", data: error.toString() };
    }
  };
  export const ListByKeywordService = async (req) => {
    try {
      let Keyword = req.params.Keyword;
      let searchregex = {"$regex":Keyword, "$options":"i"}

      let SearchParams = [{title:searchregex},{shortDes:searchregex}]
      
      let SearchQuery = { $or: SearchParams };
      let MatchingStage = {$match:SearchQuery}
      let CateogryStage = {
        $lookup: {
          from: "categories",
          localField: "categoryID",
          foreignField: "_id",
          as: "category",
        },
      };
      let BrandStage = {
        $lookup: {
          from: "brands",
          localField: "brandID",
          foreignField: "_id",
          as: "brand",
        },
      };
  
      let data = await ProductModel.aggregate([
        MatchingStage,
        CateogryStage,
        BrandStage,
        { $unwind: "$category" },
        { $unwind: "$brand" },
        {
          $project: {
            _id: 0,
            "brand._id": 0,
            "category._id": 0,
            categoryID: 0,
            brandID: 0,
          },
        },
      ]);
  
      return { status: "success", data: data,message:"brand" };
    } catch (err) {
      return { status: "fail", message: err.toString() };
    }
  };