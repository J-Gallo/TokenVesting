"use strict";

const express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      fs = require('fs');


const ApiClient = require('./clients/ApiClient'),
  config = require('./config'),
  cookieSession = require('cookie-session');



const routes = require('./routes/index'),
      app = express(),
      hbs = require('hbs'),
      compress = require('compression');


hbs.registerPartials(__dirname + '/views/');

app.use(compress());
app.set('x-powered-by', false);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


var app_version = fs.readFileSync('APP_VERSION').toString().trim();

app.use('/statics', express.static(path.join(__dirname, 'statics'), { maxAge: 604800000 }));

app.use('/', function(req, res, next) {
    res.locals.app_version = app_version;
    next();
});

app.use('/', routes);


module.exports = app;
