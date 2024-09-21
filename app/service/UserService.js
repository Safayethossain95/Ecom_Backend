import Users from "../model/UsersModel.js";
import SendEmail from "../utility/emailUtility.js";
import ProfileModel from './../model/profilesModel.js';

export const UserOTPService = async (req) => {
    try {
        let email=req.params.email;
        let code=Math.floor(100000+Math.random()*900000);

        let EmailText=`Your Verification Code is= ${code}`
        let EmailSubject='Email Verification'

        await SendEmail(email,EmailText,EmailSubject);

        await Users.updateOne({email:email},{$set:{otp:code}},{upsert:true})

        return {status:"success", message:"6 Digit OTP has been send"}
    }catch (e) {
        return {status:"fail", message:e.toString()}
    }
}

export const RegisterUserService=async(req)=>{
    try{
        let user=new Users(req.body);
        await user.save();
        return {status:"success", message:"User Registration Successful"}
    }catch(err){
        return {status:"fail", message:err.toString()}
    }
}

export const ResetPasswordService=async(req)=>{
    try{
        let reqBody = req.body;

    let data = await Users.findOne({email:reqBody['email']})

    if(data==null){
        return {status:"fail",message:"User not found"}
    }else{
        await Users.updateOne({email:reqBody['email']},{otp:"0",password:reqBody['password']})
        return {status:"success",message:"Password reset successfully"}
    }
    }
    catch(err){
        return {status:"fail",message:err.toString()}
    }
}

export const CodeVerifyService=async(req)=>{
    try{
        let reqBody = req.body;
        let data = await Users.findOne({email:reqBody['email'],otp:reqBody['otp']})
        if(data==null){
            return {status:"fail",message:"Wrong Verification Code"}
        }else{
            return {status:"success",message:"Verification Successful"}
        }
    }catch (e){
        return {status:"fail",message:e.toString()}
    }
}

export const ProfileService=async(req)=>{
    try{
        const user_id = req.headers.user_id
    const reqBody = req.body;

    await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})
    return {status:"success", message:"Profile Updated Successfully"}
    }catch(err){
        return {status:"fail", message:err.toString()}
    }
}
export const ReadProfileService=async(req)=>{
    try{
        let user_id = req.headers.user_id;
        let data = await ProfileModel.find({userID:user_id})
        return {status:"success",data:data}
        
    }
    catch(err){
        return {status:"fail", message:err.toString()}
    }
}