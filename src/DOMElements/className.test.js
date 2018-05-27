import React, { Component } from 'react';
import context from 'jest-plugin-context';
import { mount } from 'enzyme'; // 348 K
import '../../src/enzyme-setup'

import './className.css';

describe('Testing out the <Directory Class_Name>', () => {
  context('className={}', () => {
    it('testing className on values returned', () => {
      class Indicator extends Component {
        render(){
          return (
            <div></div>
          )
        }
      }
      class IndicatorDivClassName extends Component {
        render(){
          return (
            <div className="indicator-circle"></div>
          )
        }
      }
      const wrapper = mount(<Indicator className="indicator-circle"/>)
      const wrapperDivClassName = mount(<IndicatorDivClassName />)
      expect(wrapper.hasClass("indicator-circle")).toBe(true)
      expect(wrapperDivClassName.find('div').hasClass("indicator-circle")).toBe(true)
    });
    it('testing alteration of className', () => {
      class IndicatorDivClassName extends Component {
        render(){
          return (
            <div className="indicator-circle"></div>
          )
        }
      }
      class IndicatorAlterClassName extends Component {
        render(){
          let seenIndication;
          this.props.respondentSeen 
          ? seenIndication = "indicator-circle-on"
          : seenIndication = "indicator-circle"
          return (
            <div className={seenIndication}></div>
          )
        }
      }
      const wrapper = mount(<IndicatorDivClassName className="indicator-circle-on" />)
      const wrapperAlterClass = mount(<IndicatorAlterClassName respondentSeen={true}/>)
      expect(wrapper.hasClass("indicator-circle-on")).toBe(true)
      expect(wrapperAlterClass.find('div').hasClass("indicator-circle-on")).toBe(true)
      wrapperAlterClass.setProps({ respondentSeen: false})
      expect(wrapperAlterClass.find('div').hasClass("indicator-circle")).toBe(true)
    });
  })  
})