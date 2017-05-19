import React, { Component } from 'react';
import Typing from './Typing';
import Chatlog from './Chatlog';
import utils from '../utils/utils';
import client from '../assets/js/client';
import { ipcRenderer } from 'electron';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = props;
    ipcRenderer.on('news', (event, arr) => {
      let ip = arr.ip;
      if (! this.state.state.socket[ip]) {
        this.props.onNewAddChat(arr);
      } else {
        let array = JSON.parse(localStorage[arr.ip]);
        array.push({
          ip: arr.ip,
          message: arr.message,
          date: utils.getDate()
        });
        localStorage[arr.ip] = JSON.stringify(array);
        if (ip !== this.props.nowIp) {
          console.log(ip);
          localStorage[ip + 'unread'] = 200;
          this.props.onUnread();
        }
        this.setState({
          val: arr.message
        });
      }
    });
  }

  onSendMessage(val) {
    let arr = JSON.parse(localStorage[this.props.nowIp]);
    let mess = {
      ip: 0,
      message: val,
      date: utils.getDate()
    };
    arr.push(mess);
    localStorage[this.props.nowIp] = JSON.stringify(arr);
    this.setState({
      val: val
    });
    mess.ip = this.props.nowIp;
    console.log(mess);
    client.send(this.props.nowIp, mess);
  }

  render() {
    return (
      <div className="home" >
        <Chatlog nowIp={this.props.nowIp} />
        <Typing nowIp={this.props.nowIp} onSendMessage={this.onSendMessage.bind(this)} />
      </div>
    );
  }
}
