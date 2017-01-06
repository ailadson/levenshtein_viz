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

    this.cost = 0;
    this.renderCurrentStep = this.renderCurrentStep.bind(this);

    this.interval = setInterval(() => {
      let { steps, to, done } = this.props;
      let { currentStep, currentFromChar, currentToChar, currentStr } = this.state;

      if(currentStep++ >= steps.length - 1) {
        clearInterval(this.interval);
        setTimeout(() => {
          this.cost = 0;
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
    this.cost += this.props.costs[step] || 0;

    return `Current Cost: ${this.cost}  | Current Move: ${(dict[step] || "done")}`;
  }

  render () {
    let { currentStep } = this.state;
    let { steps } = this.props;

    let className = 'animator';
    className += (currentStep > -1 ? ' visible' : '')

    return(
      <div className="anim-container">
        <div className={className}>
          <div className="current c-string">
            {this.renderCurrentStr()}
          </div>
          <div className="current-step">
            {this.renderCurrentStep(steps[currentStep])}
          </div>
        </div>
      </div>
    );
  }
}
