const express         = require('express');
const path            = require('path');
const scraper         = require('./scraper');

const port = process.env.PORT || 3000;

const app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/static/index.html'));
})

app.get('/getTopMovies',scraper.getTopMovies);
app.get('/getActorTopMovies', scraper.getTopMMoviesOfActor)

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});