/**
 * Created by T_Polsv on 12/2/16.
 */
'use strict'

const Promise = require('bluebird')
const request = require('request')
const btoa = require('btoa')
const CryptoJS = require('crypto-js')
const stringUtils = require('../utils/StringUtils')
const log = require('../utils/Logging')


var crucibleClient = function (baseUrl, data, callType, oAuthToken) {
    log.info('BaseUrl: ', baseUrl)
    log.info('Data: ', data)
    log.info('method: ', callType)
    log.info('oAuthToken: ', oAuthToken)

    const client_secret = process.env.client_secret;
    const callback = process.env.callback;


// Generate timestamp header
    var timestamp = Math.floor(Date.now() / 1000);

    // Generate signature header
    var base_str = callback + oAuthToken + timestamp;
    var hmacsha256 = CryptoJS.HmacSHA256(base_str, client_secret);
    var api_signature = CryptoJS.enc.Base64.stringify(hmacsha256);

    var headers = {
        Authorization: 'Bearer ' + oAuthToken,
        CSN: 999999999,
        signature: api_signature,
        timestamp: timestamp,
        sender: 'otto-api'
    }

    var callTypeGetPostPatchPut = 'GET'
    var jsonContent = {}
    if (stringUtils.compareStrings(callType, 'GET', false, true)) {
        callTypeGetPostPatchPut = 'GET'
        if (data !== undefined)
            baseUrl = baseUrl + '/' + data
    } else if (stringUtils.compareStrings(callType, 'POST', false, true)) {
        callTypeGetPostPatchPut = 'POST'
        jsonContent = data
    } else if (stringUtils.compareStrings(callType, 'PATCH', false, true)) {
        callTypeGetPostPatchPut = 'PATCH'
        jsonContent = data
    } else if (stringUtils.compareStrings(callType, 'PUT', false, true)) {
        callTypeGetPostPatchPut = 'PUT'
        jsonContent = data
    }
    var options = {
        url: baseUrl,
        headers: headers,
        method: callTypeGetPostPatchPut,
        json: jsonContent
    }
    log.debug('options: ', options)

    return new Promise(function (resolve, reject) {
        request(options,
            function (error, response, body) {
                if (error) {
                    log.debug('Error in Crucible Client Call: ', error)
                    var result = {
                        statusCode: response.statusCode,
                        error: error
                    }
                    return reject(result)
                }
                if (stringUtils.checkSuccessCode(response.statusCode)) {
                    var result = {
                        statusCode: response.statusCode,
                        statusMessage: body || 'success'
                    }
                    log.info('Success in Crucible Client Call Status Code: ', response.statusCode)
                    log.debug('Success in Crucible Client Call Data: ', body)
                    return resolve (result)
                } else {
                    var result = {
                        statusCode: response.statusCode,
                        statusMessage: body || 'Exception in Crucible Call.'
                    }
                    log.error('Error Apigee Status Code: ', response.statusCode)
                    log.error('Error Apigee Body: ', body)
                    return reject(result)
                }
            })
    }).nodeify()
};
module.exports.crucibleClient = crucibleClient;

