const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    app.use(proxy('/auth/twitter', { target: 'http://localhost:5000' }));
    app.use(proxy('/auth/twitter/callback', { target: 'http://localhost:5000/auth/twitter/callback' }));
    app.use(proxy('/api/*', { target: 'http://localhost:5000' }));
};