const express = require('express'),
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path'),
    mongoose = require('mongoose'),
    Models = require('./models.js'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    { check, validationResult } = require('express-validator');

const Movies = Models.Movie;
const Users = Models.User;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
let allowedOrigins = ['http://localhost:8080', 'http://localhost:1234'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn't found on the list of allowed origins
            let message = `The CORS policy for this application doesn't allow access from origin ` + origin;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

//mongoose.connect('mongodb://localhost:27017/movieflixdb', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.static('public'));

/* Return All Movies */
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.find()
        .then((movies) => {
            res.json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/* Return A Movie By its Title */
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ title: req.params.title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/* Return All Genres */
app.get('/genres', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.distinct("genre")
        .then((movies) => {
            res.json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/* Returns A Genre by Name */
app.get('/genres/:name', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ "genre.name": req.params.name }, { "genre.name": 1, "genre.description": 1 })
        .then((movies) => {
            res.json(movies.genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

/* Return All Directors */
app.get('/directors', passport.authenticate('jwt', { session: false }), async (req, res) => {
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
app.get('/directors/:name', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ "director.name": req.params.name }, { "director": 1 })
        .then((movies) => {
            res.json(movies.director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

/* Return All Actors */
app.get('/actors', passport.authenticate('jwt', { session: false }), async (req, res) => {
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
app.get('/actors/:name', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ "actors.name": req.params.name }, { "actors.$": 1 })
        .then((movies) => {
            res.json(movies.actors);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

/* Return all Users */
app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.username !== 'dcrichlow1985') {
        console.log(req.user.username)
        return res.status(400).send('Permission Denied');
    }
    await Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/* Return a User by Username */
app.get('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.username !== req.params.username) {
        return res.status(400).send('Permission Denied');
    }

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
app.post('/users',
    /* Validation logic here for request
    you can either use a chain of methods like .not().isEmpty()
    which means "opposite of isEmpty" in plain english "is not empty"
    or use .isLength9({min: 5}) which means
    minimum value of 5 characters are only allowed */
    [
        check('username', 'Username is required').isLength({ min: 5 }),
        check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('password', 'Password is required').not().isEmpty(),
        check('first_name', 'First Name is required').not().isEmpty(),
        check('last_name', 'Last Name is required').not().isEmpty(),
        check('email', 'Email does not appear to be valid').isEmail()
    ], async (req, res) => {
        // Check the validation object for errors
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let hashedPassword = Users.hashPassword(req.body.password);
        await Users.findOne({ username: req.body.username })
            .then((user) => {
                if (user) {
                    return res.status(400).send(req.body.username + ' already exists');
                } else {
                    Users.create({
                        username: req.body.username,
                        password: hashedPassword,
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
app.put('/users/:username', passport.authenticate('jwt', { session: false }),
    [
        check('username', 'Username is requierd').isLength({ min: 5 }),
        check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('password', 'Password is required to verify changes').not().isEmpty(),
        check('email', 'Email does not appear to be valid').isEmail()
    ], async (req, res) => {

        if (req.user.username !== req.params.username) {
            res.status(400).send('Permission Denied');
        }

        //check the validation object for errors
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let hashedPassword = Users.hashPassword(req.body.password);
        await Users.findOneAndUpdate({ username: req.params.username }, {
            $set:
            {
                username: req.body.username,
                password: hashedPassword,
                first_name: req.body.first_name,
                last_name: req.params.last_name,
                email: req.body.email,
                birth: req.params.birth
            }
        },
            { new: true }) //this line makes sure that the update document is returned
            .then((updatedUser) => {
                res.json(updatedUser);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error: " + err);
            })
    });

/* Add a moive to a user's favorites list */
//Used $addToSet instead of $push to prevent duplicates from being added to the array
app.put('/users/:username/favorites/:movieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.username !== req.params.username) {
        res.status(400).send('Permission Denied');
    }
    await Users.findOneAndUpdate({ username: req.params.username }, {
        $addToSet: { favorites: new mongoose.Types.ObjectId(req.params.movieID) }
    },
        { new: true }) //this line makes sure that the update document is returned true
        .then((updatedUser) => {
            res.json(updatedUser);
            return req.body;
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

/* Remove a Movie from a user's favorite's list */
app.delete('/users/:username/favorites/:movieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.username !== req.params.username) {
        res.status(400).send('Permission Denied');
    }
    await Users.findOneAndUpdate({ username: req.params.username }, {
        $pull: { favorites: new mongoose.Types.ObjectId(req.params.movieID) }
    },
        { new: true }) //this line makes sure that the update document is returned true
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

/* Unregister a user, Search by username */
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.username !== req.params.username || req.user.username === "dcrichlow1985") {
        res.status(400).send('Permission Denied');
    }
    await Users.findOneAndRemove({ username: req.params.username })
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

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
});