import React, {Component} from 'react';
import ReactDOM from 'react-dom/cjs/react-dom.development';
import ReactDOMServer from 'react-dom/server';
import context from 'jest-plugin-context';
import {
  configure,
  render,
  shallow,
  mount
}
from 'enzyme'; // 348 K
import Adapter from 'enzyme-adapter-react-16'
configure({
  adapter: new Adapter()
});

/*
TODO: Use enzyme to render the components, for more accurate tests
*/
describe('Testing out the ReactDOM Global', () => {
  context('ReactDOM.render()', () => {
    it('renders ReactDOM.render(whitelistedValues, div) on values returned', () => {
      const div = document.createElement('div');
      const StatelessComponent = () => {
        const whiteListValues = [<div></div>, "", NaN, 0, null];
        const index = Math.floor(Math.random()*4)
        return null;
      }
      expect(ReactDOM.render( <StatelessComponent />, div)).toEqual(null);
    });
    it('renders ReactDOM.render(nonWhitelistedValues, div) on values returned', () => {
      const div = document.createElement('div');
      const StatelessComponentNotReturnNull = () => {
        const nonWhiteListValues = [{}, undefined, 0];
        const index = Math.floor(Math.random()*whiteListValues.length)
        return nonWhiteListValues;
      }
      try {
      } catch(err){ 
        try {
          expect(ReactDOM.render( <StatelessComponentNotReturnNull /> , div)).toEqual(null);
        } catch(err){
          console.error("Jest: `it` and `test` must return either a Promise or undefined.")
          return false;
        }
      }
    });
  })
  context('ReactDOM.hydrate', () => {
    it('renders ReactDOM.hydrate(whitelistedValues, div) on values returned', () => {
      const div = document.createElement('div');
      const StatelessComponent = () => {
        const whiteListValues = [<div></div>, "", NaN, 0, null];
        const index = Math.floor(Math.random()*4)
        return null;
      }
      expect(ReactDOM.hydrate( <StatelessComponent /> , div)).toEqual(ReactDOM.render( <StatelessComponent /> , div));
    });
    it('renders ReactDOM.hydrate(nonWhiteListedValues, div) on values returned', () => {
      const div = document.createElement('div');
      const StatelessComponentNotReturnNull = () => {
        const nonWhiteListValues = [{}, undefined, 0];
        const index = Math.floor(Math.random() * whiteListValues.length)
        return nonWhiteListValues;
      }
      try {
      } catch(err){ 
        try {
          expect(ReactDOM.hydrate( <StatelessComponentNotReturnNull /> , div)).toEqual(null);
        } catch(err){
          console.error("Jest: `it` and `test` must return either a Promise or undefined.")
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
    it('testing ReactDOM.unmountComponentAtNode(<StatelessComponent />) on values returned', () => {
      const div = document.createElement('div');
      expect(ReactDOM.unmountComponentAtNode(div)).toEqual(false)

      const StatelessComponent = () => {
        return<div><h1>Hello</h1></div>
      }
      expect(ReactDOM.render(<StatelessComponent />, div))
      expect(ReactDOM.unmountComponentAtNode(div)).toEqual(true)
      expect(ReactDOM.unmountComponentAtNode(div)).toEqual(false)
    });
    it('testing ReactDOM.unmountComponentAtNode(<ContainerComponent />) on values returned', () => {
      const div = document.createElement('div');      
      class ContainerComponent extends Component {
        constructor(props){
          super(props);
        }
        render() {
          return (<div></div>);
        }
      }
      expect(ReactDOM.render(<ContainerComponent/>, div))
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
      const StatelessComponent = () => {
        const index = Math.floor(Math.random()*2)
        const elementGiven = [
          <div></div>, 
          <div><h1></h1></div>,
          <div><h1>Hello</h1></div>
        ];
        return <div><h1>Hello</h1></div>;
      }
      const statelessComponentChosen = new Promise((resolve, reject) => {
        const componentChosen = <StatelessComponent />
        if(true){
          resolve(componentChosen)
        }
      })
      statelessComponentChosen
      .then((componentChosen) => {
        expect(ReactDOM.render(componentChosen, div))
        expect(ReactDOM.render(componentChosen, div2))
        expect(ReactDOM.findDOMNode(div)).toEqual(div2)
      })
    });
    it('testing ReactDOM.findDOMNode(<div></div>) on values returned', () => {
      try {
        expect(ReactDOM.findDOMNode(<div></div>))
      } catch(err) {
        // console.error("Invariant Violation: Argument appears to not be a ReactComponent. Keys: $$typeof,type,key,ref,props,_owner,_store")        
      }
    });
    it('testing ReactDOM.findDOMNode(<StatelessComponent />) on values returned', () => {
      const div = document.createElement('div');
      const StatelessComponent = () => {
        return<div><h1>Hello</h1></div>
      }
      expect(ReactDOM.render(<StatelessComponent />, div)).toEqual(null)
      try {
        expect(ReactDOM.findDOMNode(<StatelessComponent />))
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
    it('ReactDOM.createPortal(child, container)', () => {
      
    })
  })
})