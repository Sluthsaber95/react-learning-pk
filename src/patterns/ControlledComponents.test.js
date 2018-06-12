import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom/cjs/react-dom.development';
import context from 'jest-plugin-context';
import { mount } from 'enzyme'; // 348 K
import sinon from 'sinon';
import '../enzyme-setup'

describe('Testing out the Form components', () => {
  context('<ControlledComponent />', () => {
    class ControlledComponent extends Component {
      constructor(props) {
        super(props);
        this.state = {
          value: 'Initial Value'
        }
        this.handleChange = this.handleChange.bind(this);
      }
      handleChange(event) {
        this.setState(prevState => {
          return {
            value: event.target.value
          }
        })
      }
      render() {
        return (
          <Fragment>
            <form>
              <h1>Criminal Investigation</h1>
              <label>Name:</label>
              <input type="text" onChange={this.handleChange} value={this.state.value} />
            </form>
            <p>Name of the assailant: {this.state.value}</p>
          </Fragment>
        )
      }
    }
    it('<ControlledComponent /> renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<ControlledComponent />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    it('<ControlledComponent /> typed Value shown in <p> tag ', () => {
      const spy = sinon.spy(ControlledComponent.prototype, 'handleChange');
      const wrapper = mount(<ControlledComponent />);
      const valueTyped = 'Dracula';
      const input = wrapper.find('input');
      const p = wrapper.find('p');
      
      expect(wrapper.state().value).toBe("Initial Value");
      input.getDOMNode().value = valueTyped;
      input.simulate('change');
      expect(spy.calledOnce).toBe(true);
      expect(wrapper.state().value).toBe(valueTyped);
      expect(p.text()).toBe("Name of the assailant: " + valueTyped);
    });
  })
  context('<SubmitForm />', () => {
    class SubmitForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          input: '',
          submit: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
        this.setState({
          input: event.target.value
        });
      }
      handleSubmit(event) {
        // change code below this line
        this.setState({ submit: this.state.input })
        event.preventDefault();
        // change code above this line
      }
      render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <h1>{this.state.submit}</h1>
              <input
                onChange={this.handleChange}
                value={this.state.input}
              />
              <button type='submit'>Submit!</button>
            </form>
          </div>
        );
      }
    };
    it('<SubmitForm /> renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<SubmitForm />, div);
      ReactDOM.unmountComponentAtNode(div);
    })
    it('<SubmitForm /> handleSubmit should change text in the h1 element', () => {
      const spy = sinon.spy(SubmitForm.prototype, 'handleSubmit');
      const wrapper = mount(<SubmitForm />);

      const valueTyped = 'Dracula';
      const input = wrapper.find('input');

      expect(wrapper.state().input).toBe('');
      expect(wrapper.state().submit).toBe('');
      input.getDOMNode().value = valueTyped;
      input.simulate('change');

      expect(wrapper.state().input).toBe(valueTyped);

      wrapper.find('button').simulate('submit');
      expect(spy.calledOnce).toBe(true);
      expect(wrapper.find('h1').html()).toBe(`<h1>${valueTyped}</h1>`);
    })
  });
})