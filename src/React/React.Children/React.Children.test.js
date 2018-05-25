import React, { Component } from 'react';
import context from 'jest-plugin-context';
import { mount } from 'enzyme/'; // 348 K
import '../../enzyme-setup'

import { Stateless } from '../../utils/mockStateless';
import { ViewedIndicator } from '../../utils/mockContainers';

describe('Testing out the React.Children', () => {
  context('React.Children', () => {
    it('testing React.Children on values returned', () => {
      try{
        expect(React.Children).toBe()
      } catch(error){
        // console.log(`
        // {
        //   "count": [Function countChildren], 
        //   "forEach": [Function forEachChildren], 
        //   "map": [Function mapChildren], 
        //   "only": [Function onlyChild], 
        //   "toArray": [Function toArray]
        // }`)
      }
    });
  })
  context('React.Children.count()', () => {
    it('testing React.Children.count() on values returned', () => {
      expect(React.Children.count()).toBe(0)
    });
    it('testing React.Children.count(children) on values returned', () => {
      class ComponentWithChildren extends Component {
        render(){
          return (
            <div>
              <Stateless></Stateless>
              <Stateless></Stateless>
              <Stateless></Stateless>
            </div>
          )
        }
      }

      class EmptyComponent extends Component {
        render(){
          return <div>{this.props.children}</div>
        }
      }

      const ComponentChildrenWrapper = mount(<ComponentWithChildren />)
      const EmptyComponentWrapper = mount(<EmptyComponent />)
      const EmptyComponentFilledWrapper = mount(
        <EmptyComponent>
          <Stateless></Stateless>
          <Stateless></Stateless>
          <Stateless></Stateless>
        </EmptyComponent>)
      
      try {
        expect(React.Children.count({})).toBe(null)
      } catch (err) {
        // console.error("Objects are not valid as a React child (found: object with keys {}). If you meant to render a collection of children, use an array instead.null")
      }
      expect(React.Children.count(null)).toBe(0)
      expect(React.Children.count(undefined)).toBe(0)
      expect(React.Children.count(<div></div>)).toBe(1)
      expect(React.Children.count("")).toBe(1)
      expect(React.Children.count(1)).toBe(1)
      expect(React.Children.count(2)).toBe(1)
      expect(React.Children.count(false)).toBe(1)
      expect(React.Children.count([<div></div>, <div></div>])).toBe(2)
      expect(React.Children.count([false, false])).toBe(2)
      expect(React.Children.count([<div></div>, false])).toBe(2)
      expect(React.Children.count(ComponentChildrenWrapper.children().props().children)).toBe(3)
      expect(React.Children.count(EmptyComponentWrapper.children().props().children)).toBe(0)
      expect(React.Children.count(EmptyComponentFilledWrapper.children().props().children)).toBe(3)
    });
  })  
  context('React.Children.forEach()', () => {
    it('testing React.Children.forEach() on values returned', () => {
      expect(React.Children.forEach()).toBe(undefined)
    });
    it('testing React.Children.forEach(...args) on values returned', () => {
      expect(React.Children.forEach(undefined)).toBe(undefined)
      expect(React.Children.forEach(null)).toBe(null)
      expect(React.Children.forEach([])).toBe(undefined)
      try {
        expect(React.Children.forEach("")).toBe(undefined)
        expect(React.Children.forEach([<div></div>])).toBe(undefined)
        expect(React.Children.forEach(<div></div>)).toBe(undefined)
      } catch(err){
        // console.error("TypeError: Cannot read property 'call' of undefined, i.e. needs a callback as the second argument")
      }
    });
    it('testing React.Children.forEach(children, function[(thisArg)]) on values returned', () => {
      class ComponentWithChildren extends Component {
        render(){
          const listedElements = [
            <ViewedIndicator />,
            <ViewedIndicator />,
          ]
          const children = React.Children.forEach(listedElements, child => child)
          return (
            <div>
              { children }
            </div>
          )
        }
      }
      const wrapper = mount(<ComponentWithChildren />)
      // at the moment I can't think up of any examples to use 
      // React.Children.forEach()
      expect(wrapper.html()).toBe("<div></div>")
    });
  });
  context('React.Children.map()', () => {
    it('testing React.Children.map() on values returned', () => {
      expect(React.Children.map()).toBe(undefined)
    })
    it('testing React.Children.map(children) on values returned', () => {
      expect(React.Children.map(null)).toBe(null)
      expect(React.Children.map(undefined)).toBe(undefined)
      expect(React.Children.map([])).toBeTruthy() // Array []
      try {
        expect(React.Children.map({})).toBeTruthy()
      } catch (err) {
        // console.error("Invariant Violation: Objects are not valid as a React child (found: object with keys {}). If you meant to render a collection of children, use an array instead.null")
      }
      try {
        expect(React.Children.map("")).toBeTruthy()
        expect(React.Children.map(false)).toBe(null)
        expect(React.Children.map(1)).toBe(null)
      } catch (err) {
        // console.error("TypeError: Cannot read property 'call' of undefined; i.e. needs to a callback as a second argument")
      }
    })
    it('testing React.Children.map(children, function[(thisArg)]) on values returned', () => {
      class ComponentWithChildren extends Component {
        render(){
          const listedElements = [
            <ViewedIndicator />,
            <ViewedIndicator />,
          ]
          const children = React.Children.map(listedElements, child => {
            return React.cloneElement(child, {
              respondentSeen: true
            })
          })
          return (
            <div>
              { children }
            </div>
          )
        }
      }
      
      const wrapperIndicator = mount(<ViewedIndicator />)
      expect(wrapperIndicator.state().backgroundColor).toBe("Red")
      wrapperIndicator.setProps({ respondentSeen: true})
      expect(wrapperIndicator.state().backgroundColor).toBe("Green")
      
      const wrapperChildren = mount(<ComponentWithChildren />)
      expect(React.Children.count(wrapperChildren.children().props().children)).toBe(2)
      expect(wrapperChildren.children().props().children[0].props.respondentSeen).toBe(true) // "Red" -> "Green"
    });
  });
  context('React.Children.only()', () => {
    it('testing React.Children.only() on values returned', () => {
      try{
        expect(React.Children.only()).toBe()
      } catch (err) {
        // console.error("Invariant Violation: React.Children.only expected to receive a single React element child.")
      }
    })
    it('testing React.Children.only(arg) on values returned', () => {
      expect(React.Children.only(<div></div>)).toBeTruthy() // <div />
      expect(React.Children.only(<ViewedIndicator />)).toBeTruthy() // <ViewedIndicator />
      try {
        expect(React.Children.only([<ViewedIndicator />, <ViewedIndicator />])).toBeTruthy()
      } catch (err) {
        // console.error("Invariant Violation: React.Children.only expected to receive a single React element child.")
      }
      class ComponentWithChildren extends Component {
        render(){
          return (
            <div>
              <ViewedIndicator />
              <ViewedIndicator />
            </div>
          )
        }
      }
      class ComponentWithSingleChild extends Component {
        render(){
          return (
            <div>
              <ViewedIndicator />
            </div>
          )
        }
      }
      const componentWithChildrenWrapper = mount(<ComponentWithChildren />)
      const componentWithChildWrapper = mount(<ComponentWithSingleChild />)
      try {
        expect(React.Children.only(componentWithChildrenWrapper.children().props().children)).toBe()
      } catch (err) {
        // console.error("Invariant Violation: React.Children.only expected to receive a single React element child.")
      }
      expect(React.Children.only(componentWithChildWrapper.children().props().children)).toBeTruthy()
    })
  });
  context('testing React.Children.toArray(arg) on values returned', () => {
    it('testing React.Children.toArray() on values returned', () => {
      expect(React.Children.toArray()).toBeTruthy() // Array []
    });
    it('testing React.Children.toArray(children) on values returned', () => {
       class ComponentWithChildren extends Component {
        render () {
          return React.Children.toArray(this.props.children)
            .filter(child => {
              return child.props.respondentSeen === false;
            })
        }
      }
      const wrapper = mount(
        <ComponentWithChildren>
          <ViewedIndicator respondentSeen={true}/>
          <ViewedIndicator respondentSeen={false}/>
        </ComponentWithChildren>
      )
      const div = document.createElement('div');
      expect(wrapper.children()).toHaveLength(1)
      /*
        expect(wrapper.children().props().children)
        This does not work as the component must contain children first, rather than have them passed down as
        this.props.children
      */
    });
  });
})