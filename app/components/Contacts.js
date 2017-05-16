// @flow
import React, { Component } from 'react';
import utils from '../utils/utils';


export default class Contacts extends Component {
  userClick(i) {
    if (i === this.props.nowIp)
      return false;
    // this.setState({
    //   nowIp: i
    // });
    this.props.onToggleChat(i);
  }

  render() {
    let items = [];
    // let sea = this.props.search;
    this.props.contacts.forEach((x, y) => {
      // console.log(this.props.nowIp, x);
      // if (x.ip.indexOf(sea) !=  -1 ||x.name.indexOf(sea) != - 1)
      items.push(
        <div key={y} className={this.props.nowIp === x ? "user active" : "user"} onClick={ this.userClick.bind(this, x) } >
          <div className="img" >
            <img src={localStorage[x + 'tx']} className="img" alt="" />
          </div>
          <div className="name" >
            {x.replace(utils.IpQz + '.', '')}
          </div>
          <div className="hr" ></div>
        </div>
      );
    });
    return (
      <div className="contacts" id="contacts" >
        { items }
      </div>
    );
  }
}
