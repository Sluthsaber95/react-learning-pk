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

## Topics not prioritised
Why Not?
- React.createElement
No need to use ES5 to create react components anymore, much quicker to develop with ES6 and code looks cleaner.

Why Not?
- React.createRef
- React.forwardRef
React Docs for [Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html), advise:
- Using refs for anything that can be done declaratively
- Will make where the state should be owned, be unclear - usually at a higher level in the hierarchy

Use cases for "Refs"
- you need to imperatively modify a child outside of the typical dataflow


## Research
How to Speed up unit tests

Anything slower than 3 seconds is unacceptable - when you are developing, you really want instant feedback

## Want to learn this

What is `this` in a component? what does it return