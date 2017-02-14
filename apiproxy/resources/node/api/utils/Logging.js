'use strict'

const bunyan = require('bunyan');
const splunkBunyan = require("splunk-bunyan-logger")
//const seq = require('bunyan-seq');

var config = {
    token: "your-token-here",
    maxRetries: 3,
    batchInterval: 1000,
    maxBatchCount: 10,
    maxBatchSize: 1024, // 1kb
    url: "https://splunk.local:8088"
}

var splunkStream = splunkBunyan.createStream(config);

var log = bunyan.createLogger({
    name: 'otto-api',
    streams: [
        {
            level: 'info',
            stream: process.stdout         // log debug and above to stdout
        },
        /*
        {
            splunkStream
        },
        {
            //File level logging. In AWS Beanstalk deployment condole logs redirect to /var/log/nodejs/nodejs.log. No need of
            //Explicit logging
            level: 'debug',
            type: 'rotating-file',
            count: 10,
            period: '1h',
            path: './log/otto-api.log'  // log warn and above to a file
        }
         */
    ]
})

module.exports = log;