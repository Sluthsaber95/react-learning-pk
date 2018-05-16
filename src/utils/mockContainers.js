import React, { Component, PureComponent } from 'react';
export class ContainerEmpty extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (<div></div>);
  }
}
export class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
export class Message extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "Anthony"
    }
  }
  render() {
    return (
      <div>
        <Greeting name={this.state.name} />
      </div>
    )
  }
}
export class PureGreeting extends PureComponent {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
export class PureMessage extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      name: "Anthony"
    }
  }
  render() {
    return (
      <div>
        <Greeting name={this.state.name} />
      </div>
    )
  }
}