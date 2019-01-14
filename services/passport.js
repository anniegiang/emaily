const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
	});
});

passport.use(new TwitterStrategy({
    consumerKey: keys.TwitterConsumerKey,
    consumerSecret: keys.TwitterConsumerSecret,
    callbackURL: "/auth/twitter/callback",
    proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
  	User.findOne({ twitterID: profile.id }).then(existingUser => {
  		if(existingUser) {
  			done(null, existingUser);
  		} else {
  			new User({ twitterID: profile.id })
  			.save()
  			.then(user => done(null, user));
  		}
  	})
    
  }
));
