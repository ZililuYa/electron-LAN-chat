let net = require('net');
let port = 19964;
const clients = {
  send: (host, val) => {
    let client = new net.Socket();
    client.setEncoding('binary');
    client.connect(port, host, () => {
      client.write(JSON.stringify(val));
      client.end();
    });
    client.on('error', (e) => {
      alert('发送失败，确保IP正确');
    });
  }
};
module.exports = clients;
