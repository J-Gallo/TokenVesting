"use strict";

const Q             = require("q"),
      restler       = require('restler'),
      cls 			    = require('continuation-local-storage');

class RestConnector {
  constructor(defaultTimeout) {
    this._defaultTimeout = defaultTimeout;
    this._cache = new NodeCache();
  }

  get(url, options, xBrand) {
    console.log('[GET] -> ' + url);
    if(options && options.cache) {
      return this._getWithCache(url, options, xBrand);
    } else {
      return this._getWithoutCache(url, options, xBrand);
    }
  }

  post(url, body, options) {
    console.log('[POST] ' + url);

    var deferred = Q.defer();
    restler.postJson(url, body, options)
      .on('success', (rs) => deferred.resolve(rs))
      .on('fail', (err) => this._handleError(url, deferred, err))
      .on('error', (err) => this._handleError(url, deferred, err))
      .on('timeout', (err) =>  this._handleError(url, deferred, err));

    return deferred.promise;
  }

  delete(url, options) {
    console.log('[DELETE] ' + url);

    var deferred = Q.defer();

    restler.del(url, options)
      .on('success', (rs) => deferred.resolve(rs))
      .on('fail', (err) => this._handleError(url, deferred, err))
      .on('error', (err) => this._handleError(url, deferred, err))
      .on('timeout', (err) =>  this._handleError(url, deferred, err));

    return deferred.promise;
  }

  _getWithoutCache(url, options, xBrand) {

    console.log('Getting ' + url + ' for brand: ' + xBrand);

    var deferred = Q.defer();
    restler .get(url, options)
            .on('success', (rs) => deferred.resolve(rs))
            .on('fail', (err) => this._handleError(url, deferred, err))
            .on('error', (err) => this._handleError(url, deferred, err))
            .on('timeout', (err) =>  this._handleError(url, deferred, err));

    return deferred.promise;
  }

  _handleError(url, deferred, err) {
    if(!(err instanceof Error)) err = new Error(err);
    logger.error('RestConnector Error ' + url, err);
    deferred.reject(new Error('RestConnector Error ' + url));
  }

  _getWithCache(url, options) {
    var deferred = Q.defer();
    var xBrand = cls.getNamespace('app-log-ctx').get('xBrand');
    var cacheKey = this._getCacheKey(url,xBrand);

    this._cache.get(cacheKey, (err, cachedResponse) => {
      if(cachedResponse) {
        console.log('Response resolved from cache with key: ' + cacheKey);
        deferred.resolve(cachedResponse)

      } else {
        this._getWithoutCache(url, options)
        .then((rs) => {
          this._cache.set(cacheKey, rs, options.cache.ttl);
          deferred.resolve(rs);
        })
        .catch((err) => {
          deferred.reject(err);
        });
      }
    });
    
    return deferred.promise;
  }

  _getCacheKey(url, xBrand){
    return url + "-" + xBrand;
  }
  
}

module.exports = RestConnector;