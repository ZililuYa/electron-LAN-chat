// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Counter extends Component {
  props: {
    increment: () => void,
    incrementIfOdd: () => void,
    incrementAsync: () => void,
    decrement: () => void,
    counter: number
  };

  render() {
    const {increment, incrementIfOdd, incrementAsync, decrement, counter} = this.props;
    return (
      <div>
        <div className="" data-tid="backButton" >
          <Link to="/" >
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className="" data-tid="counter" >
          {counter}
        </div>
        <div className="" >
          <button className="" data-tclass="btn" >
            <i className="fa fa-plus" />
          </button>
          <button className="" onClick={decrement} data-tclass="btn" >
            <i className="fa fa-minus" />
          </button>
          <button className="" onClick={incrementIfOdd} data-tclass="btn" >odd</button>
          <button className="" onClick={() => incrementAsync()} data-tclass="btn" >async</button>
        </div>
      </div>
    );
  }
}

export default Counter;
