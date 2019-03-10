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
		res.send('This is the Home Page');
	})

	app.get('/auth/twitter',
	  passport.authenticate('twitter'));

	app.get('/auth/twitter/callback',
	  passport.authenticate('twitter'),
	  function(req, res) {
	    res.redirect('/surveys');
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
}