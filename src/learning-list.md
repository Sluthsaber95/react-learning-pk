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
    - componentWillMount() / UNSAFE_componentWillMount()
    - render()
    - componentDidMount()
  - Updating
    - componentWillReceiveProps() / UNSAFE_componentWillReceiveProps()
    - static getDerivedStateFromProps()
    - shouldComponentUpdate()
    - componentWillUpdate() / UNSAFE_componentWillUpdate()
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


## Topics not prioritised
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

Use cases for "Refs"
- you need to imperatively modify a child outside of the typical dataflow

## Optimisation of Tests
Reason: I started see tests that are a bit slow with an estimated time of 4s. So today will be spent on test optimisation

Every single test in Jest receives a fresh new copy of all modules, including new versions of all mocked dependencies which take a lot of time to generate for each test. A side effect of this is that we had to call require manually before every test, like this:
```
let sum;
describe('sum', () => {
  beforeEach(() => {
    sum = require('sum');
  });
  it('works', () => {
    expect(sum(5, 4)).toEqual(9);
  });
  it('works too', () => {
    // This copy of sum is not the same as in the previous call to `it`.
    expect(sum(2, 3)).toEqual(5);
  });
});
```

### Inline Requires
Note: Requires - the current solution is to eject the create-react-app project

One special thing we do in Jest is reset the entire module registry after every single test (call to it) to make sure tests don't depend on each other.

1. Every single test in Jest receives a fresh new copy of all modules, including new versions of all mocked dependencies which take a lot of time to generate for each test. With every use of sum in the file will be replaced by require('sum') - this avoids reloading all dependencies every test run

- May want to try out babel-inline-import (https://www.npmjs.com/package/babel-plugin-inline-import)
- A great side-effect of inline requires is that we only require the modules that we actually use within the test itself, instead of all the modules we used in the entire file.

describe('sum', () => {
  it('works', () => {
    expect(require('sum')(5, 4)).toEqual(9);
  });
});

## Disable JSDom
Original source: https://medium.com/@kevinsimper/how-to-disable-jsdom-in-jest-make-jest-run-twice-as-fast-a01193f23405

Note: this requires that you eject your create-react-app project

```
// package.json
...
"jest": {
  "testEnvironment": "node"
},
...
```
Oh and by the way, React needs `JSDom` to render HTML elements, so removing it is not an object

### What is JSDom?
`jsdom` is a whole browser DOM emulated in javascript, you can imagine that is not a small code footprint. For more details see [jsdom](https://www.npmjs.com/package/jsdom)
Now however will document be undefined, so any test that depend on the DOM will be null or have a reference error.

## Miscellaneous

- CodeMod - used to altercode on massive scale, like supercharging regex replace scripts

### Optimising Jest in CI
- [Travis CI](https://www.npmjs.com/package/performance-react#travis-ci)
- CI Server - using the `jest --runInBand` speeds up jest test duration by 50% on CI servers [StackOverFlow Jest --runInBand]
(https://stackoverflow.com/questions/43864793/why-does-jest-runinband-speed-up-tests)
- Adjust Jest's `--maxWorkers` param and reduce your CI runtime by ~70%.

### Careful what setup & assertions you share
- Easy to red test are nice, but never at the expense of "changeability"
- Put shared setup in functions

- Reduce the amount of code paths in a function
- Test sub-functions independently
- Functional Programming help testability

### Co-locate files
- Created a folder per component
- Place all related files together
- Place test, stories there too!
- Container and presenation component can be colocated

### Jest Tips
- Use a config file, so it's clear when it's being changed
- Enable  `clearMocks`
- Use mocks files over inline manual mocks
- You can combine snapshot-testing with old-style-assertions
- Use it() to encapsulate a test, and use fit() that acts like it.only()
- Coverage Report - yarn test -- --coverage

### jest.fn()
Used to mock functions

### Developing Components in Isolation
[React Storybook](https://github.com/storybooks/storybook)

## Testing Tool
- Puppeteer + Jest + Chai + Sinon

### Split larger function into smaller functions
Source:  [Testing Made Easy, Better Stronger Unit and Integration](https://pusher.com/sessions/meetup/js-monthly-london/testing-made-easy-better-faster-stronger-unit-tests-and-integration-tests)

### CSS Modules
- for each class include at the start. :local(className)

#### Modularising CSS code with react
```
import url from './logo.png';
import styles from './main-nav.css';
export default class MainNav extends React.Component {
  render() {
    return <nav className={styles.Nav}>
      <img src={url} className={styles.Logo}/>
      ...
    </nav>
  }
}
```

[Interoperable CSS](https://glenmaddern.com/articles/interoperable-css)

Use Sinon to spy on componentDidMount

### Difference between shim and polyfill

See [Shim and Polyfill](https://stackoverflow.com/questions/6599815/what-is-the-difference-between-a-shim-and-a-polyfill) for more details.

A shim is any piece of code that performs interception of an API call and provides a layer of abstraction. It isn't necessarily restricted to a web application or HTML5/CSS3.

A polyfill is a type of shim that retrofits legacy browsers with modern HTML5/CSS3 features usually using Javascript or Flash.

Answering your specific question, call it your directory shims if you want to keep the directory generic.