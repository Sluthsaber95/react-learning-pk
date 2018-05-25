import React from 'react';
import { mount } from 'enzyme'; // 348 K
import '../../enzyme-setup'

describe('Testing out React.createElement', () => {
  it('testing React.createElement() on values returned', () => {
    try{
      // expect(React.createElement())
      const error = true;
    } catch (error) {
      // console.error("Warning: React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it'sdefined in, or you might have mixed up default and named imports.")
    }
  });
  // All pending tests that are are marked `xit` are still incomplete
  xit('testing React.createElement(type, [props], [..children]) on values returned', () => {
    class Hello extends React.Component {
      render() {
        return React.createElement('div', null, `Hello ${this.props.toWhat}`);
      }
    }
    const div = document.createElement('div')
    const wrapper = mount(<Hello toWhat="World"/>)

  });
})