import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    otp: { type: String, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Users = mongoose.model("users", UserSchema);

export default Users;
