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
  jquery('.exprMain').niceScroll();
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
    localStorage[ip + 'unread'] = 500;
    this.setState({
      nowIp: ip
    });
  }

  onNewAddChat(arrry) {
    const ip=arrry.ip;
    this.state.socket[ip] = ip;
    if (this.state.socket[ip]) {
      let arr = [];
      arr.push({
        ip: ip,
        message: arrry.message,
        date: utils.getDate()
      });
      localStorage[ip] = JSON.stringify(arr);
      localStorage[ip + 'tx'] = " hp-" + (Math.random() * 48).toFixed(0) ;
      this.state.contacts.push(ip);
      this.setState({
        nowIp: ip
      });
    }
    const err = React.createClass({
      render() {
        return (
          <span>{ip}来了 <b>😀</b></span>
        )
      }
    });
    const node = React.createElement(err);
    message.error(node, 4);
  }

  onUnread() {
    this.refs.contacts.unread();
  }

  render() {
    return (
      <div>
        <Header onRunSearch={this.onRunSearch.bind(this)} onSocketAccept={this.onSocketAccept.bind(this)} />
        <Contacts ref="contacts" search={this.state.search} contacts={this.state.contacts} nowIp={this.state.nowIp} onToggleChat={this.onToggleChat.bind(this)} />
        <div className="container" >
          <Home nowIp={this.state.nowIp} state={this.state} onNewAddChat={this.onNewAddChat.bind(this)} onUnread={this.onUnread.bind(this)}/>
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
// if (module.hot) {
//   module.hot.accept('./containers/App', () => {
//     render(<Index />);
//   });
// }
