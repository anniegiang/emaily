module.exports = (req, res, next) => {
	if(!req.user) {
		return res.send.status(401).end({ error: 'You must login first'});
	}

	next();
}	