import React from 'react';
import { message } from 'antd';
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
      const err = React.createClass({
        render() {
          return (
            <span>{host} 发送失败 <b>😣</b></span>
          )
        }
      });
      const node = React.createElement(err);
      message.error(node, 4);
      client.end();
    });
  }
};
module.exports = clients;
