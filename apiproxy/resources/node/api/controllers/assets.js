'use strict';

const Promise = require('bluebird')
const ottoCache = require('../helpers/ottoCache')
const crucibleClient = require('../helpers/crucibleClient')
const oauthCrucibleClient = require('../helpers/oauthCrucibleClient')
const log = require('../utils/Logging')
const conf = require('../utils/Config')

const crucible_access_token = 'crucible_access_token'

module.exports = {
    patchAssets: patchAssets
};
//URL's
/*


 PATCH:
 https://autodesk-eis-np-dev.apigee.net/data/assets/561-07310618

 */

const ASSET = 'https://autodesk-eis-np-dev.apigee.net/data/assets'

log.info('*****************Assets******************')

//PATCH
function patchAssets(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    log.info('Post Body: ', req.body)

    //Do not call the OAuth if you have the key. It expires in every 15 mins
    log.info('Calling OAuth Token Cache/New Creation', ottoCache.ottoCache.getCachedInstance().getAccessTokenFromCache())
    if (!ottoCache.ottoCache.getCachedInstance().getAccessTokenFromCache()) {
        log.info('Creating NEW OAuth Token since we do not have any!')
        oauthCrucibleClient.postOAuthBearerToken()
            .then(function(body) {
                ottoCache.ottoCache.getCachedInstance().setAccessTokenToCache(JSON.parse(body).access_token)
                log.debug('Explicit Token Key generated and set into cache: ' + JSON.parse(body).access_token)
                return orchestrateCalls(req, res)
            }).catch(function(e) {
                log.error('CM Orchestration or OAuth call failed. Should not move forward: ', e)
                return res.json(e);
            })
    } else {
        log.info('OAuth from CACHE. Token: ', ottoCache.ottoCache.getCachedInstance().getAccessTokenFromCache())
        orchestrateCalls(req, res)
    }
}

function orchestrateCalls(req, res) {
    log.debug('In orchestrateCalls Body: ', req.body)
    const payload = req.body
    var arrayOfAssets = []
    for (var i = 0; i < payload.length; i++) {
        arrayOfAssets.push(crucibleClient.crucibleClient(ASSET, payload[i], 'PATCH', ottoCache.ottoCache.getCachedInstance().getAccessTokenFromCache()))
    }
    log.info('Array of calls being made: No: ', arrayOfAssets.length)
        //Promise.all waits for all fulfillments (or the first rejection).
        //Now call the PATCH ASSET function
    Promise.all.bind()(arrayOfAssets).then(function(results) {
        log.debug('Result From Parallel Call: ', results)
        res.json(results).send
    }).catch(function(err) {
        //Receives First Rejection amount the ALL Parallel Called Promises
        log.error('Exception in changing the contract manager: ', err)
        log.error('StatusCode: ', err.statusCode)
        return res.status(err.statusCode).json(err)
    })
}