# Learning List

## Topics of relevance
Please Note that these are the topics that are hand picked based on the pareto principle. Topics mentioned here have completed/in-depth tests devoted to explaining the method/class

- ReactDOM
- React.Component
- React.PureComponent
- React.cloneElement
- React.Children
- React.Fragment
- React.isValidElement
- DOMElements
  - className
  - style - use the `jest-styled-components` module to test with 
- Component Lifecycle
  - Mounting - i.e. before component is mounted
    - constructor()
    - static getDerivedStateFromProps()
    - render()
    - componentDidMount()
  - Updating
    - componentWillReceiveProps() / UNSAFE_componentWillReceiveProps()
    - static getDerivedStateFromProps()
    - shouldComponentUpdate()
    - render()
    - getSnapshotBeforeUpdate()
    - componentDidUpdate()
  - Upmounting
    - componentWillUnmount()
  - Error Handling
    - componentDidCatch()
  - Additional Inclusive API - i.e. defaultProps requires an import so it's exclusive
    - setState()
    - forceUpdate()
  - Class Properties
    - defaultProps
    - displayName
  - Instance Properties
    - props
    - state

- Using Sinon.js
  - Spies - A test spy is a function that records arguments, return value, the value of this and exception thrown (if any) for all its calls.
  - Spy Types
    - 1) Are anonymous functions
    - 2) Used tp wrap methods that already exist in the system under test.
  - Just discovered how mounting affects the results using the spies
  - Major downside to sinon.js - 667.7k gzipped: 231.6k, which isn't a big of problem - just package download speed may be slow


## Topics not prioritised
### React ^16.3
Why Not?
- React.createElement
No need to use ES5 to create react components anymore, much quicker to develop with ES6 and code looks cleaner.

Why Not?
React Docs for [Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html), advise:
- React.createRef
- React.forwardRef
- Using refs for anything that can be done declaratively
- Will make where the state should be owned, be unclear - usually at a higher level in the hierarchy
Testing Tools
- [ShallowRenderer](https://reactjs.org/docs/shallow-renderer.html)
  - requires you import 'react-test-renderer/shallow'
  - just enzyme API -  it's much nicer
  - Shallow testing does not support refs
- [TestUtilities](https://reactjs.org/docs/test-utils.html)
  - Additional Util used with TestRenderer and Enzyme, with a simple API, this includes
    - isDOMComponent
    - isCompositeComponent
- [TestRender](https://reactjs.org/docs/test-renderer.html)
  - Don't see any additional advantages of using it over Enzyme. to keep the testing simple, I will only included whenever necessary, e.g. testing styled-components
- JS Env Requirements - are self explanatory

### JS
#### ECMAScript 2017 
Async & Await - for asynchronous JavaScript - significant boost in performance

## Topics to Avoid
Why Not?
- Component Lifecycle
  These lifecycle methods will be removed as of React 17 meaning that the code I won't have reverse compatibility; due to there unsafe nature, for [more details](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)
    - componentWillMount() / UNSAFE_componentWillMount()
    - componentWillUpdate() / UNSAFE_componentWillUpdate()

Use cases for "Refs"
- you need to imperatively modify a child outside of the typical dataflow

## Miscellaneous
### Developing Components in Isolation
[React Storybook](https://github.com/storybooks/storybook)

### Difference between shim and polyfill
See [Shim and Polyfill](https://stackoverflow.com/questions/6599815/what-is-the-difference-between-a-shim-and-a-polyfill) for more details.

A shim is any piece of code that performs interception of an API call and provides a layer of abstraction. It isn't necessarily restricted to a web application or HTML5/CSS3.

A polyfill is a type of shim that retrofits legacy browsers with modern HTML5/CSS3 features usually using Javascript or Flash.

Answering your specific question, call it your directory shims if you want to keep the directory generic.

### Vocab
#### stale data
In computer processing, if a processor changes the value of an operand and then, at a subsequent time, fetches the operand and obtains the old rather than the new value of the operand, then it is said to have seen stale data.