import express from 'express'
import { isAdmin, isAuth } from '../middleware/isauth.js';
import { addLectures, createCourse, deleteCourse, deleteLecture } from '../controllers/admin.js';
import { uploadFiles } from '../middleware/multer.js';

const router = express.Router();


router.post('/course/new'   ,isAuth , isAdmin ,uploadFiles, createCourse);
router.post("/course/:id" , isAuth , isAdmin ,uploadFiles ,addLectures)
router.delete("/course/:id" , isAuth , isAdmin , deleteCourse)
router.delete("/lecture/:id" , isAuth , isAdmin , deleteLecture)
export default router;