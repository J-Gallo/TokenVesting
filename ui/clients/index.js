'use strict';

const config = require('../config'),
  ApiClient = require('./ApiClient');

module.exports = {
  apiClient: new ApiClient(config.api(), xBrand)
};
