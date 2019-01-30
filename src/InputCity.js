import React, { Component } from "react";
//import 'bootstrap/dist/css/bootstrap.css';


class InputCity extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.callBack(this.input.value);
  }

  weatherSomeFn = () => {
    this.props.callbackFromParent2(this.input.value);
  };

  callBack = () => {
    this.props.callbackFromParent(this.input.value);
  };

  render() {
    return (
      <div className="component">
        <h1 text-alighn="center">Input The City You Would Like To See The Weather For</h1>
        <form>
          <input onChange={this.onChange} ref={input => (this.input = input)} />
          <div><button onClick={this.onSubmit}>Submit</button></div>
        </form>
      </div>
    );
  }
}

export default InputCity;
