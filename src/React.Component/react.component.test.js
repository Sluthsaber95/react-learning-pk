import React, { Component } from 'react'
import context from 'jest-plugin-context'
import { shallow, mount, unmount } from 'enzyme' // 348 K
import '../enzyme-setup'

describe('Testing out React.Component Abstract Class', () => {
  context('React.Component Minimum Requirements', () => {
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
    const messageWrapper = mount(<Message />)
    const greetingWrapper = mount(<Greeting />)

    it('test the current nodes exists', () => {
      expect(messageWrapper.exists()).toBeTruthy()
      expect(greetingWrapper.exists()).toBeTruthy()
    })
    it('testing nodes has been rendered', () => {
      expect(messageWrapper).toHaveLength(1)
      expect(greetingWrapper).toHaveLength(1)
      expect(messageWrapper.contains(<h1>Hello, Anthony</h1>)).toBeTruthy()
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
    it('')
  })
})