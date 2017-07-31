"use strict";

exports.api =  () => {
	var api = {
		timeout: 5000,

		restler_timeout: () => {
			return { timeout: api.timeout };
		}
	}

	return api;
};

exports.general =  () => {
	var general = {
	}

	return general;
}

exports.mongo = () => {
  var ip = "mongodb://localhost:27017";

  return ip;
};
