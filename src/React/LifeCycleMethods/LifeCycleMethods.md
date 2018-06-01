# LifeCycleMethods
Note: I think the best to gain experience using these method, is to use them to build app and come across when I should use them.
Thus this document is INCOMPLETE and requires more use cases, to understand the these lifecycle methods more - testing them are not so easy
These methods or hooks are used to update the UI application state

## The Component Lifecycle
[Copy Pasted from Docs [React.Component](https://reactjs.org/docs/react-component.html)]

Each component has several “lifecycle methods” that you can override to run code at particular times in the process.

Methods prefixed:
-  `will` are called right before something happens
-  `did` are called right after something happens

Dan Abramov React [lifecycle Method Diagram](https://twitter.com/dan_abramov/status/981712092611989509) has a more detail graphical overview for all 

### Mounting
- constructor()
- static getDerivedStateFromProps()
- componentWillMount() / UNSAFE_componentWillMount()
- render()
- componentDidMount()

### Updating
- componentWillReceiveProps() / UNSAFE_componentWillReceiveProps()
- static getDerivedStateFromProps()
- shouldComponentUpdate()
- componentWillUpdate() / UNSAFE_componentWillUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

### Unmounting
- ComponentWillUnmount

## Instance Properties and Class Properties
### Difference between class and instance
In OOP object is
  - created from classes through subroutines called constructors and destroyed by destructor
  - an instance of a class - created through instantiation/constructor
Hence:

### Difference between class properties and instance properties
- Class properties - are properties that inherited by each instance of class, any instance of that class can use them properties. Such as
  - defaultProps
  - displayName
  Another way to explain this. The properties are accessible to any instnce of that class

- Instance properties - are properties that are only created in terms of state or utilized as props, once the object is instantiated.
  Another to put it is, is that these properties do not exist, until the object is instanciated. 
  When the object is instanciated however, the instance has access to these 2 instance properties
  - props
  - state


### Order of Methods/Hooks
1. constructor - If you “fork” props by using them for state, you might also want to implement getDerivedStateFromProps() to keep the state up-to-date with them. As in `this.state = { propUsed: props.propUsed }`. But lifting state up is often easier and less bug-prone.

2. getDerivedStateFromProps - is invoked right before calling the render method, both on the initial mount and on subsequent updates. It should return an object to update the state, or null to update nothing.

Note that this method is fired on every render, regardless of the cause. This is in contrast to UNSAFE_componentWillReceiveProps, which only fires when the parent causes a re-render and not as a result of a local setState.

## Miscellaneous
### Async Rendering
Beyond React 16
(https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html)