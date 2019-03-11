const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const expressSession  = require('express-session');
require('./models/User.js');
require('./models/Survey.js');
require('./services/passport.js');

const app = express();

app.use(bodyParser.json())

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in milliseconds
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI);

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV === 'production') {
	// tell express to serve files from react side
	app.use(express.static('client/build'));
	
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);

