/**
 * Created by T_Polsv on 12/2/16.
 */
'use strict'

const log = require('../utils/Logging')
const NodeCache = require('node-cache')
const crucible_access_token = 'crucible_access_token'

module.exports.ottoCache = (function () {
    //TODO: Externalize the configurations
    //Instance Holder
    var cacheInstance
    var tokenExpiryTime = 0

    function init(headers) {
        const name = 'OttoCache'
        var headers = headers || {stdTTL: 898, checkperiod: 898}
        const cache = new NodeCache(headers)
        //Event Triggers that get called when something happens on Cache.
        cache.on('set', function (key, value) {
            log.debug('Key set in the cache: key = ', key, ' : value = ', value)
        })
        cache.on('del', function (key, value) {
            log.debug('Key del in the cache: key = ', key, ' : value = ', value)
        })
        cache.on('expired', function (key, value) {
            log.debug('Key expired in the cache: key = ', key, ' : value = ', value)
        })
        cache.on('flush', function (key, value) {
            log.debug('Key flush in the cache: key = ', key, ' : value = ', value)
        })

        return {
            getAccessTokenFromCache: function getAccessTokenFromCache(){
                log.info('Token Expiry Time: ', tokenExpiryTime, ' Current Time: ', Date.now(), ' *** Is Token Expired: ',tokenExpiryTime < Date.now())

                if (tokenExpiryTime < Date.now()){
                    tokenExpiryTime = Date.now()+890*1000
                    cache.flushAll()
                    log.debug('Access Token expired. Hence Refreshing!')
                }
                log.debug('Get Token from Cache : ', cache.get(crucible_access_token))
                return cache.get(crucible_access_token)
            },
            setAccessTokenToCache: function setAccessTokenToCache(value) {
                log.debug('Set Token to Cache  : ', cache.set(crucible_access_token, value))
                return cache.get(crucible_access_token)
            },
            deleteAccessTokenFromCache: function deleteAccessTokenFromCache() {
                log.debug('Set Token to Cache  : ', cache.det(crucible_access_token))
                return cache.get(crucible_access_token)
            },
            setKeyValueToCache: function setKeyValueToCache(key, value) {
                log.debug('Setting Key, Value ino Cache : key = ', key, ' : value = ', value)
                return cache.set(key,value)
            },
            getCacheStats: function getCacheStats() {
                log.debug('Cache Stats : ', cache.getStats())
                return cache.getStats()
            },
            flushAllDataFromCache: function flushAllDataFromCache(){
                log.debug('Flush all Cache Data : ', cache.flushAll)
                return cache.flushAll()
            }

        }

    }




    //Emulation of static varibales and methods
    var _static = {
        getCachedInstance: function (headers) {

            if (cacheInstance === undefined) {
                log.info('Creating the singleton instance of the Cache. Should be called only ONCE!')
                cacheInstance = init(headers)
            }
            return cacheInstance
        }
    }
    return _static
})();
