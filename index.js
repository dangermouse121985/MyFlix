const express = require('express'),
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

let moviesDB = [
    {
        title: 'The Godfather',
        Director: 'Francis Ford Coppola'
    },
    {
        title: 'The Godfather Part II',
        Director: 'Francis Ford Coppola'
    },
    {
        title: 'Schindler\' List',
        Director: 'Steven Spielberg'
    },
    {
        title: 'The Dark Knight',
        Director: 'Christopher Nolan'
    },
    {
        title: 'Forest Gump',
        Director: 'Robert Zemeckis'
    },
    {
        title: 'Pulp Fiction',
        Director: 'Quentin Tarantino'
    },
    {
        title: 'The Shawshank Redemption',
        Director: 'Frank Darabont'
    },
    {
        title: 'Inception',
        Director: 'Christopher Nolan'
    },
    {
        title: 'The Lion King',
        Director: 'Rob Minkoff'
    },
    {
        title: 'Black Panther',
        Director: 'Ryan Coogler'
    }
]

let genres = [];
let directors = [];

app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));

app.get('/movies', (req, res) => {
    res.json(moviesDB);
});

app.get('/movies/:title', (req, res) => {
    res.json(moviesDB.find((movie) => 
    { return movie.title === req.params.title }));
});

app.get('/genre/:title', (req, res) => {
    res.json(genres.find((genre) => 
    { return genre.title === req.params.title }));
});

app.get('/directors/:name', (req, res) => {
    res.json(directors.find((director) => 
    { return director.name === req.params.name }));
});

app.post('/users', (reg,res) => {
    res.send('Successful POST request, creating new user');
});

app.put('/users/:username', (req, res) => {
    res.send('Successful PUT request upadating user\' username');
});

app.delete('/favorites/:movie-id', (req, res) => {
    res.send('Successful DELETE request removeing movie from user\'s favorites movie list');
});

app.delete('/users/:username', (req, res) => {
    res.send('successful DELETE request removing user from list of users');
});

app.get('/', (req, res) => {
    res.send('Welcome to Movie Flix')
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});

app.listen(8080, () => {
    console.log('The movie app has loaded and is listening on port 8080');
});