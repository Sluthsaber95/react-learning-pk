import React, { Component } from 'react';
import ReactDOM from 'react-dom/cjs/react-dom.development';
import context from 'jest-plugin-context';
import { mount, unmount } from 'enzyme'; // 348 K
import '../enzyme-setup'

import { 
  Stateless, 
  StatelessNotReturnNull,
  StatelessReturnDiv
}
from '../utils/mockStateless';
import { ContainerEmpty } from '../utils/mockContainers';
import {
  ModalBackdrop,
  ModalContent,
  ModalDialog,
  ModalWrap,
} from './ReadOnly/components';

describe('Testing out the ReactDOM Global', () => {
  context('ReactDOM.render()', () => {
    it('renders ReactDOM.render(whitelistedValues, div) on values returned', () => {
      const div = document.createElement('div');
      expect(ReactDOM.render( <Stateless />, div)).toEqual(null);
    });
    it('renders ReactDOM.render(nonWhitelistedValues, div) on values returned', () => {
      const div = document.createElement('div');
      try {
      } catch(err){ 
        try {
          expect(ReactDOM.render( <StatelessNotReturnNull /> , div)).toEqual(null);
        } catch(err){
          // console.error("Jest: `it` and `test` must return either a Promise or undefined.")
          return false;
        }
      }
    });
  })
  context('ReactDOM.hydrate', () => {
    it('renders ReactDOM.hydrate(whitelistedValues, div) on values returned', () => {
      const div = document.createElement('div');
      expect(ReactDOM.hydrate( <Stateless /> , div)).toEqual(ReactDOM.render( <Stateless /> , div));
    });
    it('renders ReactDOM.hydrate(nonWhiteListedValues, div) on values returned', () => {
      const div = document.createElement('div');
      try {
      } catch(err){ 
        try {
          expect(ReactDOM.hydrate( <StatelessNotReturnNull /> , div)).toEqual(null);
        } catch(err){
          // console.error("Jest: `it` and `test` must return either a Promise or undefined.")
          return false;
        }
      }
    });
  })
  context('ReactDOM.unmountComponentAtNode()', () => {
    it('testing ReactDOM.unmountComponentAtNode() on values returned', () => {
      const div = document.createElement('div');
      try{
        expect(ReactDOM.unmountComponentAtNode())
      } catch (err) {
        // console.error('Invariant Violation: unmountComponentAtNode(...): Target container is not a DOM element.')
      }
    });
    it('testing ReactDOM.unmountComponentAtNode(<Stateless />) on values returned', () => {
      const div = document.createElement('div');
      expect(ReactDOM.unmountComponentAtNode(div)).toEqual(false)
      expect(ReactDOM.render(<Stateless />, div))
      expect(ReactDOM.unmountComponentAtNode(div)).toEqual(true)
      expect(ReactDOM.unmountComponentAtNode(div)).toEqual(false)
    });
    it('testing ReactDOM.unmountComponentAtNode(<ContainerEmpty />) on values returned', () => {
      const div = document.createElement('div');
      expect(ReactDOM.render(<ContainerEmpty/>, div))
      expect(ReactDOM.unmountComponentAtNode(div)).toEqual(true)
      expect(ReactDOM.unmountComponentAtNode(div)).toEqual(false)
    });
  });
  // Recommend use React.createRef() instead
  context('ReactDOM.findDOMNode()', () => {
    it('testing ReactDOM.findDOMNode() on values returned', () => {
      expect(ReactDOM.findDOMNode()).toEqual(null)
      expect(ReactDOM.findDOMNode(null)).toEqual(null)
      expect(ReactDOM.findDOMNode(undefined)).toEqual(null)
    });
    it('testing ReactDOM.findDOMNode(div) on values returned', () => {
      const div = document.createElement('div');
      const div2 = document.createElement('div');
      expect(ReactDOM.render(<StatelessReturnDiv />, div))
      expect(ReactDOM.render(<StatelessReturnDiv />, div2))
      expect(ReactDOM.findDOMNode(div)).toEqual(div2)
    });
    it('testing ReactDOM.findDOMNode(<div></div>) on values returned', () => {
      try {
        expect(ReactDOM.findDOMNode(<div></div>))
      } catch(err) {
        // console.error("Invariant Violation: Argument appears to not be a ReactComponent. Keys: $$typeof,type,key,ref,props,_owner,_store")        
      }
    });
    it('testing ReactDOM.findDOMNode(<Stateless />) on values returned', () => {
      const div = document.createElement('div');      
      expect(ReactDOM.render(<Stateless />, div)).toEqual(null)
      try {
        expect(ReactDOM.findDOMNode(<Stateless />))
      } catch(err){
        // console.error("Invariant Violation: Argument appears to not be a ReactComponent. Keys: $$typeof,type,key,ref,props,_owner,_store")
      }
    });
  });
  context('ReactDOM.createPortal()', () => {
    it('ReactDOM.createPortal()', () => {
      try {
        ReactDOM.createPortal().not.toBe(null)
      } catch (err) {
        // console.error("Invariant Violation: Target container is not a DOM element")
      }
    })
    it('testing ReactDOM.createPortal(children, container) should render all components and the children', () => {
      const Child = () => <div>Yolo</div>;
      class Modal extends React.Component {
        constructor(props) {
          super(props);
          this.el = document.createElement('div');
          this.modalRoot = document.getElementById('modal-root');
        }
        render() {
          const ModalMarkup = (
            <div>
              <ModalBackdrop/>
              <ModalWrap>
                <ModalDialog>
                  <ModalContent>{this.props.children}</ModalContent>
                </ModalDialog>
              </ModalWrap>
            </div>
          );
          return ReactDOM.createPortal(ModalMarkup, this.el);
        }
      }
      let component = mount(
        <Modal>
          <Child />
        </Modal>
      );
      expect(component.find(ModalBackdrop).exists()).toBeTruthy();
      expect(component.find(ModalWrap).exists()).toBeTruthy();
      expect(component.find(ModalWrap).contains(ModalDialog)).toBeTruthy();
      expect(component.find(ModalDialog).contains(ModalContent)).toBeTruthy();
      expect(component.find(ModalContent).contains(Child)).toBeTruthy();
    });      
  })
})