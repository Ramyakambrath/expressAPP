const express=require('express');
const dataapp=express();
dataapp.get('/',(req,res)=>{

    console.log(req.query); 
    console.log(req.accepts(['html']));   
    res.sendFile(__dirname +'/form.html');

})

dataapp.listen(3000,()=>console.log('Express server started at port 3000'));