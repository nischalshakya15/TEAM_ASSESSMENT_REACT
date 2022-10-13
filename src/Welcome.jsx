import React from "react";
import Name from "./Name";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("Nischal Shakya");
  }

  render() {
    return (
      <div>
        <h1>First react component.</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
        <button onClick={this.handleClick}>Click Me</button>
        <Name name="Uzumaki Naruto"></Name>
      </div>
    );
  }
}

export default Welcome;
