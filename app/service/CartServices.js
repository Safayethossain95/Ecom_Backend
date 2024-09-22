import mongoose from "mongoose";
import CartModel from "./../model/cartsModel.js";
export const CreateCartService = async (req) => {
  try {
    let ObjectID = mongoose.Types.ObjectId;
    const user_id = new ObjectID(req.headers.user_id);

    const { productID, color, qty, size } = req.body;
    let postJson = {
      userID: user_id,
      productID,
      color,
      qty,
      size,
    };

    await CartModel.create(postJson);
    return { status: "success", message: "Cart Saved Successfully" };
  } catch (err) {
    return { status: "fail", message: err.toString() };
  }
};
export const UpdateCartService = async (req) => {
  try {
    const { id,color,
      qty,
      size } = req.body;
      let postJson = {
        color,
        qty,
        size,
      };

    await CartModel.updateOne({ _id: id,userID: req.headers.user_id},{$set:postJson});
    return { status: "success", message: "Updated Cart Item Successfully" };
  } catch (err) {
    return { status: "fail", message: err.toString() };
  }
};
export const ReadCartService = async (req) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const user_id =new ObjectId(req.headers.user_id);
    console.log(user_id.toString());
    const matchStage = { $match: { userID: user_id } };

    const joinStagewithProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };

    let data = await CartModel.aggregate([matchStage, joinStagewithProduct]);
   
    if (data.length == 0) {
      return { status: "fail", message: "No Items found" };
    }
    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", message: err.toString() };
  }
};

export const RemoveCartService = async (req) => {
  try {
    const { id } = req.body;
     

    await CartModel.deleteOne({ _id: id,userID: req.headers.user_id});
    return { status: "success", message: "Removed Cart Item Successfully" };
  } catch (err) {
    return { status: "fail", message: err.toString() };
  }
};