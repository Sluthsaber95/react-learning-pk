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
export class Respondent extends Component {
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

export class ViewedIndicator extends Component {
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