/*
  Please note: As of 29/05/2018 - there is no current support from enzyme, for the shallow
  method used in conjunction with the React Component method getSnapshotBeforeUpdate
*/

import React, { Component } from 'react';
import context from 'jest-plugin-context';
import { mount } from 'enzyme'; // 348 K
import sinon from 'sinon';
import '../../../enzyme-setup'

describe('Testing out the getSnapshotBeforeUpdate', () => {
  context('getSnapshotBeforeUpdate()', () => {
   it('testing how getSnapshotBeforeUpdate() gets called', () => {
      class EmptyShapshotMethod extends React.Component {
        constructor(props){
          super(props);
          this.state = {
            username: "Edward"
          }
        }
        getSnapshotBeforeUpdate() {
          return [] || null;
        }
        componentDidUpdate(prevProps, prevState, snapshot){

        }
        render(){
          return <div></div>;
        }
      }
      /*
      Note: 
        1) getSnapshot must either return [] || null
        2) You will need to use getSnapshotBeforeUpdate in conjunction componentDidUpdate
        Flagged Warnings below, if the above criteria are not met => 

        Warning: EmptyShapshotMethod.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.

        Warning: EmptyShapshotMethod: getSnapshotBeforeUpdate() should be used with 
        componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.
      */
      // const spySnapshot = sinon.spy(EmptyShapshotMethod.prototype, "getSnapshotBeforeUpdate")
      // const spyDidUpdate = sinon.spy(EmptyShapshotMethod.prototype, "componentDidUpdate")
      const username = { "username": "Tony" }
      const wrapper = mount(<EmptyShapshotMethod username={username}/>);
      // expect(spySnapshot.notCalled).toBe(true);
      // expect(spyDidUpdate.notCalled).toBe(true)
      
      wrapper.setProps({ username: "Count Dracula" })
      // expect(spySnapshot.calledOnce).toBe(true);
      // expect(spyDidUpdate.calledOnce).toBe(true)
      // expect(Array.isArray(spySnapshot.returnValues)).toBe(true) // returns [Array[]]
      // expect(spySnapshot.returnValues[0]).toBe(spyDidUpdate.args[0][2])
    });

   it('testing getSnapshotBeforeUpdate(prevProps, prevState) on values returned', () => {
    // taken from react docs 16.4
    class ScrollingList extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          endlessScroll: false
        }
      }
      getSnapshotBeforeUpdate(prevProps, prevState) {
        return prevProps.list.length < this.props.list.length 
          ? this.props.list.length - prevProps.list.length
          : null
      }
      componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot !== null) {
          const scrollability = this.state;
          scrollability.endlessScroll = true;
        }
      }
      render() {
        return (
          <div>{/* ...contents... */}</div>
        );
      }
    }
    const list = [
      "News",
      "Headlines",
      "Paragraph",
    ];
    const spySnapshot = sinon.spy(ScrollingList.prototype, "getSnapshotBeforeUpdate")
    const spyDidUpdate = sinon.spy(ScrollingList.prototype, "componentDidUpdate")
    const wrapper = mount(<ScrollingList list={list} />)
    expect(spySnapshot.called).toBe(false)
    
    // so snapshot will not be called until you introduce a new set of props is passed
    const newList = [
      "Breaking News",
      "Articles",
      "News",
      "Headlines",
      "Paragraph",
      "footer",
      "footer",
    ]
    wrapper.setProps({ list: newList })
    expect(spySnapshot.calledOnce).toBe(true)
    // Demonstrates 
    // 1) getSnapshotBeforeUpdate => snapshot
    // 2) componentDidUpdate(prevProps, prevState, snapshot)
    expect(Array.isArray(spySnapshot.returnValues)).toBe(true)
    expect(spySnapshot.returnValues[0]).toBe(spyDidUpdate.args[0][2])
    // As a result
    expect(wrapper.state().endlessScroll).toBe(true)
   });
  })
})

//getSnapshot will not trigger with return undefined