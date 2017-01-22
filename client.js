var Websocket = require('websocket-stream');
var PouchSync = require('pouch-stream-multi-sync');

function createClient() {
  /* istanbul ignore next */
  function onError(err) {
    if (err.message !== 'write after end') {
      console.log('error', err);
      //client.emit('error', err);
    }
  }
  
  var client = PouchSync.createClient(function connect(address) {
    var ws = Websocket(address);
    ws.on('error', onError);
    return ws;
  });
  
  return client;
}

module.exports = createClient;
