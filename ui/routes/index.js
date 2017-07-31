"use strict";

const express = require('express'),
  router = express.Router(),
  controllers = require('../controllers'),
  device = require('moblet');

router.all('*', function(req, res, next) {
  //Get user agent
  var ua = req.get('User-Agent');
  if (ua) {
    res.locals.device = device.detectDevice(ua);
  } else {
    res.locals.device = "desktop";
  }

  next();
});

//WEB
  router.get('/', (req, res, next) => controllers.web.index(req, res));

//GRANT VESTED TOKEN
  router.post('/grantVestedToken', (req, res, next) => controllers.tokenVesting.grantVestedTokens(req, res));

module.exports = router;
