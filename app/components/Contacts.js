// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowIp: props.nowIp,
      contacts: props.contacts
    };
  }

  userClick(i) {
    this.setState({
      num: i
    })
  }

  render() {
    let items = [];
    // let sea = this.props.search;

    this.state.contacts.forEach((x, y) => {
      // if (x.ip.indexOf(sea) !=  -1 ||x.name.indexOf(sea) != - 1)
      items.push(
        <div className={this.state.nowIp == x ? "user active" : "user"} onClick={ this.userClick.bind(this, x) }>
          <div className="img">
            <img src={localStorage[x + 'tx']} className="img" alt="" />
          </div>
          <div className="name">
            {x}
          </div>
          <div className="hr"></div>
        </div>
      );

    });
    return (
      <div className="contacts" id="contacts">
        { items }
      </div>
    );
  }
}
