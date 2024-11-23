import { User } from "../model/userschema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken" 
import sendMail from "../middleware/mail.js";

export const register = async(req,res)=>{
    try{
   const {email,name,password}=req.body;
   let user = await User.findOne({email});

   if(user){
    return res.status(400).json({message:"User already exists"});
   }
   const hashpass = await bcrypt.hash(password , 10);
   user={
    name,
    email,
    password:hashpass
   }
   const otp = Math.floor(Math.random()*1000000);
   
   const token = jwt.sign({
    user,
    otp,
   } ,process.env.Activating_key ,
{
    expiresIn: "5m" ,
}
   );
    const data = {
        name,
        otp,
    }
    await sendMail(
        email,
        "EduCloud",
        data
    )
    res.status(200).json({
        message:"OTP send Successfully",
        token
    })
}
   
    catch(err){
        res.status(500).json({
            message:err.message,
        });
    }
}