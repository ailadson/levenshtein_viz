"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import EditDistance from './levenshtein_distance';

import Animator from './animator.jsx';
import Config from './config.jsx';

class Main extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      str1 : '',
      str2 : '',
      animating : false,
      steps : '',
      speed : 1500,
      costs : { M : 0, D : 1, I : 1, S : 1 }
    };

    let c = this.state.costs;

    this.e = new EditDistance({
      indel (char) { return c.I },
      match (char1, char2) { return (char1 === char2 ? c.M : c.S) }
    });

    this.onStrChange = this.onStrChange.bind(this);
    this.calcDistance = this.calcDistance.bind(this);
    this.setParams = this.setParams.bind(this);
    this.done = this.done.bind(this);
  }

  onStrChange (str, e) {
    let o = {};
    o[str] = e.currentTarget.value;
    this.setState(o);
  }

  calcDistance () {
    let steps = this.e.getDistance(" " + this.state.str1, " " + this.state.str2);
    this.setState({ animating: true, steps });
  }

  done () {
    this.setState({ str1 : '', str2 : '', animating : false, steps : '' });
  }

  setParams (config) {
    if (config.useFunction) {
      let indel = eval(`(function(){ return function(char){\n${config.indelFunc}\n} })()`);
      let match = eval(`(function(){ return function(char1, char2){\n${config.matchFunc}\n} })()`);

      this.e = new EditDistance({ indel, match });
    } else {
      this.e = new EditDistance({
        indel (char) { return config.indel },
        match (char1, char2) { return (char1 === char2 ? config.match : config.switch) }
      });
    }
  }

  renderAnimator () {
    if (this.state.animating) {
      return (
        <Animator
            from={this.state.str1}
            to={this.state.str2}
            steps={this.state.steps}
            speed={this.state.speed}
            done={this.done}
            costs={this.state.costs} />
      )
    } else {
      return (
        <Config setParams={this.setParams}/>
      )
    }
  }

  render () {
    return(
      <div className="container">
        <div className="top">
          <div className="inputs">
            <input type="text" placeholder="String 1" onChange={this.onStrChange.bind(0, 'str1')} value={this.state.str1}/>
            <input type="text" placeholder="String 2" onChange={this.onStrChange.bind(0, 'str2')} value={this.state.str2}/>
          </div>
          <button type="button" id="btn" onClick={this.calcDistance}>Get Distance</button>
        </div>
        {this.renderAnimator()}
      </div>
    );
  }
}

ReactDOM.render(<Main></Main>, document.getElementById('root'));

// let str1 = document.getElementById('str1');
// let str2 = document.getElementById('str2');
// let btn = document.getElementById('btn');
//
