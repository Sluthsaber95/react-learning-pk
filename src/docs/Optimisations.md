# Optimisations
## Active Optisations
### Test Flow 
#### Careful what setup & assertions you share
- Easy to red test are nice, but never at the expense of "changeability"
- Put shared setup in functions

- Reduce the amount of code paths in a function
- Test sub-functions independently
- Functional Programming help testability

#### Co-locate files
- Created a folder per component
- Place all related files together
- Place test, stories there too!
- Container and presenation component can be colocated

#### Jest Tips
- Use a config file, so it's clear when it's being changed
- Enable  `clearMocks`
- Use mocks files over inline manual mocks
- You can combine snapshot-testing with old-style-assertions
- Use it() to encapsulate a test, and use fit() that acts like it.only()
- Coverage Report - yarn test -- --coverage

## Dormant Optimisations
### Jest Tests
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

### Disable JSDom
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

#### What is JSDom?
`jsdom` is a whole browser DOM emulated in javascript, you can imagine that is not a small code footprint. For more details see [jsdom](https://www.npmjs.com/package/jsdom)
Now however will document be undefined, so any test that depend on the DOM will be null or have a reference error.



### Optimising Jest in CI
- [Travis CI](https://www.npmjs.com/package/performance-react#travis-ci)
- CI Server - using the `jest --runInBand` speeds up jest test duration by 50% on CI servers [StackOverFlow Jest --runInBand]
(https://stackoverflow.com/questions/43864793/why-does-jest-runinband-speed-up-tests)
- Adjust Jest's `--maxWorkers` param and reduce your CI runtime by ~70%.

- CodeMod - used to altercode on massive scale, like supercharging regex replace scripts


### React Performance tools
[More details](https://reactjs.org/docs/perf.html)

### Testing Best Practices: Tip #1
Start with the simplest part of the function, such as a function/method.
Split larger function into smaller functions - Source:  [Testing Made Easy, Better Stronger Unit and Integration](https://pusher.com/sessions/meetup/js-monthly-london/testing-made-easy-better-faster-stronger-unit-tests-and-integration-tests)

### Future Learning Improvement: Faking Functions/Methods
__Current course of action__ - just to empirically test a method or class, from the most often used test cases and/or test cases that will aid me to help me understand the method or class better.

__Suggested New Course__ - What I was trying to do was to mock a function from scratch and see exactly what it consume and return - which was I have to admit a better way, to test a new library.
So the decision is to stay with this new course of action, but not update any of the other current tests that have been produced, I can back to them to update them some time in the future if necessary.

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
[Interoperable CSS](https://glenmaddern.com/articles/interoperable-css). Use Sinon to spy on componentDidMount