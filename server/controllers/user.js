import { User } from "../model/userschema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken" 
import sendMail from "../middleware/mail.js";
import TryCatch from "../middleware/TryCatch.js";

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

// verifying the user

export const Verifyuser = TryCatch(async(req,res)=>{
   const {otp , token} = req.body;
   
   const verify =jwt.verify(token , process.env.Activating_key);

   if(!verify) 
    return res.status(400).json({
message:"OPT Expired"
})
 
  if(verify.otp !== otp)
    return res.status(400).json({
message:"Invalid OTP",
    })

    await User.create({
        name:verify.user.name,
        email:verify.user.email,
        password:verify.user.password
    })

    res.json({
        message:"Registered Successfully",
    })

})