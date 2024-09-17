import jwt from "jsonwebtoken";
import { JWT_EXPIRE_TIME, JWT_KEY } from "../config/config.js";

export const TokenEncode = (email, user_id) => {
  const PAYLOAD = { email: email, user_id: user_id };
  const token = jwt.sign(
    PAYLOAD, // Your data object
    JWT_KEY, // The secret key to sign the token
    { expiresIn: JWT_EXPIRE_TIME } // The token will expire in 5 minutes
  );

  return token;
};

export const TokenDecode =(token) => {

    try{
        return jwt.verify(token,JWT_KEY)
    }catch(err){
        return null
    }
};
