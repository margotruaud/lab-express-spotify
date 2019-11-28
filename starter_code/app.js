require('dotenv').config()

const express = require('express');
const hbs = require('hbs');


// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");
var Spotify = require('spotify-web-api-js');
var s = new Spotify();


const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


app.get('/',(req,res,next) => {
  res.render('layout');
});

app.get('/search',(req,res,next) => {
  res.send(req.query)

});

app.get('/artists',(req,res,next) => {
  res.render('artists');
  
  spotifyApi
  .searchArtists(req.query.artists)
  .then(data => {
    console.log("The received data from the API: ", data.body);
    // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
  })
  .catch(err => {
    console.log("The error while searching artists occurred: ", err);
  });
})

// setting the spotify-api goes here:

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body["access_token"]);
  })
  .catch(error => {
    console.log("Something went wrong when retrieving an access token", error);
  });

  






// the routes go here:



app.listen(3001, () => console.log("My Spotify project running on port 3001 🎧 🥁 🎸 🔊"));
