import React, { Component, Fragment } from 'react';
import context from 'jest-plugin-context';
import { shallow, mount } from 'enzyme'; // 348 K
import '../../enzyme-setup'

describe('Testing out the React.Fragment', () => {
  context('React.Fragment', () => {
    it('testing React.Fragment on values returned', () => {
      try {
        expect(React.Fragment).toBe() // Symbol(react.fragment)
      } catch (error) { }
    });

    it('testing <Fragment /> on values returned', () => {
      class ListComponentFrag extends Component {
        render () {
          return (
            <Fragment>
              <li>Item One</li>
              <li>Item Two</li>
              <li>Item Three</li>
            </Fragment>
          )
        }
      }
      class ListComponent extends Component {
        render () {
          return (
            <div>
              <li>Item One</li>
              <li>Item Two</li>
              <li>Item Three</li>
            </div>
          )
        }
      }
      class NestedList extends Component {
        render () {
          return (
            <div>
              <ListComponentFrag />
            </div>
          )
        }
      }

      // Here Fragment treats all the <li /> elements as if it was one element, without the <div /> infestation
      const ListWrapper = shallow(<ListComponentFrag />)
      expect(ListWrapper).toHaveLength(1)
      expect(ListWrapper.children()).toHaveLength(3)
      expect(ListWrapper.html()).toBeTruthy() // <li>Item One</li><li>Item Two</li><li>Item Three</li>

      const encapsulatedListWrapper = shallow(<ListComponent />)
      expect(encapsulatedListWrapper).toHaveLength(1)
      expect(encapsulatedListWrapper.children()).toHaveLength(3)
      expect(encapsulatedListWrapper.html()).toBeTruthy() // <div><li>Item One</li><li>Item Two</li><li>Item Three</li></div>

      const nestedFragWrapper = mount(<NestedList />)
      expect(nestedFragWrapper).toHaveLength(1)
      expect(nestedFragWrapper.children()).toHaveLength(1)
      expect(nestedFragWrapper.children().props().children).toBeTruthy() // <ListComponentFrag />
      expect(nestedFragWrapper.html()).toBeTruthy() // <div><li>Item One</li><li>Item Two</li><li>Item Three</li></div>
      expect(nestedFragWrapper.html()).toBe(encapsulatedListWrapper.html())
    });
    it('testing <Fragment keys={id}/> on values returned', () => {
      function Glossary(props) {
        return (
          <dl>
            {props.items.map(item => (
              // Without the `key`, React will fire a key warning
              <React.Fragment key={item.id}>
                <dt>{item.term}</dt>
                <dd>{item.description}</dd>
              </React.Fragment>
            ))}
          </dl>
        );
      }
      class Definitions extends Component {
        constructor(props){
          super(props);
        }
        render(){
          return (
              <Glossary items={this.props.items}/>
          )
        }
      }
      const wordList = [
        {
          id: 1,
          term: "machiavellian",
          description: "cunning, scheming, and unscrupulous, especially in politics."
        },
        {
          id: 2,
          term: "Orwellian",
          description: "dystopian account of a future totalitarian state "
        },
      ]
      const wrapper = mount(<Definitions items={wordList}/>)
      expect(wrapper.children().props()).toBeTruthy()
    })
    // All pending tests that are are marked `xit` are still incomplete  
    xit('testing </> on values returned; i.e. empty tags', () => {
      /*
      React 16 and above docs mention that alot of tools do not currently support it; i.e Jest
      */
    })
  })
})