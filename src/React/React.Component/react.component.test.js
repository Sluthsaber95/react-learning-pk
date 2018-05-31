/*
NOTE: 
------------------------
Tests on both Component and PureComponent are the same expect a few difference
in rendering.

OPTIMISATION:
------------------------
- Test messaging service to catch out errors, possibly rather than displaying them with console.log
- Give each test a unique ID, a hash that changes, when the tests are altered. To make them more searchable
- Find a way to test out implementation on shouldComponentUpdate() on PureComponent
*/
import React, { Component } from 'react'
import context from 'jest-plugin-context'
import { shallow, mount } from 'enzyme' // 348 K
import '../../enzyme-setup'
import {
  Greeting,
  Message,
  PureGreeting,
  PureMessage
} from '../../utils/mockContainers'

describe('Testing out React.Component Abstract Class', () => {
  context('React.Component "this" ', () => {
    it('test what "this" stands for', () => {
      class EmptyComponent extends Component {
        render(){
          return <div>{this}</div>
        }
      }
      // const wrapper = mount(<EmptyComponent />)
      // expect(wrapper).toBe()
      /*
      this = {
        {
          props,
          context,
          refs,
          updater,
          _reactInternalFiber,
          _reactInternalInstance,
          state
        }
      }
      */
    })
  })
  context('React.Component Minimum Requirements', () => {
    const messageWrapper = mount(<Message />)
    const greetingWrapper = mount(<Greeting />)

    it('test the current nodes exists', () => {
      expect(messageWrapper.exists()).toBeTruthy()
      expect(greetingWrapper.exists()).toBeTruthy()
    })
    it('testing nodes has been rendered', () => {
      expect(messageWrapper).toHaveLength(1)
      expect(greetingWrapper).toHaveLength(1)
      expect(messageWrapper.contains(<h1>Hello, Anthony</h1>)).toBe(true)
    })
    it('testing the <Message /> has a child component <Greeting />', () => {
      // either is find second is more specific
      expect(messageWrapper.find('div').children()).toHaveLength(1)
      expect(messageWrapper.find(Greeting)).toHaveLength(1)
    })
    it('test the <Greeting /> can accept props.name', () => {
      const _greetingWrapper = shallow(<Greeting name="Anthony" />)
      expect(_greetingWrapper.instance().props.name).toBe("Anthony")
      _greetingWrapper.setProps({ name: "Samantha" })
      expect(_greetingWrapper.instance().props.name).toBe("Samantha")
    })
    it('test the <Greeting /> can accept props from <Message />', () => {
      expect(messageWrapper.instance().state.name).toBe("Anthony")
      expect(messageWrapper.find(Greeting).instance().props.name).toBe("Anthony")
    })
  })
  context('React.PureComponent Minimum Requirements', () => {
    const pureMessageWrapper = mount(<PureMessage />)
    const pureGreetingWrapper = mount(<PureGreeting />)
    it('test the current nodes exists', () => {
      expect(pureMessageWrapper.exists()).toBeTruthy()
      expect(pureGreetingWrapper.exists()).toBeTruthy()
    })
    it('testing nodes has been rendered', () => {
      expect(pureMessageWrapper).toHaveLength(1)
      expect(pureGreetingWrapper).toHaveLength(1)
      expect(pureMessageWrapper.contains(<h1>Hello, Anthony</h1>)).toBeTruthy()
    })
    it('testing the <PureMessage /> has a child component <PureGreeting />', () => {
      // either is find second is more specific
      expect(pureMessageWrapper.find('div').children()).toHaveLength(1)
      // 'NOTE': 'PureComponents renderes implements it with a shallow props and state comparison - i.e. only goes one layer deep'
      expect(pureMessageWrapper.find(PureGreeting)).not.toHaveLength(1)
      expect(pureMessageWrapper.find(PureGreeting)).toHaveLength(0)
    })

    it('test the <PureGreeting /> can accept props.name', () => {
      const _greetingWrapper = shallow(<PureGreeting name="Anthony" />)
      expect(_greetingWrapper.instance().props.name).toBe("Anthony")
      _greetingWrapper.setProps({ name: "Samantha" })
      expect(_greetingWrapper.instance().props.name).toBe("Samantha")
    })
    it('test the <PureGreeting /> can accept props from <PureMessage />', () => {
      expect(pureMessageWrapper.instance().state.name).toBe("Anthony")
      try{
        expect(pureMessageWrapper.find(PureGreeting).instance().props.name).toBe("Anthony")
      }
      catch(err){
        // console.error('ReactWrapper::instance() can only be called on single nodes')
      }
    })
  })
})