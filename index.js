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

let genres = [
    {
        title: 'action',
        description: 'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.'
    }
];
let directors = [
    {
        name: "Christopher Nolan",
        bio: "Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed $5 billion worldwide.",
        birthYear: 1970,
        deathYear: null
    }
];

app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));

app.get('/movies', (req, res) => {
    res.json(moviesDB);
});

app.get('/movies/:title', (req, res) => {
    res.json(moviesDB.find((movie) => 
    { return movie.title === req.params.title }));
});

app.get('/genres/:title', (req, res) => {
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
    res.send('Successful PUT request upadating user\'s username');
});

app.put('/users/:username/favorites/:movieId', (req, res) => {
    res.send('Successful PUT request adding movie to user\'s favorites list');
});

app.delete('/users/:username/favorites/:movie-id', (req, res) => {
    res.send('Successful DELETE request removing movie from user\'s favorites movie list');
});

app.delete('/users/:username', (req, res) => {
    res.send('successful DELETE request removing user from list of users');
});

app.get('/', (req, res) => {
    res.send('Welcome to Movie Flix');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});

app.listen(8080, () => {
    console.log('The movie app has loaded and is listening on port 8080');
});