import mongoose from 'mongoose';


const userschema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
    email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true,
    unique:true
   },
   role :{
    type:String,
    default:"user"
   },
   subscription:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"courses"
   }],
}, {
    timestamp:true,
});


export const User = mongoose.model("User" , userschema)