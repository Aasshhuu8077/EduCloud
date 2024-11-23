import express from 'express'
import { loginUser, myprofile, register, Verifyuser } from '../controllers/user.js';
import { isAuth } from '../middleware/isauth.js';



const router = express.Router(); 
router.post("/user/login" , loginUser);
router.post("/user/register" , register)
router.post("/user/verify" , Verifyuser)
router.get("/user/me" , isAuth , myprofile);
























export default router;