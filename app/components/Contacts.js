import React, { Component } from 'react';
import utils from '../utils/utils';

export default class Contacts extends Component {
  userClick(i) {
    if (i === this.props.nowIp)
      return false;
    this.props.onToggleChat(i);
  }

  unread() {
    this.setState({});
  }

  render() {
    let items = [];
    this.props.contacts.forEach((x, y) => {
      items.push(
        <div key={y} className={this.props.nowIp === x ? "user active" : "user"} onClick={ this.userClick.bind(this, x) } >
          <div className={localStorage[x + 'unread'] === '200' ? "img shake-rotate shake-constant" : "img"} >
            <div className={"div" + localStorage[x + 'tx']} alt="" ></div>
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
