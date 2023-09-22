const express = require('express'),
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

let moviesDB = [
    {
        id: 1,
        title: 'The Godfather',
        url: "/movies/The%20Godfather"
    },
    {
        id: 2,
        title: 'The Godfather Part II',
        url: '/movies/the%20Godfather%20Part%II'
    },
    {
        id: 3,
        title: 'Schindler\'s List',
        url: '/movies/schindlers%20list'
    },
    {
        id: 4,
        title: 'The Dark Knight',
        url: '/movies/the%20dark%20knight'
    },
    {
        id: 5,
        title: 'Forest Gump',
        url: '/movies/forest%20gump'
    },
    {
        id: 6,
        title: 'Pulp Fiction',
        url: '/movies/pulp%20fiction'
    },
    {
        id: 7,
        title: 'The Shawshank Redemption',
        url: '/movies/the%20shawshank%20redemption'
    },
    {
        id: 8,
        title: 'Inception',
        url: '/movies/inception'
    },
    {
        id: 9,
        title: 'The Lion King',
        url: '/movies/the%20kion%20king'
    },
    {
        id: 10,
        title: 'Black Panther',
        url: '/movies/black%20panther'
    }
]

let movieDetails = [
    {
        id: 1,
        title: 'The Godfather',
        director: 'Christopher Nolan',
        genre: 'Action/Fantasy',
        releaseYear: 2005,
        imageUrl: 'https://image.com/image.png',
        featured: true
    },
    {
        id: 1235,
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        genre: 'Action/Fantasy',
        releaseYear: 2005,
        imageUrl: 'https://image.com/image.png',
        featured: true
    }
];

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
    res.json(movieDetails.find((movie) => 
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

app.put('/users/:username/favorites/:movie-id', (req, res) => {
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