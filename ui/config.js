"use strict";

var path 			= require('path');
var util 			= require('util');
var env       = process.env.NODE_ENV || 'development';


if (env == 0 || env == 'undefined') {
  env = 'development';
}

if(!env) new Error("NODE_ENV variable should be set");

var config    = require(__dirname + util.format('/config/%s.config.js', env) );

config.env = env;

module.exports = config;
