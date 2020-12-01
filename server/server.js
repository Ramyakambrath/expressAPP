const express=require('express');
const app=express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

require('./routes')(app)

app.get('/',(req,res)=>{
 res.send('PORT 4000')
})
app.listen(4000,()=>{
    console.log('Listening to port 4000')
})