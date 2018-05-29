# constructor
Staging Component - INITIALISATION
OOP specific function that gets called whenever a new object is created
```
constructor(props){
  super(props);
}
```
This needs to be included, otherwise this.props will return as undefined.

## What is super used for?
It’s very important to call a special function super in cases where our class extends any other class that also has a defined constructor - in this case it's the abstract base class of React.Component; not React. However it rarely makes sense to refer to React.Component directly. Instead, you will typically subclass it Component, through decomposition of React.

Which can be seen from the import as `import React, { Components } from 'react'`- note decomposition is part of ES6.

## When to include
If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.

### What about initialising state
Rather than using `constructor(props)` etc. The better syntax for React 16.3

```
class ExampleComponent extends React.Component {
  state = {};

  componentWillMount() {
    this.setState({
      currentColor: this.props.defaultColor,
      palette: 'rgb',
    });
  }
}
A Simpler refactor for this type of component is to move state initialization to the constructor or to a property initializer, like so:
```

Refactored to:
```
// After
class ExampleComponent extends React.Component {
  state = {
    currentColor: this.props.defaultColor,
    palette: 'rgb',
  };
}
```