import React, { Component } from 'react';
import ReactDOM from 'react-dom/cjs/react-dom.development';
import context from 'jest-plugin-context';
import { shallow, mount, unmount } from 'enzyme'; // 348 K
import sinon from 'sinon';
import '../../enzyme-setup';


describe('Testing out the shouldComponentUpdate lifecycle method', () => {
  context('shouldComponentUpdate', () => {
    it('testing shouldComponentUpdate(nextProps, nextState) on values returned', () => {
      class ToggleSwitch extends Component {
        constructor(props){
          super(props);
          this.state = {
            toggleNewText: true
          }
          this.changeText = this.changeText.bind(this);
        }
        shouldComponentUpdate(nextProps, nextState){
          return this.state !== nextState;
        }
        changeText(){
          this.setState({ toggleNewText: !this.state.toggleNewText})
        }
        render(){
          return (
            <button onClick={this.changeText}>
            {
              this.state.toggleNewText
              ? "New Text" 
              : "Old Text"
            }
            </button>
          )
        }
      }
      const spyUpdate = sinon.spy(ToggleSwitch.prototype, "shouldComponentUpdate")
      const spyRender = sinon.spy(ToggleSwitch.prototype, "render")
      expect(spyRender.notCalled).toBe(true)
      expect(spyUpdate.notCalled).toBe(true)

      const wrapper = mount(<ToggleSwitch />)
      expect(spyRender.calledOnce).toBe(true)
      expect(spyUpdate.notCalled).toBe(true)
      
      const toggleNewText = wrapper.state().toggleNewText;
      const changingState = [{}, { toggleNewText: true }, { toggleNewText: false }];
      const newStateChange = changingState[Math.floor(Math.random() * 3)];
      wrapper.setState(newStateChange);
      console.log("newState: " + JSON.stringify(newStateChange.toggleNewText));

      // Note: Returning false does not prevent child components from re - rendering when their state changes.
      // Should component here updates the displayed DOM with only the parts that have changed
      expect(spyUpdate.calledOnce).toBe(true)
      expect(spyRender.calledTwice).toBe(true)
      expect(spyRender.calledBefore(spyUpdate)).toBe(true)
      expect(spyUpdate.returned(false)).toBe(false)
    });
  })
})