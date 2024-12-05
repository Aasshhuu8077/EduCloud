import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../model/courses.js";
import { Lecture } from "../model/LectureSchema.js";
import { User } from "../model/userschema.js";

export const getAllCourses = TryCatch(async(req,res)=>{
    const courses = await Courses.find();
    res.json({
        courses,
    });
});

export const getSingleCourse  = TryCatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id)
     res.json({
        course
     })
})

export const fetchLectures = TryCatch(async(req,res)=>{
    const lectures = await Lecture.find({course:req.params.id});

    const user = await User.findById(req.user._id);

    if(user.role == "admin"){
        return res.json({lectures})
    }
   
    if(!user.subscription.includes(req.params.id)){
        return res.status(400).json({
            message:"You have not Subscribed to this course"
        })
    }
    res.json({lectures})
})

export const fetchlecture = TryCatch(async(req,res)=>{
    const lecture = await Lecture.findById(req.params.id);

    const user = await User.findById(req.user._id);

    if(user.role == "admin"){
        return res.json({lecture})
    }
   
    if(!user.subscription.includes(req.params.id)){
        return res.status(400).json({
            message:"You have not Subscribed to this course"
        })
    }
    res.json({lecture})
})