import React from 'react';
import { shallow, mount, unmount } from 'enzyme'; // 348 K
import 'console.table'
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
  it('testing React.createElement(type, [props], [..children]) on values returned', () => {
    /* 
    Not Neccessary if one is not using JSX
    Suggestions: Do at least 5 sets of examples - to cover all the learning bases
      1) one with no props, simple string
      2) one with fragment type, props array and children array - rather than plan strings
      3) with no JSX at all, good old JavaScript code
      4) Include propTypes
    */

    class Hello extends React.Component {
      render() {
        return React.createElement('div', null, `Hello ${this.props.toWhat}`);
      }
    }
    const div = document.createElement('div')
    const wrapper = mount(<Hello toWhat="World"/>)

  });
})