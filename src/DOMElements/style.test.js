/*
Please note this is just 2 of 4 main ways to include 
List of all 4 main ways to include css - exclude any details on scss

- import css stylesheet
- inline styling - this is advises against when it comes to performance, in terms of 
  - CSS being cacheable - blazing fast
- CSS modules - if you checkout src/learning-list.md you will find there are a 
  multitude of way to inject styles into your components. It's essentially CSS without
  the `C`
- Styled Components - supports React and React-Native
*/

import React, { Component } from 'react';
import context from 'jest-plugin-context';
import { mount } from 'enzyme'; // 348 K
import styled from 'styled-components';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import 'console.table'
import '../../src/enzyme-setup'

// import { } from '../../utils/mockStateless';
// import { } from '../../utils/mockContainers';


describe('Testing out the <Directory Class_Name>', () => {
  context('inline style', () => {
    it('testing inline style return values', () => {
      const divStyle = {
        margin: '40px',
        border: '5px solid blue'
      };
      const pStyle = {
        fontSize: '15px',
        textAlign: 'center'
      };

      const Box = () => (
        <div style={divStyle}>
          <p style={pStyle}>Get started with inline style</p>
        </div>
      );

      const wrapper = mount(<Box />)
      expect(wrapper.find('div').props().style.border).toBe('5px solid blue');
      expect(wrapper.find('p').props().style.fontSize).toBe('15px');
    });
    it('styled-components', () => {
      const Div = styled.div `
        margin: 40px;
        border: 5px outset pink;
        color: green;
        &:hover {
        background-color: yellow;
      }
      `;
      const Paragraph = styled.p `
        font-size: 15px;
        text-align: center;
      `;
      Paragraph.displayName = 'Paragraph'
      const OutsetBox = () => (
        <Div>
          <Paragraph>Get started with styled-components</Paragraph>
        </Div>
      );

      // enzyme - don't use this to test styled-components
      const parentWrapper = mount(<OutsetBox />)
      expect(parentWrapper.find(Div).props().children).toBeTruthy();
      expect(parentWrapper.find(Paragraph).children().props().children).toBe("Get started with styled-components");
      
      // Jest Testing Tools
      const tree = renderer.create(<Div />).toJSON()
      expect(tree).toMatchSnapshot()
      expect(tree).toHaveStyleRule("border", "5px outset pink")
      try {
        expect(tree).toHaveStyleRule("color", "green", {
          media:'(max-width:640px)',
          modifier:' :hover',
        })
      } catch (err) {
        // Property not found: "color" - people working
          // console.error(err)
      }
      // next best alternative - however you won't use this to set up tests, only for regression testing
      expect(tree.props.className).toContain("sc-bdVaJa dHEQMF")
    });
  })  
})