// var fs = require('fs');
// const csv = require('fast-csv');
// var list = [];
// let myData ;
// var read = fs.createReadStream('./data/elpcsv.csv')
// .pipe(csv.parse())
// .on('data',function(data){  // this function executes once the data has been retrieved
//     console.log(data);  // see, data is already an array
//     list = data; // so you might not need to do this

//     for(let i = 0; i < list.length; i++){
//        console.log(list[i]);
//     }
// })
// .on('end', function(data){
//     console.log('Read finished');
// })

// console.log("test");


var fs = require('fs'); 
const csv = require('fast-csv');
const file = fs.createWriteStream('./big.file');

var csvData=[];
fs.createReadStream('./data/elpcsv.csv')
.pipe(csv.parse())
    .on('data', function(csvrow) {
     //   console.log(csvrow);
        //do something with csvrow
        csvData.push(csvrow);        
    })
    .on('end',function() {
      //do something wiht csvData
    
      var records = csvData;
      var data=[];
      let constarr= {
             
        "name": "ELP",
        "parent":"null",
        "children": [
         {
          "name": "Entitlement",
          "parent":"ELP",
          "children": [
           {
               "name": "Vendor",
               "parent":"Entitlement",
              "children": []}]}]}

      var output = records.map( record => {
	   // console.log(record)
        let arr = record.toString().split(',')
       // console.log(arr)
      
      let newarr=
        {
             
         
                  
                  "name": arr[0],
                  "parent":"Vendor",
                  "children": [
                 {"name": arr[1],
                  "parent":arr[0],
                    "children": [ {"name":"Metric", "size":arr[2]},
                                  {"name":"TotalLicenceQuantity", "size":arr[3]},
                                  {"name":"Unlimited", "size":arr[4]},
                                  {"name":"Allocatedquantity", "size": arr[5]},
                                  {"name": "Unallocated Quantity", "size":arr[6]},
                                  {"name": "Covered Consumption", "size": arr[7]},
                                  {"name": "Downgrades", "size": arr[8]},
                                  {"name": "Currency", "size": arr[9]},
                                  {"name": "Unit Price", "size": arr[10]},
                                  {"name": "Unused Licence Value", "size": arr[11]},
                                  {"name": "Shortfall", "size": arr[12]},
                                  {"name": "Risk", "size": arr[13]}
                                 ]}
                 
                ]
                 
                 
                 
                 
                
            
            
        }
      //  console.log(JSON.stringify(newarr).replace(/'/g,''))

    //  constarr.children[0].children.push(newobject)

        
      
        
        return newarr;
        
    })
    console.log(output)
    output.map((arr)=>{
        constarr.children[0].children[0].children.push(arr)
         
     })
   
    
        
   
    // output.map((arr)=>{
    //     file.write('[' + arr +']')
    // })
    
    console.log(JSON.stringify(constarr))
    file.write('[' + JSON.stringify(constarr) +']')
    });
 
   
