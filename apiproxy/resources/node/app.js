'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const conf = require('./api/utils/Config')

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // enable SwaggerUI
  app.use(swaggerExpress.runner.swaggerTools.swaggerUi());

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || conf.get('app:port') || 10010;
  app.listen(port);

  console.log('Bulk Asset Patch Call :\n Server Ready. PATCH on... http://127.0.0.1:' + port + '/assets');

});
