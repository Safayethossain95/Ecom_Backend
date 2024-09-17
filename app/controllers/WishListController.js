export const CreateWish = async (req, res, next) =>{
    try{
        return res.json({status:"success","Message":""})
    }catch(e){
        return res.json({status:"fail",message:e.toString()})
    }
}
export const ReadWishList = async (req, res, next) =>{
    try{
        return res.json({status:"success","Message":""})
    }catch(e){
        return res.json({status:"fail",message:e.toString()})
    }
}
export const RemoveWish = async (req, res, next) =>{
    try{
        return res.json({status:"success","Message":""})
    }catch(e){
        return res.json({status:"fail",message:e.toString()})
    }
}