import express from 'express'
import dotenv from "dotenv"
import { connectDB } from './Database/db.js';
import { User } from './model/userschema.js';


const app = express();
app.use(express.json());
dotenv.config();
const port = 8120;
app.use(express.json());

app.get("/" , (req,res)=>{
    res.send("Hello World");
})

app.use("/uploads",express.static("uploads"))

// importing the routes
import userRoutes from './routes/user.js'
import courseRoutes from './routes/course.js'
import adminRoutes from './routes/admin.js'


// using the routes
app.use('/api' , userRoutes);
app.use('/api' , courseRoutes);
app.use('/api' , adminRoutes);























app.listen(port ,()=>{
    console.log('server is running on port 8080')
    connectDB();
})