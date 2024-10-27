const express=require('express');
const app=express();
app.get('/',(req,res)=>res.json({message:'Hey Everyone from AWS Server '}));
app.listen(process.env.PORT || 8003,()=>console.log('Server Started'));
