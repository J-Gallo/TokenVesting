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
  router.post('/lastTransferDate', (req, res, next) => controllers.tokenVesting.lastTokenIsTransferableDate(req, res));
  router.post('/getTokenCount', (req, res, next) => controllers.tokenVesting.tokenGrantsCount(req, res));
  router.post('/getTokenGrant', (req, res, next) => controllers.tokenVesting.getTokenGrant(req, res));

module.exports = router;
