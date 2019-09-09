const express = require('express');
const authRoute = express.Router();
const debug = require('debug')('EXPRESS_POC:AUTH_ROUTER');
const MongoService= require('../services/mongoService');
const passport = require('passport');
function router(nav){
    authRoute.route('/signup')
    .post(async (req,res) =>{
        const user = req.body;
        const result = await MongoService().insertOne('users', user);
        debug(result);
        req.login(result.ops[0], () => {
            res.redirect('/auth/profile');
        });
    });

    authRoute.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
  }));

    authRoute.route('/profile')
    .all((req, res, next) => {
      debug(req.user);
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });

    authRoute.route('/logout')
    .get((req,res) => {
        req.logout();
        res.redirect('/');
    });

    return authRoute;
}

module.exports = router;