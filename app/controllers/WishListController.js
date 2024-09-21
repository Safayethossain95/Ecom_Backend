import { ReadWishListService, RemoveWishListService, SaveWishListService } from "../service/WishListServices.js"

export const CreateWish = async (req, res, next) =>{
    let result = await SaveWishListService(req)
    return res.json(result)
}
export const UpdateWishList = async (req, res, next) =>{
    let result = await SaveWishListService(req)
    return res.json(result)
}
export const ReadWishList = async (req, res, next) =>{
    let result = await ReadWishListService(req)
    return res.json(result)
}
export const RemoveWish = async (req, res, next) =>{
    let result = await RemoveWishListService(req)
    return res.json(result)
}