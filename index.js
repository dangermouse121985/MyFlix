const express = require('express'),
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

let topTenMovies = [
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
app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});

app.get('/movies', (req, res) => {
    res.json(topTenMovies);
});

app.get('/', (req, res) => {
    res.send('Welcome to Movie Flix')
});

app.listen(8080, () => {
    console.log('The movie app has loaded and is listening on port 8080');
});