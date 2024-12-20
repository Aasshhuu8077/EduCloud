import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../model/courses.js";
import { loginUser } from "./user.js";
import { Lecture } from "../model/LectureSchema.js";
import {rm} from "fs";
import { promisify } from "util";
import fs from "fs"
import { User } from "../model/userschema.js";
export const createCourse = TryCatch(async(req,res)=>{
    const {title ,description , category , createdBy , duration , price } = req.body;
    console.log(title ,description , category , createdBy , duration , price)
    const image = req.file;
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


export const addLectures = TryCatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id);
    if(!course){
        return res.status(404).json({
            message:"No Course found"
        });

    }
     const {title , description } = req.body;
     const file = req.file;

     const lecture =  await Lecture.create({
        title ,
        description ,
        video:file.path,
        course:course._id
     });

     res.status(201).json({
        message:"Lecture Added Successfully"
     })
})


export const deleteLecture = TryCatch(async(req,res)=>{
    const lecture = await Lecture.findById(req.params.id);
    rm(lecture.video , ()=>{
        console.log("Video deleted")
    });

    await lecture.deleteOne();
    res.json({message:"Lecture Deleted Successfully"})
})

const unlikeAsync = promisify(fs.unlink);

export const deleteCourse = TryCatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id);
    const lectures = await Lecture.find({course:course._id});
    await Promise.all(
        lectures.map(async(lecture)=>{
        await unlikeAsync(lecture.video);
        console.log("Video Deleted")

        })
    )
    rm(course.image , ()=>{
        console.log("Image deleted")
    });

    await Lecture.find({course:req.params.id}).deleteMany();
    await course.deleteOne();
   
     await User.updateMany({} , {$pull : {subscription:req.params.id}});
     res.json({message:"Course Deleted Successfully"})

})