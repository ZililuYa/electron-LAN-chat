var os = require('os'),
  iptable = {},
  ifaces = os.networkInterfaces();
for (var dev in ifaces) {
  ifaces[dev].forEach((details, alias) => {
    if ((details.family == 'IPv4') && (details.internal == false)) {
      // iptable[dev+(alias?':'+alias:'')]=details.address;
      iptable['localIP'] = details.address;
    }
  });
}


let il = iptable.localIP.split('.');

const utils = {
  ip: iptable.localIP,
  socketIp: 'http://' + iptable.localIP + ':19964',
  getDate: () => {
    return new Date().getTime();
  },
  IpQz: il[0] + '.' + il[1] + '.' + il[2]
};

module.exports = utils;
