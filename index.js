const express = require('express'),
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path'),
    mongoose = require('mongoose'),
    Models = require('./models.js'),
    bodyParser = require('body-parser');

const Movies = Models.Movie;
const Users = Models.User;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
mongoose.connect('mongodb://localhost:27017/movieflixdb', { useNewUrlParser: true, useUnifiedTopology: true});

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));

/* Return All Movies */
app.get('/movies', async (req, res) => {
    await Movies.find()
        .then ((movies) => {
            res.json(movies);
        })
        .catch ((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/* Return A Movie By its Title */
app.get('/movies/:title', async (req, res) => {
    await Movies.findOne({ title: req.params.title })
        .then ((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/* Return All Genres */
app.get('/genres', async (req, res) => {
    await Movies.distinct("genre")
        .then ((movies) => {
            res.json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/* Returns A Genre by Name */
app.get('/genres/:name', async (req, res) => {
    await Movies.find({"genre.name": req.params.name},{"genre.name": 1, "genre.description": 1})
        .then ((movies) => {
            res.json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

/* Return All Directors */
app.get('/directors', async (req, res) => {
    await Movies.distinct("director")
        .then((movies) => {
            res.json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

/* Return a Director by Name */
app.get('/directors/:name', async (req, res) => {
    await Movies.findOne({"director.name": req.params.name},{"director": 1})
        .then ((movies) => {
            res.json(movies);
        })
        .catch ((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

/* Return All Actors */
app.get('/actors', async (req, res) => {
    await Movies.distinct("actors")
        .then((movies) => {
            res.json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

/* Return a Director by Name */
/* I am unsure how to resolve this one. Currently it returns the full array of actors that the actor belongs to */
app.get('/actors/:name', async (req, res) => {
    await Movies.findOne({"actors.name": req.params.name},"actors.$")
        .then ((movies) => {
            res.json(movies);
        })
        .catch ((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

/* Return all Users */
app.get('/users', async (req, res) => {
    await Users.find()
        .then ((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/* Return a User by Username */
app.get('/users/:username', async (req, res) => {
    await Users.findOne({ username: req.params.username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/* Create a New User Account */
/* JSON in the following format expected:
{
    username: String, (required),
    password: String, (required),
    first_name: String, (required),
    last_name: String, (required),
    email: String, (required),
    birth: Date
}*/
app.post('/users', async(req, res) => {
    await Users.findOne({ username: req.body.username})
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.username + ' already exists');
            } else {
                Users.create({
                        username: req.body.username,
                        password: req.body.password,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        birth: req.body.birth
                    })
                    .then((user) => { res.status(201).json(user) })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send('Error: ' + err);
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//Update a user's info, search by username
/* JSON in the following format expected:
{
    username: String, (required)
    password: String, (required)
    email: String, (required)
    birth: Date
}*/
app.put('/users/:username', async (req, res) => {
    await Users.findOneAndUpdate({username: req.params.username},{ $set:
        {
            username: req.body.username,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.params.last_name,
            email: req.body.email,
            birth: req.params.birth
        }
    },
    {new: true}) //this line makes sure that the update document is returned
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch ((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    })
});

/* Add a moive to a user's favorites list */
//Used $addToSet instead of $push to prevent duplicates from being added to the array
app.put('/users/:username/favorites/:movieID', async (req, res) => {
    await Users.findOneAndUpdate({ username: req.params.username},{
        $addToSet: { favorites: new mongoose.Types.ObjectId(req.params.movieID)}
    },
    { new: true}) //this line makes sure that the update document is returned true
    .then((updatedUser) => {
        console.log(new mongoose.Types.ObjectId(req.params.movieID));
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

/* Remove a Movie from a user's favorite's list */
app.delete('/users/:username/favorites/:movieID', async (req, res) => {
    await Users.findOneAndUpdate({ username: req.params.username },{
        $pull: { favorites: new mongoose.Types.ObjectId(req.params.movieID) }
    },
    { new: true}) //this line makes sure that the update document is returned true
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

/* Unregister a user, Search by username */
app.delete('/users/:username', async (req, res) => {
    await Users.findOneAndRemove({ username: req.params.username})
    .then((user) => {
        if (!user) {
            res.status(400).send(req.params.username + " was not found.");
        } else {
            res.status(200).send(req.params.username + " was deleted.");
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err)
    });
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