const express=require('express');
const app=express();

const sayHello=(req,res,next)=>{
    console.log('I must be called');
      next();
}
app.get('/:name/:age',sayHello,(req,res)=>{

    //  /You can change any HTTP header value using Response.set():
res.set('Content-Type','text/html')
// res.type('text');// => 'text/html'
// res.type('html');// => 'text/html'

// res.type('application/json')
// // => 'application/json'
// res.type('png')
// // => image/png:

 //   res.json({success:true}).status(200)
 res.status(404).send('Notfound');

 //Use the Request.header() method to access one individual request header value:
 console.log(req.header('cache-control'))


    
 //You can access all the HTTP headers using the Request.headers property:
 console.log(req.headers);
})
app.listen(4000,()=>{
    console.log('Listening to port 4000')
})