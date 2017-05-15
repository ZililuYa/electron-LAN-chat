// @flow
import React, { Component } from 'react';
import Tbutton from  './Tbutton';

export default class Header extends Component {

  onTextChange() {
    // this.props.callbackParent(newState);
    this.props.onRunSearch(this.refs.search.value);
  }

  addIp() {
    this.refs.input.style.display = 'inherit';
  }

  qdAddIp() {
    let val = this.refs.val.value.trim();
    if (! isNaN(val) && val > 0 && val <= 255) {
      this.props.onSocketAccept(val);
      this.refs.val.value = '';
      this.refs.input.style.display = 'none';
    } else {
      console.log('error');
    }
  }

  render() {

    // console.log(this.props);
    // const {increment, incrementIfOdd, incrementAsync, decrement, counter} = this.props;
    // console.log(increment, incrementIfOdd);

    return (
      <div className="header" id="header" >

        <div className="inputIp" ref="input" >
          <div className="inputMain" >
            <input type="text" ref="val" className="in" placeholder="请输入ip后缀，0 - 255" maxLength="3" />
            <button className="btn" onClick={this.qdAddIp.bind(this)} >确 定</button>
          </div>
        </div>

        <div className="search" >
          <i className="fa fa-search hea" ></i>
          <input type="text" className="input" ref="search" placeholder="search" onChange={this.onTextChange.bind(this)} />
        </div>
        <div className="addIp" >
          <a className="pull" onClick={this.addIp.bind(this)} >
            <i className="fa fa-plus" ></i>
          </a>
        </div>
        <Tbutton />
      </div>
    );
  }
}
