import React, { Component } from 'react'
import ReactDOM from 'react-dom/cjs/react-dom.development'
import context from 'jest-plugin-context'
import { mount } from 'enzyme' // 348 K
import '../../enzyme-setup'

import { } from '../../utils/mockStateless'
import 
{ Message, 
  Greeting, 
  Respondent, 
  ViewedIndicator,
  ContainerEmpty
} from '../../utils/mockContainers'

/*
TODO: This could have been use for that situation where all the components were exactly the same except for the name
*/

describe('Testing out the component cloning', () => {
  context('React.cloneElement()', () => {
    it('testing React.cloneElement() on values returned', () => {
      try{
        expect(React.cloneElement())
      } catch (error) {
        // console.error("Invariant Violation: React.cloneElement(...): The argument must be a React element, but you passed undefined.")
      }
    })
    it('testing React.cloneElement(<Message />) on values returned', () => {
      class CloneMessage extends Component {
        render(){
          return React.cloneElement(<Message />)
        }
      }
      const wrapper = mount(<CloneMessage />)
      expect(wrapper.html()).toBe("<div><h1>Hello, Anthony</h1></div>")
    })
    it('testing React.cloneElement(<Greeting />, "Anthony") on values returned', () => {
      class CloneGreeting extends Component {
        render(){
          // Note: [ ...props] are passed to the cloned component - i.e. the first argument
          return React.cloneElement(<Greeting />, { name: "Steve"})
        }
      }
      const wrapper = mount(<CloneGreeting />)
      expect(wrapper.html()).toBe("<h1>Hello, Steve</h1>")
    })
    it('testing React.cloneElement(<Respondent/>, [...props], <ViewedIndicator />) passing props to children', () => {
      // This requires 2 uses of React.cloneElement
      class CloneRespondent  extends Component {
        constructor(props) {
          super(props)
        }
        render(){
          return React.cloneElement(<Respondent />, { respondentSeen: true }, <ViewedIndicator />)
        }
      }
      const wrapper = mount(<CloneRespondent />)
      
      expect(wrapper.html()).not.toBe("<div style=\"width: 10px; height: 10px; border-radius: 50%; background-color: Green;\"></div>")
      expect(wrapper.html()).not.toBe("<div><div style=\"width: 10px; height: 10px; border-radius: 50%; background-color: Red;\"></div></div>")
      expect(wrapper.html()).toBe("<div><div style=\"width: 10px; height: 10px; border-radius: 50%; background-color: Green;\"></div></div>")
    })
  })
  context('<element.type {...element.props} {...props}>{children}</element.type>', () => {
     /*
      Note: <element.type> Comes from the React.createElement(type, ...otherArgs)
      In this case this <element.type /> represents any type of component created
      */
    it('testing <element.type></element.type>', () => {
      /*
      TODO: 
      - Display the differences between React.cloneClone() and <element.type></element.type>
      - Find a way to get the ref of any element before any comparisons can be made
      */
      class CloneRespondent  extends Component {
        constructor(props) {
          super(props)
          this.state = {
            respondentSeen: true
          }
        }
        render(){
          return <Respondent {...this.state}></Respondent>
        }
      }
      const wrapper = mount(
        <CloneRespondent>
          <ViewedIndicator />
        </CloneRespondent> )
      expect(wrapper.html()).not.toBe("<div style=\"width: 10px; height: 10px; border-radius: 50%; background-color: Green;\"></div>")
      expect(wrapper.html()).not.toBe("<div><div style=\"width: 10px; height: 10px; border-radius: 50%; background-color: Red;\"></div></div>")
      expect(wrapper.html()).toBe("<div><div style=\"width: 10px; height: 10px; border-radius: 50%; background-color: Green;\"></div></div>")
    })
    it('testing "ref" of <element.type></element.type> compared to React.cloneElement()', () => {
      class CloneRespondentUseElementType  extends Component {
        constructor(props) {
          super(props)
          this.state = {
            respondentSeen: true
          }
        }
        render(){
          return <Respondent ref="new-ref-used" {...this.state}></Respondent>
        }
      }
      class CloneRespondentUseReactClone  extends Component {
        constructor(props) {
          super(props)
          this.state = {
            respondentSeen: true
          }
        }
        render(){
          return React.cloneElement(<Respondent ref="new-ref-used"/>, { respondentSeen: this.respondentSeen})
        }
      }
      const wrapperElementType = mount(
        <CloneRespondentUseElementType>
          <ViewedIndicator ref="old-ref"/>
        </CloneRespondentUseElementType> )
      const wrapperReactClone = mount(<CloneRespondentUseReactClone />)

      expect(wrapperElementType.ref('new-ref-used')).not.toBe(undefined)
      expect(wrapperReactClone.ref('new-ref-used')).not.toBe(undefined)
    })
    xit('testing <element.type>{children}</element.type>', () => {
      /*
      TODO: Display the differences between React.cloneClone() and <element.type></element.type>
      */
      class CloneRespondent  extends Component {
        constructor(props) {
          super(props)
          this.state = {
            respondentSeen: true
          }
        }
        render(){
          return <Respondent {...this.state}>{this.props.children}</Respondent>
        }
      }
      const wrapper = mount(
        <CloneRespondent>
          <ViewedIndicator />
        </CloneRespondent> )
      
      expect(wrapper.html()).not.toBe("<div style=\"width: 10px; height: 10px; border-radius: 50%; background-color: Green;\"></div>")
      expect(wrapper.html()).not.toBe("<div><div style=\"width: 10px; height: 10px; border-radius: 50%; background-color: Red;\"></div></div>")
      expect(wrapper.html()).toBe("<div><div style=\"width: 10px; height: 10px; border-radius: 50%; background-color: Green;\"></div></div>")    
    })
    xit('testing <element.type {...element.props} {...props}>{children}</element.type>', () => {
      /*
      TODO: Display the differences between React.cloneClone() and <element.type></element.type>
      */
      class CloneRespondent  extends Component {
        constructor(props) {
          super(props)
          this.state = {
            respondentSeen: true
          }
        }
        render(){
          return <Respondent {...this.state}>{this.props.children}</Respondent>
        }
      }
      const wrapper = mount(
        <CloneRespondent>
          <ViewedIndicator />
        </CloneRespondent> )
      
      expect(wrapper.html()).not.toBe("<div style=\"width: 10px; height: 10px; border-radius: 50%; background-color: Green;\"></div>")
      expect(wrapper.html()).not.toBe("<div><div style=\"width: 10px; height: 10px; border-radius: 50%; background-color: Red;\"></div></div>")
      expect(wrapper.html()).toBe("<div><div style=\"width: 10px; height: 10px; border-radius: 50%; background-color: Green;\"></div></div>")    
    })
  })
})