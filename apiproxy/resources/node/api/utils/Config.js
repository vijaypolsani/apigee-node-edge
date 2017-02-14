'use strict';

const nconf = require("nconf");

/*
var conf = nconf.add("config", {
    type: "file",
    file: "./config/default.json"
});
module.exports = conf;
*/
//Explore Secure Key/password option

function Config() {
    nconf.argv().env();
    var environment = nconf.get('NODE_ENV') || 'production';
    nconf.file(environment, './config/' + environment.toLowerCase() + '.json');
    nconf.file('default', './config/default.json');
}

Config.prototype.get = function(key) {
    return nconf.get(key);
};

module.exports = new Config();

