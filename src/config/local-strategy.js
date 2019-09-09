const {Strategy} = require('passport-local');
const passport = require('passport');
const debug = require('debug')('EXPRESS_POC:LOCAL_STRATEGY');
const MongoService = require('../services/mongoService');

function localStrategy(){
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, async (username, password, done) => {
            debug(username);
            const user = await MongoService().findOne('users', {username});
            debug(user);
            if(user.password === password){
                done(null, user);
            }else{
                done(null,false);
            }    
        }
    ));
}

module.exports = localStrategy;