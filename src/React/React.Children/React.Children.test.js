import React, { Component } from 'react';
import ReactDOM from 'react-dom/cjs/react-dom.development';
import context from 'jest-plugin-context';
import { shallow, mount, unmount } from 'enzyme'; // 348 K
import 'console.table'
import '../../enzyme-setup'

import { } from '../../utils/mockStateless';
import { } from '../../utils/mockContainers';
import { notDeepEqual } from 'assert';

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
    it('testing React.Children.count() on values returned', () => {
      expect(React.Children.count()).toBe(0)
    });
  })
  context('React.Children.count()', () => {
    it('testing React.Children.count() on values returned', () => {
      expect(React.Children.count()).toBe(0)
    });
    it('testing React.Children.count(arg) on values returned', () => {
      expect(React.Children.count(1)).toBe(1)
      expect(React.Children.count(2)).toBe(1)
      expect(React.Children.count(false)).toBe(1)
      
      class CountedChildren extends Component {
        constructor(props){
          super(props);
        }
        render(){
          return 
        }
      }
    });
  })  
})