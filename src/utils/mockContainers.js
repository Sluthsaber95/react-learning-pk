import React, { Component, PureComponent } from 'react';
class ContainerEmpty extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (<div></div>);
  }
}
class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
class Message extends Component {
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
class PureGreeting extends PureComponent {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
class PureMessage extends PureComponent {
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
class Respondent extends Component {
  constructor(props) {
    super(props)
  }
  render (){
    return (
      <div>
        { 
          this.props.children
          ? React.cloneElement(this.props.children, {...this.props})
          : <ViewedIndicator {...this.props}/>
        } 
      </div>
    )
  }
}

class ViewedIndicator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: "Green"
    }
  }
  render(){
    this.props.respondentSeen 
      ? this.state.backgroundColor = "Green" 
      : this.state.backgroundColor = "Red"
    const circleRadius = '10px'
    const indicatorStyle = {
      width: circleRadius,
      height: circleRadius,
      borderRadius: '50%',
      backgroundColor: this.state.backgroundColor
    }
    return (<div style={indicatorStyle}></div>)
  }
}
export {
  ContainerEmpty,
  Greeting,
  Message,
  PureGreeting,
  PureMessage,
  Respondent,
  ViewedIndicator
}