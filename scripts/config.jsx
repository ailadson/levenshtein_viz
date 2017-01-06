"use strict";

import React from 'react';


export default class Config extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      useFunction : false,
      indelFunc : "//By default, returns 1 regardless of char\nreturn 1;",
      matchFunc : "return (char1 === char2 ? 0 : 1);",
      match : 0, switch : 1, indel : 1
    };

    this.useFunction = this.useFunction.bind(this);
    this.onIndelFuncChange = this.onIndelFuncChange.bind(this);
    this.onMatchFuncChange = this.onMatchFuncChange.bind(this);
    this.onMatchChange = this.onMatchChange.bind(this);
    this.onSwitchChange = this.onSwitchChange.bind(this);
    this.onIndelChange = this.onIndelChange.bind(this);
    this.setParams = this.setParams.bind(this);
  }

  onIndelFuncChange (e) {
    this.setState({ indelFunc : e.currentTarget.value });
  }

  onMatchFuncChange (e) {
    this.setState({ matchFunc : e.currentTarget.value });
  }

  onMatchChange (e) {
    this.setState({ match : parseInt(e.currentTarget.value) });
  }

  onSwitchChange (e) {
    this.setState({ switch : parseInt(e.currentTarget.value) });
  }

  onIndelChange (e) {
    this.setState({ indel : parseInt(e.currentTarget.value) });
  }

  useFunction () {
    this.setState({ useFunction : !this.state.useFunction })
  }

  setParams () {
    this.props.setParams(this.state);
  }

  renderConfig () {
    let { useFunction } = this.state;

    if (!useFunction) {
      return(
        <div>
          Match: <input type="number"
                             value={this.state.match}
                             onChange={this.onMatchChange}/>
                           <br/>
          Switch: <input type="number"
                             value={this.state.switch}
                             onChange={this.onSwitchChange} />
                           <br/>
          Insert/Delete: <input type="number"
                             value={this.state.indel}
                             onChange={this.onIndelChange} />
                           <br/>
         </div>
      );
    } else {
      return(
        <div>
          <div>
            Indel (char) &#123;
            <div>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea
                                        value={this.state.indelFunc}
                                        rows="7"
                                        cols="35"
                                        onChange={this.onIndelFuncChange}></textarea>
            </div>
            &#125;
          </div>
          <div>
            Match (char1, char2) &#123;
            <div>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea
                                        value={this.state.matchFunc}
                                        rows="7"
                                        cols="35"
                                        onChange={this.onMatchFuncChange}></textarea>
            </div>
            &#125;
          </div>

          <button onClick={this.setParams}>Set Configuration</button>
        </div>
      );
    }
  }

  render () {
    return(
      <div className="config-container">
        <div>
          Use Function: <input type="checkbox" onChange={this.useFunction} />
        </div>
        {this.renderConfig()}
      </div>
    );
  }
}
