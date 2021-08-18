'use strict'

const axios = require('axios')
//getting data from movie api


let handleMovie = async (req, res) => {
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

module.exports = handleMovie;