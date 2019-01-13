const express = require('express');
const passport = require('passport');
const expressSession  = require('express-session');

module.exports = (app) => {
	app.use(expressSession({
	    secret: 'hello',
	    resave: false,
	    saveUninitialized: true
	}));

	app.get('/', (req, res) => {
		res.send('Home Page');
	})

	app.get('/auth/twitter',
	  passport.authenticate('twitter'));

	app.get('/auth/twitter/callback',
	  passport.authenticate('twitter', { failureRedirect: '/login' }),
	  function(req, res) {
	    res.redirect('/');
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
}