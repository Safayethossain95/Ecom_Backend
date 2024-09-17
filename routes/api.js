import express from "express";
const router = express.Router();


import * as UsersController from "../app/controllers/UsersController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";
import * as CartListController from "../app/controllers/CartListController.js";
import * as WishListController from "../app/controllers/WishListController.js";
import * as ProductController from "../app/controllers/ProductController.js";
import * as CategoryController from "../app/controllers/CategoryController.js";
import * as BrandController from "../app/controllers/BrandController.js";
import * as InvoiceController from "../app/controllers/InvoiceController.js";

// Users
router.post("/Registration", UsersController.Registration)
router.post("/Login",UsersController.Login)
router.get("/ProfileDetails", AuthMiddleware,UsersController.ProfileDetails)
router.post("/ProfileUpdate", AuthMiddleware,UsersController.ProfileUpdate)
router.get("/EmailVerify/:email", UsersController.EmailVerify)
router.post("/CodeVerify", UsersController.CodeVerify)
router.post("/ResetPassword", AuthMiddleware,UsersController.ResetPassword)


// Categories
router.get("/CategoryList", CategoryController.CategoryList)


// Reviews
router.post("/CreateProductReview",ProductController.CreateProductReview)


//Cart 
router.post("/CreateCart",CartListController.CreateCart)
router.get("/ReadCartList",CartListController.ReadCartList)
router.post("/UpdateCart",CartListController.UpdateCart)
router.post("/RemoveCart",CartListController.RemoveCart)

// Wish

router.post("/CreateWish", WishListController.CreateWish)
router.post("/ReadWishList", WishListController.ReadWishList)
router.post("/RemoveWish", WishListController.RemoveWish)

// Product

router.get("/GetProducts", ProductController.GetProducts)
router.get("/ProductListBySlider",ProductController.ProductListBySlider)
router.get("/ProductListByCategory/:CategoryID",ProductController.ProductListByCategory)
router.get("/ProductListByRemark/:Remark",ProductController.ProductListByRemark)
router.get("/ProductListByBrand/:BrandID",ProductController.ProductListByBrand)
router.get("/ProductDetailsID/:ProductID",ProductController.ProductDetailsID)
router.get("/ProductListByKeyword/:Keyword",ProductController.ProductListByKeyword)
router.get("/ProductReviewList/:ProductID",ProductController.ProductReviewListByID)

// Brands

router.get("/BrandList",BrandController.BrandList)

//Invoice

router.post("/CreateInvoice",InvoiceController.CreateInvoice)
router.get("/ReadInvoiceList",InvoiceController.ReadInvoiceList)
router.get("/ReadInvoiceDetails",InvoiceController.ReadInvoiceDetails)



export default router;


