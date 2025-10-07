import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectdb from './config/db'


dotenv.config()

const app=express();

app.use(express.json());

app.use(cors());

app.get('/',(req,res)=>{
    res.send('this is backend server')
})


const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`server running on port http://localhost:${PORT}`);
});
