import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export class ModalBackdrop extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div></div>
  }
}
export class ModalWrap extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}
export class ModalDialog extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>{this.props.children}</div>
  }
}
export class ModalContent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>{this.props.children}</div>
  }
}