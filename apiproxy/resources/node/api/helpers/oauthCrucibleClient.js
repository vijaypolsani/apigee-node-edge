/**
 * Created by VJ on 12/2/16.
 */
const Promise = require('bluebird')
const request = require('request')
const btoa = require('btoa')
const CryptoJS = require('crypto-js')
const stringUtils = require('../utils/StringUtils')
const log = require('../utils/Logging')


//exports.postOAuthBearerToken = function (url, callbackUrl) {
module.exports.postOAuthBearerToken = (function() {
    var baseUrl = 'https://enterprise-api-dev.autodesk.com/v2/oauth/generateaccesstoken?grant_type=client_credentials'
    var client_id = 'JGGXknQfZTrt0FOMnE0I7mbJSAE4lCJA';
    var client_secret = 'Q5okReeWqWJfggHf';
    var callback = 'www.autodesk.com';

    // Generate timestamp header
    var timestamp = Math.floor(Date.now() / 1000);

    // Generate Authorization header
    var cred_str = client_id + ":" + client_secret;
    var base64_header = btoa(unescape(encodeURIComponent(cred_str)));

    // Generate signature header
    var base_str = callback + client_id + timestamp;
    var hmacsha256 = CryptoJS.HmacSHA256(base_str, client_secret);
    var signature = CryptoJS.enc.Base64.stringify(hmacsha256);

    var headers = {
        Authorization: 'Basic ' + base64_header,
        signature: signature,
        timestamp: timestamp,
        sender: 'otto-api'
    }

    return new Promise(function(resolve, reject) {
        request.post({
                url: baseUrl,
                headers: headers,
                method: 'POST'
            },

            function(error, response, body) {
                if (error) {
                    log.error('Exception in getting OAuth API call: ', error)
                    return reject(JSON.stringify(error))
                }
                if (stringUtils.checkSuccessCode(response.statusCode) && body) {
                    log.info('*Crucible Access Token: statusCode ', response.statusCode)
                    log.debug('*Crucible Access Token: Body', body)
                    resolve(body)
                } else
                    log.error('Exception in getting OAuth API call: ', response)
                return reject(JSON.stringify(body))

            })
    }).nodeify()
});