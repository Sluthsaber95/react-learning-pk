import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom/cjs/react-dom.development';
import context from 'jest-plugin-context';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme'; // 348 K
import sinon from 'sinon';
import '../enzyme-setup'

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState({
      display: !this.state.display
    });
  }
  render() {
    return (
      <Fragment>
        <div className="text-box">
          { this.state.display && <p>Now you see me</p>}
        </div>
        <button onClick={this.toggleDisplay}>Toggle Display</button>
      </Fragment>
    )
  }
}

describe('Testing out the <TextBox />', () => {
  context('<TextBox />', () => {
    it('<TextBox /> renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<TextBox />, div);
      ReactDOM.unmountComponentAtNode(div);
      const parentWrapper = shallow(<TextBox />)
      expect(parentWrapper.exists()).toBe(true);
    });
    it('<TextBox /> button toggles display of "<p>Now you see me</p>"', () => {
      const spy = sinon.spy(TextBox.prototype, "toggleDisplay");
      const wrapper = shallow(<TextBox />);
      
      expect(<p>Now you see me</p>).toBeTruthy();
      expect(wrapper.find('p').exists()).toBe(true)
      expect(wrapper.find('p').html()).toBe("<p>Now you see me</p>")
      expect(wrapper.state().display).toBe(true)
      expect(spy.notCalled).toBe(true);
      
      wrapper.find('button').simulate('click')
      expect(spy.calledOnce).toBe(true);
      expect(wrapper.state().display).toBe(false)
      expect(wrapper.find('p').exists()).toBe(false)
    });
  })
})