import React, { Component } from 'react';
import ReactDOM from 'react-dom/cjs/react-dom.development';
import context from 'jest-plugin-context';
import { shallow, mount, unmount } from 'enzyme'; // 348 K
import '../../enzyme-setup'

import { } from '../../utils/mockStateless';
import { } from '../../utils/mockContainers';

describe('Testing out the componentDidMount lifecycle method', () => {
  context('componentDidMount', () => {
    it('testing componentDidMount() on values returned', () => {
      class ToggleSwitch extends Component {
        constructor(props) {
          super(props);
          this.state = {
            toggleNewText: true
          }
          this.changeText = this.changeText.bind(this);
        }
        shouldComponentUpdate(nextProps, nextState) {
          return this.state !== nextState;
        }
        changeText() {
          this.setState({ toggleNewText: !this.state.toggleNewText })
        }
        render() {
          return (
            <button onClick={this.changeText}>
              {
                this.state.toggleNewText
                  ? "New Text"
                  : "Old Text"
              }
            </button>
          )
        }
      }
    });
  })
})