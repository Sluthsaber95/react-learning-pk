# void componentDidMount Method
## Introduction
Whenever this method is called, React has already rendered our component and put it into the DOM. Therefore, if there is any initialization you want to perform that relies on the DOM, do it here and now.
Any void function, does return anything, is useful for give side effects to component, by changing the value of state, or property of the class

```
// state
state = {}

// property
constructor(props){
  super(props);
  this.ref = React.createRef()
}
```

## When to use componentDidMount
Main Use
- draw on a <canvas> element that you just rendered
- initialize a masonry grid layout from a collection of 
- elements
- add event listeners
- Can call setState, but it is not recommended

DO
- cause side effects (AJAX calls etc.)

DON’T
- call this.setState as it will result in a re-render
  However I don't see any other use case, except of using setState with componentDidMount

An exception to the above rule is updating the state based on some DOM property which can be only computed once a component has re-rendered (e.g. position / dimensions of some DOM nodes). Please take extra care to prevent against updating if the value did not in fact change as it might result in a render loop.

You can’t guarantee the AJAX request won’t resolve before the component mounts. If it did, that would mean that you’d be trying to setState on an unmounted component, which not only won’t work, but React will yell at you for. Doing AJAX in componentDidMount will guarantee that there’s a component to update.

ComponentDidMount is also where you can do all the fun things you couldn’t do when there was no component to play with. Here are some examples:

