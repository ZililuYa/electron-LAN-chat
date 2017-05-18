import React from 'react';
import { render } from 'react-dom';
import './app.global.scss';
import Header from './components/Header';
import Contacts from './components/Contacts';
import Home from './components/Home';
import utils from './utils/utils';
import jquery from 'jquery';
import './assets/js/jquery.nicescroll.min';
import { message } from 'antd';

window.onload = () => {
  jquery('#contacts').niceScroll();
};

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
    this.state.socket[utils.ip] = utils.ip;
    this.state.connected = utils.ip;
    this.state.nowIp = utils.ip;
    let arr = [];
    arr.push({
      ip: 0,
      message: 'Hello, ' + utils.ip,
      date: utils.getDate()
    });
    localStorage[utils.ip] = JSON.stringify(arr);
    localStorage[utils.ip + 'tx'] = " hp-" + (Math.random() * 48).toFixed(0) ;
    this.state.contacts.push(utils.ip);
    // console.log(myState);
    // client.isTrueLink(utils.ip, this.state, (sta, myState) => {
    //   console.log(myState);
    //   if (sta) {
    //   }
    // });
  }

  onRunSearch(sea) {
    // 暂时不支持搜索
    // this.setState({
    //   search: sea
    // });
  }

  onSocketAccept(hz) {
    let ip = utils.IpQz + '.' + hz;

    if (this.state.socket[ip]) {
      const err = React.createClass({
        render() {
          return (
            <span>已经存在或者目标不存在 <b>😂</b></span>
          )
        }
      });
      const node = React.createElement(err);
      message.error(node, 4);
      return false;
    } else {

      this.state.socket[ip] = ip;
      if (this.state.socket[ip]) {
        let arr = [];
        arr.push({
          ip: 0,
          message: 'Hello, ' + ip,
          date: utils.getDate()
        });
        localStorage[ip] = JSON.stringify(arr);
        localStorage[ip + 'tx'] = " hp-" + (Math.random() * 48).toFixed(0) ;
        this.state.contacts.push(ip);
        this.setState({
          nowIp: ip
        });
      } else {
      }
    }
  }

  onToggleChat(ip) {
    console.log(this, ip);
    this.setState({
      nowIp: ip
    });
  }

  onNewAddChat(ip) {
    this.state.socket[ip] = ip;
    if (this.state.socket[ip]) {
      let arr = [];
      arr.push({
        ip: ip,
        message: 'Hello, ' + ip,
        date: utils.getDate()
      });
      localStorage[ip] = JSON.stringify(arr);
      localStorage[ip + 'tx'] = " hp-" + (Math.random() * 48).toFixed(0) ;
      this.state.contacts.push(ip);
      this.setState({
        nowIp: ip
      });
    }
  }

  render() {
    return (
      <div>
        <Header onRunSearch={this.onRunSearch.bind(this)} onSocketAccept={this.onSocketAccept.bind(this)} />
        <Contacts search={this.state.search} contacts={this.state.contacts} nowIp={this.state.nowIp} onToggleChat={this.onToggleChat.bind(this)} />
        <div className="container" >
          <Home nowIp={this.state.nowIp} state={this.state} onNewAddChat={this.onNewAddChat.bind(this)} />
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
