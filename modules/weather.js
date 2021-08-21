"use strict"
const axios = require('axios')
let weathercache={}

let weatherhandle = async (req, res) => {
    let lon = req.query.lon;
    let lat = req.query.lat;
    let searchQuery = req.query.searchQuery;

    let array = [];

    if(undefined!==weathercache[searchQuery]){
        res.send(weathercache[searchQuery])
        console.log('miss cache, data is already in cache');
    }
    else{

    let weatherLink = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${searchQuery}&lat=${lat}&lon=${lon}`;
    let weatherData = await axios.get(weatherLink);
    // console.log(weatherData);
    // console.log('weather link',weatherLink);

    weatherData.data.data.forEach((value) => {
        let desVariable = `low of ${value.low_temp} high of ${value.max_temp} with ${value.weather.description}`
        let objectVariable = new Forcast(value.datetime, desVariable)
        array.push(objectVariable)
    })
    // console.log(array);
    weathercache[searchQuery]=array;
    console.log('hit cache, data called and saved');

    res.send(array);
}}

class Forcast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }

}
module.exports = weatherhandle;
