import React, { Component, Fragment } from 'react';
import context from 'jest-plugin-context';
import { mount } from 'enzyme'; // 348 K
import '../../../enzyme-setup'


describe('Testing out the lifecycle method "getDerivedStateFromProps"', () => {
  context('static getDerivedStateFromProps', () => {
    it('testing static getDerivedStateFromProps on values returned', () => {
      class Parent extends Component {
        constructor(props){
          super(props);
          this.state = {
            isBeenLookedAfter: true
          }
        }
        render(){
          return (
          <Fragment>
            <Child {...this.state}/>
          </Fragment>
        )
        }
      }
      class Child extends Component {
        state = { isBeenLookedAfter: null}
        static getDerivedStateFromProps(nextProps, prevState){
          if (nextProps.isBeenLookedAfter === true){
            return {
              isBeenLookedAfter: nextProps.isBeenLookedAfter
            }
          }
          return null;
        }
        render(){
          return (
            this.state.isBeenLookedAfter
            ? <div><h1>Child is been looked after</h1></div>
            : <div><h1>Child is out of sight</h1></div>
          )
        }
      }
      const wrapper = mount(<Parent />)
      const header = <h1>Child is been looked after</h1>
      expect(wrapper.find('Child').props().isBeenLookedAfter).toBe(true)
      expect(wrapper.find('Child').contains(header)).toBe(true)
    });
  })
})