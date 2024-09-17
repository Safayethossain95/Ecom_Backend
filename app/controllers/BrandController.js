import BrandModel from './../model/brandsModel.js';
export const BrandList = async (req,res)=>{
    try{
        let data = await BrandModel.find({})
        return res.json({status:"success",data:data})
    }catch(e){
        return res.json({status:"fail"})
    }
}