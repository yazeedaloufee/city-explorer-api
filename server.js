  
'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors')

const citiesData = require('./data/weather.json')

const server = express();
const PORT1 = process.env.PORT;
// const PORT =3001;



console.log(process.env.PORT);
server.use(cors());

server.get('/',(req,res)=>{
    res.send('home route')
})

server.get('/weather',(req,res)=>{
    let lon = req.query.lon;
    let lat = req.query.lat;
    let searchQuery = req.query.searchQuery;
    let cityInfo
    let index=null;
let array=[];

     cityInfo=citiesData.find((city,idx)=>{
        if(city.city_name===searchQuery){
            index=idx;

            return city;
        }
    })
    console.log(index);
    //i will important code here 
    
       
       citiesData[index].data.forEach((value)=>{
            
            
            let desVariable=`low of ${value.low_temp} high of ${value.max_temp} with ${value.weather.description}`
            let objectVariable=new Forcast(value.datetime,desVariable)
            array.push(objectVariable)})
            console.log(array);

//i will important code here 

 
    
    // console.log(array);
    if(cityInfo==undefined){res.send('error finding a city')}

    
//    catch(undefind){res.send('error finding a city')}

 res.send(array)
})



server.listen(PORT1,()=>{
    console.log(`Listning on PORT ${PORT1}`)
})

class Forcast{
    constructor(date,description){
        this.date=date;
        this.description=description;
    }

}

// let cc=new Forcast('date','plane text');
// cc.description=`city description`
// console.log(cc);
