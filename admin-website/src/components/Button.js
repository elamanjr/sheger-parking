import React, { Component } from 'react';
import '../css/login.css'




export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: this.props.bgColor,
      color: this.props.color,
      type: this.props.type,
      id: this.props.id,
      name: this.props.name,
      width : this.props.width,
      class : this.props.className,
      onclick: this.props.onclick
    };
  }

  componentDidMount = () => {
    document.getElementById(this.state.id).style.backgroundColor =
      this.state.bgColor;
    var button =document.getElementById(this.state.id)
    button.style.color = this.state.color;
    document.getElementById(this.state.id).style.width = this.state.width;

  };

  render() {
    return (
      <button
        type={this.state.type}
        id={this.state.id}
        className={this.state.class}
        onClick={this.state.onclick}
        
      >
        {this.state.name}
      </button>
    );
  }
}
