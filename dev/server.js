import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import allReducers from './js/reducers';
import App from './js/components/App';
import { renderToString } from 'react-dom/server';
import qs from 'qs';
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var routes = require('./js/routes/index.js');
//var mongoStore = require('connect-mongo')(session);
// Express app
var app = express();
// .env
require('dotenv').load();
// passport
require('./js/config/passport')(passport);
// MongoDB
mongoose.connect(process.env.MONGO_URI)
mongoose.Promise = global.Promise;
// Static
app.use('/actions', express.static(process.cwd() + './js/actions'));
app.use('/components', express.static(process.cwd() + './js/components'));
app.use('/config', express.static(process.cwd() + './js/config'));
app.use('/containers', express.static(process.cwd() + './js/containers'));
app.use('/models', express.static(process.cwd() + './js/models'));
app.use('/reducers', express.static(process.cwd() + './js/reducers'));
app.use('/api', express.static(process.cwd() + './js/api'));
app.use('/src', express.static('src'));
// Session
app.use(session({
	secret: 'secretKLM',
	resave: false,
	saveUninitialized: true
//  store: new mongoStore({ mongooseConnection: mongoose.connection })
}));
// Passport
app.use(passport.initialize());
app.use(passport.session());
// View engine ejs
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/../src');
app.set('view engine', 'html');
// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
// 
app.enable('trust proxy');
// Routes , pass yelp here
routes(app, passport);

var yelp = require('./js/api/yelpApi.js');
// https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md
app.use(handleRender);
function handleRender(req, res) {
  let initialState = { user: req.user ? req.user.twitter : null };
	const store = createStore(
    allReducers,
    initialState,
    applyMiddleware(thunk, promise(), createLogger())
  );

	const html = renderToString(
		<Provider store={store}>
			<App logged={req.isAuthenticated()}/>
		</Provider>
	);

	const preloadedState = store.getState();

	res.send(renderFullPage(html, preloadedState));
}
function renderFullPage(html, preloadedState) {
	return `
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/src/js/bundle.min.js"></script>
      </body>
    </html>
  `
}

// listen
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});