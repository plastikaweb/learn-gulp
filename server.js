/**
 * Created by plastik on 24/1/16.
 */
var StaticServer = require('static-server'),
  server = new StaticServer({
      rootPath: './public/',
      port: 3000
  });

server.start(function() {
    console.log('server started on port ' + server.port);
});