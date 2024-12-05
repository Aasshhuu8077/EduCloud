import express from 'express'
import { fetchlecture, fetchLectures, getAllCourses, getSingleCourse } from '../controllers/course.js';
import { isAuth } from '../middleware/isauth.js';

const router = express.Router();


router.get("/course/all" , getAllCourses)
router.get("/course/:id" , getSingleCourse)
router.get("/lectures/:id" , isAuth , fetchLectures)
router.get("/lecture/:id" , isAuth , fetchlecture)


export default router;