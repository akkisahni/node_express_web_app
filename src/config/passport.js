const passport = require('passport');
function passportInit(app){
    app.use(passport.initialize());
    app.use(passport.session());
    require('./local-strategy')();
    // Stores user in session
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // Retrieves user from session
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

module.exports = passportInit;