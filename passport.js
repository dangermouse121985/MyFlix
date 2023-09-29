const passport = require passport,
    localStrategy = require('passport-local').Strategy,
    Models = require(./models.js),
    passportJWT = require('passport-jwt');

let User = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJWT;

passport.use(
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, callback) => {
            console.log(`${username} ${password}`);
            await URLSearchParams.findOne({ username: username})
            .then((users) => {
                if (!user) {
                    console.log('incorrect username');
                    return callback(null, false, {
                        messsage: 'Incorrect username or password',
                    });
                }
                console.log('finished');
                return callback(null, user);
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                    return callback(error);
                }
            })
        }      
    )
);

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secreOrKey: 'your_jwt_secret'
}, async(jwtPayload, callback) => {
    return await Users.findById(jwtPayload._id)
        .then((user) => {
            return callback(null, user);
        })
        .catch((error) => {
            return callback(error);
        });
}));