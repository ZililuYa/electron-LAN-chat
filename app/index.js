import React from 'react';
import { render } from 'react-dom';
import './app.global.scss';
import './assets/scss/style.scss';
import Header from './components/Header';
import Contacts from './components/Contacts';
import Home from './components/Home';
import utils from './utils/utils';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      socket: [],
      nowIp: 0,
      connected: true,
      contacts: []
    };
  }

  componentWillMount() {
    this.state.socket[utils.ip] = window.socket.connect(utils.socketIp);
    this.state.connected = this.state.socket[utils.ip].connected;
    this.state.nowIp = utils.ip;
    // message log
    //localStorage[utils.ip]
    let arr = [];
    arr.push({
      ip: 0,
      message: 'Hello, ' + utils.ip,
      date: utils.getDate()
    });
    localStorage[utils.ip] = JSON.stringify(arr);
    localStorage[utils.ip + 'tx'] = "assets/images/hp/" + (Math.random() * 48).toFixed(0) + ".png";
    this.state.contacts.push(utils.ip);
  }

  onRunSearch(sea) {
    // 暂时不支持搜索
    // this.setState({
    //   search: sea
    // });
  }

  onSocketAccept(hz) {
    let ip = utils.IpQz + '.' + hz;
    console.log(ip, this.state.socket[ip]);
    if (this.state.socket[ip]) {
      alert(utils.LinkError);
      return false;
    } else {

      this.state.socket[ip] = window.socket.connect(utils.getSocketIp(ip));
      if (this.state.socket[utils.ip].connected === this.state.connected) {
        let arr = [];
        arr.push({
          ip: 0,
          message: 'Hello, ' + utils.ip,
          date: utils.getDate()
        });
        localStorage[ip] = JSON.stringify(arr);
        localStorage[ip + 'tx'] = "assets/images/hp/" + (Math.random() * 48).toFixed(0) + ".png";
        this.state.contacts.push(utils.ip);
        this.setState({
          nowIp: ip
        });
      } else {
        this.state.socket[ip] = undefined;
        alert(utils.LinkError);
      }
    }
  }

  render() {
    return (
      <div>
        <Header onRunSearch={this.onRunSearch.bind(this)} onSocketAccept={this.onSocketAccept.bind(this)} />
        <Contacts search={this.state.search} contacts={this.state.contacts} nowIp={this.state.nowIp} />
        <div className="container" >
          <Home nowIp={this.state.nowIp} state={this.state} />
        </div>
      </div>
    );
  }
}


render(
  <Index />,
  document.getElementById('root')
);


// if (module.hot) {
//   module.hot.accept('./containers/Root', () => {
//     render(
//       <Index />,
//       document.getElementById('root')
//     );
//   });
// }
