import React, { Component } from 'react';
import ReactDOM from 'react-dom/cjs/react-dom.development';
import context from 'jest-plugin-context';
import { mount } from 'enzyme'; // 348 K
import sinon from 'sinon';
import '../../../enzyme-setup'

import { Message, Greeting } from '../../../utils/mockContainers';

const fakeApi = { 
  "name": " Toby" 
}

describe('Testing out the componentDidMount lifecycle method', () => {
  context('componentDidMount', () => {
    class UserProfile extends Component {
      state = {
        userInfo: null
      }
      componentDidMount(){
        this.setState({ userInfo: fakeApi })
      }
      render() {
        return (
          <div>
            <h1>Name: 
              {
                this.state.userInfo
                ? this.state.userInfo.name
                : this.state.userInfo
              }
            </h1>
          </div>);
      }
    }
    it('testing componentDidMount() on values returned', () => {
      const spyDidMount = sinon.spy(UserProfile.prototype, "componentDidMount")
      expect(spyDidMount.called).toBe(false)
      
      const wrapper = mount(<UserProfile />)
      const html = "<div><h1>Name: Toby</h1></div>"
      expect(wrapper.html()).toBe(html)
      expect(spyDidMount.called).toBe(true)
    });
  })
})