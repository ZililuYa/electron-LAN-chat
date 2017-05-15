// @flow
import React, { Component } from 'react';
import Typing from './Typing';
import Chatlog from './Chatlog';
import utils from '../utils/utils';
import { ipcRenderer } from 'electron';


export default class Home extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = props;
    ipcRenderer.on('news', (event, arr) => {
      let array = JSON.parse(localStorage[arr.ip]);
      array.push({
        ip: arr.ip,
        message: arr.val,
        date: utils.getDate()
      });
      localStorage[arr.ip] = JSON.stringify(array);
      this.setState({
        val: arr.val
      });
    });
  }

  onSendMessage(val) {
    let arr = JSON.parse(localStorage[this.state.nowIp]);
    arr.push({
      ip: 0,
      message: val,
      date: utils.getDate()
    });
    localStorage[this.state.nowIp] = JSON.stringify(arr);
    this.state.state.socket[this.state.nowIp].emit('news', {
      ip: this.state.nowIp,
      val: val
    });

    this.setState({
      val: val
    });
  }

  render() {
    return (
      <div className="home" >
        <Chatlog nowIp={this.state.nowIp} />
        <Typing nowIp={this.props.nowIp} onSendMessage={this.onSendMessage.bind(this)} />
      </div>
    );
  }
}
