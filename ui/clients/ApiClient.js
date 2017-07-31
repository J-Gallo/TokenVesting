"use strict";

const Q = require("q"),
  restConnector = require('../clients/RestConnector'),
  config = require('../config');

class ApiClient {
  constructor(apiConfig) {
    this._restConnector = new restConnector(4000);
  }
}

module.exports = ApiClient;
