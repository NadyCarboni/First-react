import P from "prop-types";
import "./style.css";
import React, { Component } from "react";

export class Button extends Component {
  render() {
    const { text, onClick, disabled } = this.props;
    return (
      <div className="button-container">
        <button className="button" onClick={onClick} disabled={disabled}>
          {text}
        </button>
      </div>
    );
  }
}
Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
