import React, { Component } from 'react'
import context from 'jest-plugin-context'
import { shallow, mount } from 'enzyme' // 348 K
import '../../enzyme-setup'

import { StatelessReturnDiv } from '../../utils/mockStateless'
import { Message } from '../../utils/mockContainers'

describe('Testing out the React.isValidElement', () => {
  context('React.isValidElement()', () => {
    it('testing React.isValidElement() on values returned', () => {
      expect(React.isValidElement()).toBe(false)
    })
    it('testing React.isValidElement(arg) on values returned', () => {
      const wrapperShallow = shallow(<StatelessReturnDiv />)
      const wrapper = mount(<Message />)

      expect(React.isValidElement(null)).toBe(false)
      expect(React.isValidElement(undefined)).toBe(false)
      expect(React.isValidElement({})).toBe(false)
      expect(React.isValidElement(wrapperShallow)).toBe(false)
      expect(React.isValidElement(wrapper)).toBe(false)
      expect(React.isValidElement(wrapperShallow.instance())).toBe(false)
      expect(React.isValidElement(wrapper.instance())).toBe(false)
      expect(React.isValidElement(Message)).toBe(false)
      expect(React.isValidElement(StatelessReturnDiv)).toBe(false)
      
      const developerHint = "Must be an <element.type>"
      expect(React.isValidElement(<StatelessReturnDiv />), developerHint).toBe(true)
      expect(React.isValidElement(<Message />), developerHint).toBe(true)
      expect(React.isValidElement(<div />), developerHint).toBe(true)
      expect(React.isValidElement(<button />), developerHint).toBe(true)
    })
  })  
})