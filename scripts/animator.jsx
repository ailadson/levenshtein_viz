"use strict";

import React from 'react';


export default class Animator extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      currentStr : this.props.from.split(''),
      currentStep : -1,
      currentFromChar : 0,
      currentToChar : 0
    }

    this.interval = setInterval(() => {
      let { steps, to, done } = this.props;
      let { currentStep, currentFromChar, currentToChar, currentStr } = this.state;

      if(currentStep++ >= steps.length - 1) {
        clearInterval(this.interval);
        setTimeout(() => {
          done();
        }, 2000)
      }

      let step = steps[currentStep];
      let nextStr = currentStr;

      switch (step) {
        case 'M':
          currentFromChar++;
          currentToChar++;
          break;
        case 'S':
          nextStr.splice(currentFromChar, 1, to[currentToChar]);
          currentFromChar++;
          currentToChar++;
          break;
        case 'I':
          nextStr.splice(currentFromChar, 0, to[currentToChar]);
          currentToChar++;
          currentFromChar++;
          break;
        case 'D':
          nextStr.splice(currentFromChar, 1, '');
          currentFromChar++;
          break;
      }

      this.setState({ currentStr : nextStr, currentStep , currentFromChar, currentToChar});
    }, props.speed);
  }

  renderCurrentStr () {
    let { currentStr, currentFromChar } = this.state;

    let letters = currentStr.map((char, i) => {
    let className = (i === currentFromChar ? "letter selected" : "letter");

      return(
        <span key={i} className={className}>{char}</span>
      );
    });

    let tracker = currentStr.map((char, i) => {
      return(
        <span key={i} className="letter">
          {i === currentFromChar ? "^" : "-"}
        </span>
      );
    });

    return(
      <div>
        {letters}
        <br/>
        {tracker}
      </div>
    );
  }

  renderCurrentStep (step) {
    let dict = { M : "Match", I : "Insert", D : "Delete", S : 'Switch' };
    return dict[step];
  }

  render () {
    let { currentStep } = this.state;
    let { steps } = this.props;

    let className = 'animator';
    className += (currentStep > -1 ? ' visible' : '')

    return(
      <div>
        <div className={className}>
          <h1>{this.renderCurrentStr()}</h1>
          <h1>{this.renderCurrentStep(steps[currentStep])}</h1>
        </div>
      </div>
    );
  }
}
