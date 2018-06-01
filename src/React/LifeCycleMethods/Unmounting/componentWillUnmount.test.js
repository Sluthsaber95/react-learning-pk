import React, { Component } from 'react';
import ReactDOM from 'react-dom/cjs/react-dom.development';
import context from 'jest-plugin-context';
import { mount, unmount } from 'enzyme'; // 348 K
import sinon from 'sinon';
import '../../../enzyme-setup'

import { Greeting } from '../../../utils/mockContainers'

describe('Testing out the componentWillUnmount lifecycle method>', () => {
  context('componentWillUnmount', () => {
    it('testing invocation of componentWillUnmount()', () => {
      class GageWillUnmount extends Component {
        componentWillUnmount(){ return null }
        render(){
          return (
          <div></div>
          )
        }
      }
      const spyWillUnmount = sinon.spy(GageWillUnmount.prototype, "componentWillUnmount");
      expect(spyWillUnmount.called).toBe(false);
      
      const wrapper = mount(<GageWillUnmount />);
      expect(spyWillUnmount.called).toBe(false);
      
      wrapper.unmount()
      expect(spyWillUnmount.called).toBe(true);

      // this 
      expect(spyWillUnmount.returnValues[0]).toBe(null)
    });
    it('testing invocation of componentWillUnmount() with componentDidMount', () => {
      /*
        Please note that the results shown here are the same as
        'testing invocation of componentWillUnmount()'
      */
      class GageWillUnmount extends Component {
        componentDidMount(){ }
        componentWillUnmount(){ }
        render(){
          return (
          <div></div>
          )
        }
      }
      const spyWillUnmount = sinon.spy(GageWillUnmount.prototype, "componentWillUnmount");
      const spyDidMount = sinon.spy(GageWillUnmount.prototype, "componentDidMount");
      expect(spyWillUnmount.called).toBe(false);
      expect(spyDidMount.called).toBe(false);
      
      const wrapper = mount(<GageWillUnmount />);
      expect(spyWillUnmount.called).toBe(false);
      expect(spyDidMount.called).toBe(true);
      
      wrapper.unmount()
      expect(spyWillUnmount.called).toBe(true);
      expect(spyDidMount.called).toBe(true);
    });
    it('Test Case 1: With setInterval', () => {
      // Example by Teoman shipahi - https://stackoverflow.com/questions/40760308/reactjs-how-to-properly-use-componentwillunmount
      class GageWillUnmount extends Component {
        constructor(props) {
          super(props);
          this.state = {
            date: new Date()
          };
        }
        tick() {
          this.setState({
            date: new Date()
          });
        }
        componentDidMount() {
          this.timerID = setInterval(() => {
            this.tick();
          }, 1000);
        }
        // These methods are called "lifecycle hooks".
        componentWillUnmount() {
          clearInterval(this.timerID);
        }
        render() {
          return (
            <div>It is {this.state.date.toLocaleTimeString()}.</div>
          );
        }
      }
      const spyWillUnmount = sinon.spy(GageWillUnmount.prototype, "componentWillUnmount");
      const spyDidMount = sinon.spy(GageWillUnmount.prototype, "componentDidMount");
      expect(spyWillUnmount.called).toBe(false);
      expect(spyDidMount.called).toBe(false);
      
      const wrapper = mount(<GageWillUnmount />);
      expect(spyWillUnmount.called).toBe(false);
      expect(spyDidMount.calledOnce).toBe(true);
      expect(wrapper.state().date).toBeTruthy() // similar to new Date()

      wrapper.unmount()
      expect(spyWillUnmount.calledOnce).toBe(true);
      expect(spyDidMount.calledOnce).toBe(true);
      expect(wrapper.html()).toBe(null)
    });
    it('Test Case 2: With document and event listeners', () => {
      // Example by Teoman shipahi - https://stackoverflow.com/questions/40760308/reactjs-how-to-properly-use-componentwillunmount
      class GageWillUnmount extends Component {
        constructor(props) {
          super(props);
          this.openMenu = this.openMenu.bind(this);
          this.closeMenu = this.closeMenu.bind(this);
        }

        componentDidMount() {
          document.addEventListener("click", this.closeMenu);
        }

        componentWillUnmount() {
          document.removeEventListener("click", this.closeMenu);
        }

        openMenu() {
        }

        closeMenu() {
        }

        render() {
          return (
            <div>
              <a
                href="javascript:void(0)"
                className="closebtn"
                onClick={this.closeMenu}
              >
                ×
              </a>
            <div>
                Some other structure
            </div>
          </div>
          );
        }
      }
      const spyWillUnmount = sinon.spy(GageWillUnmount.prototype, "componentWillUnmount");
      const spyDidMount = sinon.spy(GageWillUnmount.prototype, "componentDidMount");
      const spyOpenMenu = sinon.spy(GageWillUnmount.prototype, "openMenu");
      const spycloseMenu = sinon.spy(GageWillUnmount.prototype, "closeMenu");

      expect(spyWillUnmount.called).toBe(false);
      expect(spyDidMount.called).toBe(false);
      
      const wrapper = mount(<GageWillUnmount />);
      expect(spyWillUnmount.called).toBe(false);
      expect(spyDidMount.calledOnce).toBe(true);
      expect(wrapper.state()).toBe(null);
      expect(JSON.stringify(wrapper.props())).toBe("{}");
      expect(spyOpenMenu.called).toBe(false)
      expect(spycloseMenu.called).toBe(false)
      
      wrapper.find('a').simulate('click')
      expect(spyOpenMenu.called).toBe(false)
      expect(spycloseMenu.called).toBe(true)
      
      wrapper.unmount()
      expect(spyWillUnmount.calledOnce).toBe(true);
      expect(spyDidMount.calledOnce).toBe(true);
      expect(wrapper.html()).toBe(null)
    });
  })
})