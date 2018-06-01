import React, { Component } from 'react';
import ReactDOM from 'react-dom/cjs/react-dom.development';
import context from 'jest-plugin-context';
import { shallow, mount, unmount } from 'enzyme'; // 348 K
import sinon from 'sinon';
import '../../../enzyme-setup'

describe('Testing out the componentDidUpdate()', () => {
  context('componentDidUpdate() not inconjunction with any methods', () => {
    it('testing when componentDidUpdate() => undefined', () => {
      class GaugeDidUpdate extends Component {
        state = {
          attemptUpdate: false
        }
        componentDidUpdate(){ }
        render() {
          return <div>{this.props.header}</div>
        }
      }
      const spy =  sinon.spy(GaugeDidUpdate.prototype, "componentDidUpdate");
      const wrapper = mount(<GaugeDidUpdate />)
      const newHeader = "Header has been altered"
      expect(spy.notCalled).toBe(true)
      
      wrapper.setState({ attemptUpdate: true})
      expect(spy.calledOnce).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [undefined]
      
      wrapper.setProps({ header: "I should see this"})
      expect(spy.calledTwice).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [undefined, undefined]
      
      wrapper.setState({ attemptUpdate: true})
      wrapper.setProps({ header: newHeader})
      expect(spy.callCount).toBe(4)
      expect(wrapper.html()).toBe(`<div>${newHeader}</div>`)
    });
    it('testing when componentDidUpdate() => null', () => {
      class GaugeDidUpdate extends Component {
        state = {
          attemptUpdate: false
        }
        componentDidUpdate(){ 
          return null
        }
        render() {
          return <div>{this.props.header}</div>
        }
      }
      const spy =  sinon.spy(GaugeDidUpdate.prototype, "componentDidUpdate");
      const wrapper = mount(<GaugeDidUpdate />)
      const newHeader = "Header has been altered"
      expect(spy.notCalled).toBe(true)
      
      wrapper.setState({ attemptUpdate: true})
      expect(spy.calledOnce).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [null]
      
      wrapper.setProps({ header: "I should see this"})
      expect(spy.calledTwice).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [null, null]
      
      wrapper.setState({ attemptUpdate: true})
      wrapper.setProps({ header: newHeader})
      expect(spy.callCount).toBe(4)
      expect(wrapper.html()).toBe(`<div>${newHeader}</div>`)
    });
  })
  context('componentDidUpdate() inconjunction shouldComponentUpdate()', () => {
    it('testing componentDidUpdate() => undefined, shouldComponentUpdate => false', () => {
      class GaugeDidUpdate extends Component {
        state = {
          attemptUpdate: false
        }
        shouldComponentUpdate() {
          return false
        }
        componentDidUpdate() {

        }
        render() {
          return <div>{this.props.header}</div>
        }
      }
      const spy = sinon.spy(GaugeDidUpdate.prototype, "componentDidUpdate");
      const wrapper = mount(<GaugeDidUpdate />)
      const newHeader = "Header has been altered"
      expect(spy.notCalled).toBe(true)

      wrapper.setState({ attemptUpdate: true })
      expect(spy.notCalled).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [undefined]

      wrapper.setState({ attemptUpdate: true })
      wrapper.setProps({ header: newHeader })
      expect(spy.callCount).toBe(0)
      expect(wrapper.html()).toBe(`<div></div>`)
    });
    it('testing componentDidUpdate() => undefined, shouldComponentUpdate => true', () => {
      /*
        Please note that test "testing when componentDidUpdate() is called - by itself (with no other lifecycle methods in invoked in conjunction"
        has the same outcome as this current test; as expected
      */
      class GaugeDidUpdate extends Component {
        state = {
          attemptUpdate: false
        }
        shouldComponentUpdate() {
          return true
        }
        componentDidUpdate() { }
        render() {
          return <div>{this.props.header}</div>
        }
      }
      const spy = sinon.spy(GaugeDidUpdate.prototype, "componentDidUpdate");
      const wrapper = mount(<GaugeDidUpdate />)
      const newHeader = "Header has been altered"
      expect(spy.notCalled).toBe(true)

      wrapper.setState({ attemptUpdate: true })
      expect(spy.calledOnce).toBe(true)
      expect(spy.returnValues).toBeTruthy() // Array []

      wrapper.setState({ attemptUpdate: true })
      wrapper.setProps({ header: newHeader })
      expect(spy.calledThrice).toBe(true)
      expect(spy.returnValues).toBeTruthy() // Array []
      expect(wrapper.html()).toBe(`<div>${newHeader}</div>`)
    });
    it('testing componentDidUpdate() => null, shouldComponentUpdate => true', () => {
      /*
        Please note that both test 
         - 'testing when componentDidUpdate() is called - by itself (with no other lifecycle methods in invoked in conjunction'
         - 'testing componentDidUpdate(prevProps, prevState) inconjunction with shouldComponentUpdate => true'
        has the same outcome as this current test; as expected
      */
      class GaugeDidUpdate extends Component {
        state = {
          attemptUpdate: false
        }
        shouldComponentUpdate() {
          return true
        }
        componentDidUpdate() { 
          return null
        }
        render() {
          return <div>{this.props.header}</div>
        }
      }
      const spy = sinon.spy(GaugeDidUpdate.prototype, "componentDidUpdate");
      const wrapper = mount(<GaugeDidUpdate />)
      const newHeader = "Header has been altered"
      expect(spy.notCalled).toBe(true)

      wrapper.setState({ attemptUpdate: true })
      expect(spy.calledOnce).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [null]

      wrapper.setState({ attemptUpdate: true })
      expect(spy.calledTwice).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [null, null]

      wrapper.setProps({ header: newHeader })
      expect(spy.calledThrice).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [null, null, null]

      wrapper.setProps({ header: newHeader })
      expect(spy.callCount).toBe(4)
      expect(spy.returnValues).toBeTruthy() // [null, null, null, null]
      expect(wrapper.html()).toBe(`<div>${newHeader}</div>`)
    });
  })
  context('componentDidUpdate(prevProps, prevState) inconjunction shouldComponentUpdate()', () => {
    it('testing componentDidUpdate(prevProps, prevState) => undefined, shouldComponentUpdate => false', () => {
      class GaugeDidUpdate extends Component {
        state = {
          attemptUpdate: false
        }
        shouldComponentUpdate() {
          return false
        }
        componentDidUpdate(prevProps, prevState) { }
        render() {
          return <div>{this.props.header}</div>
        }
      }
      const spy = sinon.spy(GaugeDidUpdate.prototype, "componentDidUpdate");
      const wrapper = mount(<GaugeDidUpdate />)
      const newHeader = "Header has been altered"
      expect(spy.notCalled).toBe(true)

      wrapper.setState({ attemptUpdate: true })
      expect(spy.notCalled).toBe(true)
      expect(spy.returnValues).toBeTruthy() // Array []

      wrapper.setState({ attemptUpdate: true })
      wrapper.setProps({ header: newHeader })
      expect(spy.notCalled).toBe(true)
      expect(spy.returnValues).toBeTruthy() // Array []
      expect(wrapper.html()).toBe(`<div></div>`)
    });
    it('testing componentDidUpdate(prevProps, prevState) => null, shouldComponentUpdate => true', () => {
      /*
        Please note that both test 
         - 'testing when componentDidUpdate() is called - by itself (with no other lifecycle methods in invoked in conjunction'
         - 'testing componentDidUpdate(prevProps, prevState) inconjunction with shouldComponentUpdate => true'
        has the same outcome as this current test; as expected
      */
      class GaugeDidUpdate extends Component {
        state = {
          attemptUpdate: false
        }
        shouldComponentUpdate() {
          return true
        }
        componentDidUpdate(prevProps, prevState) {
          return null
        }
        render() {
          return <div>{this.props.header}</div>
        }
      }
      const spy = sinon.spy(GaugeDidUpdate.prototype, "componentDidUpdate");
      const wrapper = mount(<GaugeDidUpdate />)
      const newHeader = "Header has been altered"
      expect(spy.notCalled).toBe(true)

      wrapper.setState({ attemptUpdate: true })
      expect(spy.calledOnce).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [null]

      wrapper.setState({ attemptUpdate: true })
      expect(spy.calledTwice).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [null, null]

      wrapper.setProps({ header: newHeader })
      expect(spy.calledThrice).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [null, null, null]

      wrapper.setProps({ header: newHeader })
      expect(spy.callCount).toBe(4)
      expect(spy.returnValues).toBeTruthy() // [null, null, null, null]
      expect(wrapper.html()).toBe(`<div>${newHeader}</div>`)
    });
    it('testing componentDidUpdate(prevProps, prevState) => undefined, shouldComponentUpdate => true', () => {
      /*
        Please note that both test 
         - 'testing when componentDidUpdate() is called - by itself (with no other lifecycle methods in invoked in conjunction'
         - 'testing componentDidUpdate(prevProps, prevState) inconjunction with shouldComponentUpdate => true'
        has the same outcome as this current test; as expected
      */
      class GaugeDidUpdate extends Component {
        state = {
          attemptUpdate: false
        }
        shouldComponentUpdate() {
          return true
        }
        componentDidUpdate(prevProps, prevState) {
          return prevProps, prevState
        }
        render() {
          return <div>{this.props.header}</div>
        }
      }
      const spy = sinon.spy(GaugeDidUpdate.prototype, "componentDidUpdate");
      const wrapper = mount(<GaugeDidUpdate />)
      const newHeader = "Header has been altered"
      expect(spy.notCalled).toBe(true)

      wrapper.setState({ attemptUpdate: true })
      expect(spy.calledOnce).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [undefined]

      wrapper.setState({ attemptUpdate: true })
      expect(spy.calledTwice).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [undefined, undefined]

      wrapper.setProps({ header: newHeader })
      expect(spy.calledThrice).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [undefined, undefined, undefined]

      wrapper.setProps({ header: newHeader })
      expect(spy.callCount).toBe(4)
      expect(spy.returnValues).toBeTruthy() // [undefined, undefined, undefined, undefined]
      expect(wrapper.html()).toBe(`<div>${newHeader}</div>`)
    });
    it('testing componentDidUpdate(prevProps, prevState) => [prevProps, prevState], shouldComponentUpdate => true', () => {
      /*
        Please note that both test 
         - 'testing when componentDidUpdate() is called - by itself (with no other lifecycle methods in invoked in conjunction'
         - 'testing componentDidUpdate(prevProps, prevState) inconjunction with shouldComponentUpdate => true'
        has the same outcome as this current test; as expected
      */
      class GaugeDidUpdate extends Component {
        state = {
          attemptUpdate: false
        }
        shouldComponentUpdate() {
          return true
        }
        componentDidUpdate(prevProps, prevState) {
          return [prevProps, prevState]
        }
        render() {
          return <div>{this.props.header}</div>
        }
      }
      const spy = sinon.spy(GaugeDidUpdate.prototype, "componentDidUpdate");
      const wrapper = mount(<GaugeDidUpdate />)
      const newHeader = "Header has been altered"
      expect(spy.notCalled).toBe(true)

      wrapper.setState({ attemptUpdate: true })
      expect(spy.calledOnce).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [[{}, {"attemptUpdate": false}]]

      wrapper.setState({ attemptUpdate: true })
      expect(spy.calledTwice).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [[{}, {"attemptUpdate": false}], [{}, {"attemptUpdate": true}]]

      wrapper.setProps({ header: newHeader })
      expect(spy.calledThrice).toBe(true)
      expect(spy.returnValues).toBeTruthy() // [[{}, {"attemptUpdate": false}], [{}, {"attemptUpdate": true}], [{}, {"attemptUpdate": true}]]

      wrapper.setProps({ header: newHeader })
      expect(spy.callCount).toBe(4)
      expect(spy.returnValues).toBeTruthy()
      /*
        [
          [{}, {"attemptUpdate": false}], 
          [{}, {"attemptUpdate": true}], 
          [{}, {"attemptUpdate": true}], 
          [{"header": "Header has been altered"}, {"attemptUpdate": true}]
        ]
      */
      expect(wrapper.html()).toBe(`<div>${newHeader}</div>`)
    });
  })
  context('componentDidUpdate(prevProps, prevState) inconjunction getSnapshotBeforeUpdate', () => {
    // please see getSnapshotBeforeUpdate.test.js
  })
})