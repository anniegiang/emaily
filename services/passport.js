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
  async (accessToken, refreshToken, profile, done) => {
  	const existingUser = await User.findOne({ twitterID: profile.id })
		if(existingUser) {
			return done(null, existingUser);
		}
		const user = await new User({ twitterID: profile.id }).save()
		done(null, user);		
  }
));
