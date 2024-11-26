import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../model/courses.js";

export const createCourse = TryCatch(async(req,res)=>{
    const {title ,description , category , createdBy , duration , price } = req.body;

    const image = req.files;

   await Courses.create({
    title,
    description,
    category,
    createdBy,
    image:image.path,
    duration,
    price
   })
  
   res.status(201).json({
    message:"Course Created Successfully"
   })

})