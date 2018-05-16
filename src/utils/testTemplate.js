import React, { Component } from 'react';
import ReactDOM from 'react-dom/cjs/react-dom.development';
import context from 'jest-plugin-context';
import { shallow, mount, unmount } from 'enzyme'; // 348 K
import 'console.table'
import '../enzyme-setup'

import { } from '../utils/mockStateless';
import { } from '../utils/mockContainers';
import { } from './ReadOnly/components';


describe('Testing out the <Directory Class_Name>', () => {
  context('<Class_Name>', () => {
    it('testing <Class_Name>.method() on values returned', () => {
    });
    it('testing <Class_Name>.method(...args) on values returned', () => {
    });
  })  
})