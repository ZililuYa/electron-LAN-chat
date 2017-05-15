import React, { Component } from 'react';
import {ipcRenderer} from 'electron';

export default class Tbutton extends Component {
  btnMin() {
    ipcRenderer.send('min', '');
  }

  btnMax() {
    ipcRenderer.send('max', '');
  }

  btnClosd() {
    ipcRenderer.send('close', '');
  }

  render() {
    return (
      <div className="Tbutton">
        <a onClick={this.btnMin} className="btn i1"></a>
        <a onClick={this.btnMax} className="btn i2"></a>
        <a onClick={this.btnClosd} className="btn i3"></a>
      </div>
    );
  }
}
