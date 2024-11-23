import express from 'express'
import { register, Verifyuser } from '../controllers/user.js';



const router = express.Router(); 

router.post("/user/register" , register)
router.post("/user/verify" , Verifyuser)

























export default router;