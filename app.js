"use strict";

var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var payees = require('./routes/payees');
var payslips = require('./routes/payslips');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

//Serve up the static react client front-end app files
app.use(express.static(path.join(__dirname, 'react-client/build')));

//Setup routes
app.use('/api/payees', payees);
app.use('/api/payslips', payslips);

//Redirect all uncaught requests to the react front-end
app.get('*', (request, response, next) => {
	let client = path.join(__dirname + '/react-client/build/index.html');
	if(fs.existsSync(client)) {
		response.sendFile(client);
	} else {
		var error = new Error('Not Found');
		  error.status = 404;
		  next(error);
	}
});


// error handler
app.use(function(error, request, response, next) {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.render('error');
});

module.exports = app;
