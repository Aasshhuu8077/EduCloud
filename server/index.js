import express from 'express'
import dotenv from "dotenv"
import { connectDB } from './Database/db.js';
import { User } from './model/userschema.js';

dotenv.config();
const app = express();

const port = 8080;
app.use(express.json());

app.get("/" , (req,res)=>{
    res.send("Hello World");
})


// importing the routes
import userRoutes from './routes/user.js'



// using the routes
app.use('/api' , userRoutes);























app.listen(port ,()=>{
    console.log('server is running on port 8080')
    connectDB();
})