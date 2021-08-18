
'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors')
const axios = require('axios')


// const citiesData = require('./data/weather.json')

const server = express();
const PORT1 = process.env.PORT;
// const PORT =3001;



console.log(process.env.PORT);
server.use(cors());

server.get('/', (req, res) => {
    res.send('home route')
})
// taking weather data from weather api
server.get('/weather', async (req, res) => {
    let lon = req.query.lon;
    let lat = req.query.lat;
    let searchQuery = req.query.searchQuery;
    let index = null;
    let array = [];

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
    res.send(array);
})



//getting data from movie api
server.get('/movie', async (req, res) => {
    let moviesInfo = [];
    let query = req.query.query;
    let movieLink = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;
    let movieData = await axios.get(movieLink)
    // console.log('movielink',movieLink);
    // console.log('moviedata',movieData.data);
    movieData.data.results.forEach((value) => {

        let title = value.title;
        let overview = value.overview;
        let average_votes = value.vote_average;
        let total_votes = value.vote_count;
        let image_url = `https://image.tmdb.org/t/p/w500/${value.poster_path}`;
        let popularity = value.popularity;
        let released_on = value.release_date;
        moviesInfo.push(new Movie(title, overview, average_votes, total_votes, image_url, popularity, released_on));


    })
    res.send(moviesInfo);
})

server.listen(PORT1, () => {
    console.log(`Listning on PORT ${PORT1}`)
})

class Forcast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }

}

class Movie {
    constructor(title, overview, average_votes, total_votes, image_url, popularity, released_on) {
        this.title = title;
        this.overview = overview;
        this.average_votes = average_votes;
        this.total_votes = total_votes;
        this.image_url = image_url;
        this.popularity = popularity;
        this.released_on = released_on;
    }
}
