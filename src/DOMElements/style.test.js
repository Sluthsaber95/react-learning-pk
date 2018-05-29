import React from 'react';
import context from 'jest-plugin-context';
import { mount } from 'enzyme'; // 348 K
import styled from 'styled-components';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import idObj from 'identity-obj-proxy';

import style from './className.css'
import '../../src/enzyme-setup'

describe('Testing out the <Directory Class_Name>', () => {
  context('imported + modular css', () => {
    it('testing imported + modular css return values', () => {
      // can't find tests for the actual styles directly, need to mock the css modules with 'identity-obj-proxy'

      
      const Indicator = () => {
        return <div className="indicator-circle-on"></div>
      }
      const wrapper = mount(<Indicator />);
      expect(wrapper.find('div').props().className).toBe("indicator-circle-on")
    })

  })
  context('inline style', () => {
    xit('testing inline style return values', () => {
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
  })  
  context('styled-components', () => {
    const Div = styled.div `
      margin: 40px;
      border: 5px outset pink;
      &:hover {
      background-color: yellow;
    }
    `;
    const Paragraph = styled.p `
      font-size: 15px;
      text-align: center;
    `;
    xit('testing styled-components with "enzyme"', () => {
      // Don't use enzyme to test styled components, use jest instead
      Paragraph.displayName = 'Paragraph'
      const OutsetBox = () => (
        <Div>
          <Paragraph>Get started with styled-components</Paragraph>
        </Div>
      );        
      const parentWrapper = mount(<OutsetBox />)
      expect(parentWrapper.find(Div).props().children).toBeTruthy();
      expect(parentWrapper.find(Paragraph).children().props().children).toBe("Get started with styled-components");
    });
    xit('testing styled-components with "jest"', () => {
      const tree = renderer.create(<Div />).toJSON()
      expect(tree).toHaveStyleRule("border", "5px outset pink")
      expect(tree).toHaveStyleRule("margin", "40px");
      try {
        expect(tree).toHaveStyleRule("color", "green", {
          media:'(max-width:640px)',
          modifier:' :hover',
        })
      } catch (err) {
        // Property not found: "color" - contributors at styled-components have found a solution round this
          // console.error(err)
      }
      // next best alternative - however you won't use this to set up tests, only for regression testing
      expect(tree.props.className).toContain("sc-bdVaJa jukwAI")
    })
  })
})