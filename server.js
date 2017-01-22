var websocket = require('websocket-stream');
var PouchSync = require('pouch-stream-multi-sync');

function createServer(httpServer, onRequest) {
  if (! httpServer) {
    throw new Error('need a base HTTP server as first argument');
  }

  function handle(stream) {
    stream.on('error', propagateError);
    var server = PouchSync.createServer(onRequest);
    server.on('error', propagateError);
    stream.pipe(server).pipe(stream);
  }

  /* istanbul ignore next */
  function propagateError(err) {
    var ignoreErrorMessages = [
      'write after end',
      'not opened',
    ];
    
    if (ignoreErrorMessages.indexOf(err.message) < 0) {
      console.log('error', err);
      // wsserver.emit('error', err);
    }
  }
  
  var wsserver = websocket.createServer({server: httpServer}, handle);
  return wsserver;
}

module.exports = createServer;
