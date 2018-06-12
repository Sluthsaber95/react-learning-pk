import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom/cjs/react-dom.development';
import context from 'jest-plugin-context';
import PropTypes from 'prop-types';
import { shallow, mount, unmount } from 'enzyme'; // 348 K
import sinon from 'sinon';
import '../enzyme-setup'

class ParentComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'A man has no name'
    }
    this.acceptString = this.acceptString.bind(this);
  }
  acceptString(childState){
    this.setState({ name: childState})
  }
  render(){
    return (
      <Fragment>
        <ChildComponent acceptString={this.acceptString}/>
        <p>{this.state.name}</p>
      </Fragment>
    )
  }
}
class ChildComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'Steve'
    }
    this.handleString = this.handleString.bind(this);
  }
  handleString(){
    this.props.acceptString(this.state.name)
  }
  render(){
    return (
      <button onClick={this.handleString}></button>
    )
  }
}

describe('Testing out the <ControlledComponent />', () => {
  context('<ControlledComponent />', () => {
    it('<ControlledComponent /> renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<ParentComponent />, div);
      ReactDOM.unmountComponentAtNode(div);
      const parentWrapper = mount(<ParentComponent />)
      expect(parentWrapper.exists()).toBe(true);
      expect(parentWrapper.find('button').exists()).toBe(true);
    });
    it('<ChildComponent /> passes state.name to <p> tag in <ParentComponent /> ', () => {
      const spy = sinon.spy(ParentComponent.prototype, "acceptString");
      const parentWrapper = mount(<ParentComponent />);
      const childWrapper = mount(<ChildComponent />);
      const oldString = 'A man has no name';
      const newString = 'Steve';
      
      expect(parentWrapper.state().name).toBe(oldString)
      expect(parentWrapper.find('p').html()).toBe(`<p>${oldString}</p>`);

      parentWrapper.find('button').simulate('click')
      expect(spy.called).toBe(true);
      expect(parentWrapper.state().name).toBe(childWrapper.state().name);
      expect(parentWrapper.find('p').html()).toBe(`<p>${newString}</p>`);
    });
  })
})