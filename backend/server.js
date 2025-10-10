import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import {connectDB} from './config/db.js'
import userRoute from '../backend/router/userRoute.js'
import { adminRout } from './router/adminRoute.js';

dotenv.config()

const app=express();

app.use(express.json());

app.use(cors());

app.use('/',userRoute)

app.use('/admin',adminRout)




app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


app.get('/',(req,res)=>{
    res.send('this is backend server')
})

connectDB();

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`server running on port http://localhost:${PORT}`);
});
