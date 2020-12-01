const axios=require('axios');

module.exports=(app)=>{
let zipcode;

app.post('/search-location',(req,res)=>{

    console.log('req1',req.body.zipcode)
  zipcode=req.body.zipcode;

  if(!zipcode || zipcode.length < 5 || zipcode.length > 5){
    var redir = { redirect: "/error" };
    return res.json(redir);
    //  res.redirect('/error')
  } else{
   
    var redir = { redirect: "/current-weather" };
    return res.json(redir)
    ;     
   //   res.redirect('/current-weather')
  }

})

app.get('/search-location-weather',(req,res)=>{

    const baseUrl='http://api.openweathermap.org/data/2.5/weather?zip=';	
    const apiId = '&appid=5133103833178415fb79f72e25e41e1e&units=imperial';

    const userLocation=(url1,url2,zipcode)=>{
        let newurl=url1 + zipcode + url2;
        return newurl;
    };

    const apiUrl = userLocation(baseUrl, apiId, zipcode);

    axios.get(apiUrl)
   // .then(res=>res.json())
    .then(data =>{
        console.log('weatherwww',{data:data.data})
        res.send({data:data.data})
    })
    .catch(err=>{
        res.redirect('/error')
    })
})

app.get('/search-location-weather/5dayforecast',(req,res)=>{

  const baseUrl='http://api.openweathermap.org/data/2.5/forecast?zip=';	
  const apiId = '&appid=5133103833178415fb79f72e25e41e1e&units=imperial';

  const userLocation=(url1,url2,zipcode)=>{
      let newurl=url1 + zipcode + url2;
      return newurl;
  };

  const apiUrl = userLocation(baseUrl, apiId, zipcode);

  axios.get(apiUrl)
 // .then(res=>res.json())
  .then(data =>{
      console.log('weatherwww',{data:data.data})
      res.send({data:data.data})
  })
  .catch(err=>{
      res.redirect('/error')
  })
})


}