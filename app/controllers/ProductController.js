import ProductModel from "../model/productsModel.js"
import ProductSliderModel from "../model/slidersModel.js"
import { ListByBrandService, DetailsService, ListByRemarkService, ListByCategoryService, ProductReviewListService, ListByKeywordService } from "../service/ProductServices.js"

export const ProductListByCategory = async (req,res) => {
    let result = await ListByCategoryService(req)
    return res.json(result)
}

export const ProductListByRemark = async (req,res) => {
    let result = await ListByRemarkService(req)
    return res.json(result)
}
export const ProductListByBrand=async (req,res)=>{
    let result = await ListByBrandService(req)
    return res.json(result)
}

export const ProductListBySlider=async (req,res)=>{
    try {
        let data = await ProductSliderModel.find({});
        return { status: "success", data: data };
      } catch (error) {
        return { status: "fail", data: error.toString() };
      }
}

export const ProductDetailsID=async (req,res)=>{
    let result = await DetailsService(req)
    return res.json(result)
}

export const ProductListByKeyword=async (req,res)=>{
    let result = await ListByKeywordService(req)
    return res.json(result)
}


export const ProductReviewListByID=async (req,res)=>{
    let result = await ProductReviewListService(req)
    return res.json(result)
}

export const CreateProductReview=async (req,res)=>{
    try {
        return res.json({status:"success"});
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}
export const GetProducts=async (req,res)=>{
    try {
        const products = await ProductModel.find({})
        return res.json({status:"success",data:products});
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}