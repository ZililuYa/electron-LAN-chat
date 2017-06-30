import React, { Component } from 'react';
import $ from 'jquery';

export default class Typing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expr: 'expr'
    }
  }

  choiceBq(va) {
    this.refs.text.value += va;
    $('.exprMain').hide();
    this.setState({
      expr: 'expr'
    });
  }

  decodeUnicode() {
    let html = [];
    for (let i = 0; i <= 255; i++) {
      let t = i.toString(16);
      if (t.length < 2) {
        t = '0' + t;
      }
      let str = '\\ud83d\\ude' + t;
      // let str = '\\ud83c\\udf' + t;
      str = str.replace(/\\/g, "%");
      str = unescape(str);
      html.push(
        <a key={i} onClick={this.choiceBq.bind(this, str)}>{str}</a>
      )
    }

    // str = str.replace(/\\/g, "%");
    // return unescape(str);
    return html;
  }

  render() {
    return (
      <div className="typing">
        <div className="exprMain">
          {this.decodeUnicode()}
        </div>
        <a className={this.state.expr} ref="expr">😃</a>
        <textarea className="textarea" ref="text" placeholder="Say Something ?"></textarea>
      </div>
    );
  }

  componentDidMount() {
    let test = this.refs.text;
    let expr = this.refs.expr;
    test.onkeydown = (e) => {
      send(e);
    }
    let send = (e) => {
      let code;
      if (!e) var e = window.event;
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
    let activeBq = () => {
      console.log(this.state.expr === 'expr', this.state.expr);
      if (this.state.expr === 'expr') {
        $('.exprMain').show();
        this.setState({
          expr: 'expr active'
        });
      } else {
        $('.exprMain').hide();
        this.setState({
          expr: 'expr'
        });
      }
      // expr.className === 'expr' ? expr.className === 'expr active' : expr.className === 'expr';
    }
    expr.onclick = () => activeBq();
  }
}
