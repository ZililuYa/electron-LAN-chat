import React, { Component } from 'react';

export default class Typing extends Component {
  constructor(props) {
    super(props);
  }

  decodeUnicode() {
    let html = '';
    for (let i = 1; i <= 255; i ++) {
      let t = i;
      if (t < 10)
        t = "0" + t;
      let str = '\\ud83d\\ude' + t;
      str = str.replace(/\\/g, "%");
      html += unescape(str);
      html += t;
    }

    // str = str.replace(/\\/g, "%");
    // return unescape(str);
    return html;
  }


  render() {
    return (
      <div className="typing" >
        <a className="expr" >😃</a>
        <textarea className="textarea" ref="text" placeholder="Say Something ?" ></textarea>
      </div>
    );
  }

  componentDidMount() {
    let test = this.refs.text;
    test.onkeydown = (e) => {
      send(e);
    }
    let send = (e) => {
      let code;
      if (! e) var e = window.event;
      if (e.keyCode) code = e.keyCode;
      else if (e.which) code = e.which;
      if (code === 13 && window.event) {
        if (test.value.trim()) {
          this.props.onSendMessage(test.value.trim());
          test.value = "";
        }
        e.returnValue = false;
      } else if (code === 13) {
        e.preventDefault();
      }
    }
  }
}
