# style attribute
Please note this is just 2 of 4 main ways to include 
List of all 3 main ways to include css - exclude any details on scss

## Importing css modules [INCOMPLETE]
Testing the css modules require the need to eject react project and the 'identity-obj-proxy' npm package, for more details see [Mocking CSS Modules](https://facebook.github.io/jest/docs/en/webpack.html#mocking-css-modules)

Only these options are supported out of the box of React

  • collectCoverageFrom
  • coverageReporters
  • coverageThreshold
  • snapshotSerializers

```
import React, { Component } from 'react';

import styles from './App.css'; // CSS Modules here

export default class App extends Component {
  render() {
    return (
      <div className={styles.root}>
        <h1 className={styles.hello}>Hello, world!</h1>
      </div>
    );
  }
}
```

Please see the [identity-obj-proxy](https://github.com/keyanzhang/identity-obj-proxy)

## Inline styling
This is advises against when xit comes to performance, in terms of 
  - CSS being cacheable - blazing fast

## Styled Components
Supports React and React-Native, for more details see [Styled Components Basics](https://www.styled-components.com/docs/basics)
