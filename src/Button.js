import React from "react";
import classNames from "classnames";
import "./Button.css";

const { Component } = require("react");

class Button extends Component {
  constructor(props) {
    super(props);
    this.HandleClick = this.HandleClick.bind(this);
  }

  HandleClick(ev) {
    this.props.flipCellsAroundMe();
    let currentValue = this.props.isLit;

    console.log("The current value is:" + currentValue);
    this.setState({ value: currentValue });
  }

  render() {
    var btnClass = classNames({
      lightOnStyle: this.props.Text === 1,
      lightOffStyle: this.props.Text === 0
    });

    return <td className={btnClass} onClick={this.HandleClick}></td>;
  }
}

export default Button;
