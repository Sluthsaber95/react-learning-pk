# shouldComponentUpdate

## What it does
shouldComponentUpdate - is used to compare the 
- nextState with currentState
- nextProps with currentProps
And if any of them have changed, it's recommend to return back false, whenever there is a change, so that react know what specific parts to change.

Note: Returning false does not prevent child components from re-rendering when their state changes.
In the test file; shouldComponentUpdate.test.js

```
shouldComponentUpdate(nextProps, nextState){
  return this.state !== nextState;
}
```
You can go one step further and be more specific with the props and state

From engineering standpoint, react should do more work whenever props or state have changed, but with shouldComponentUpdate. You can explicitly mention which new props and new states changes to listen for and return false when no changes from either have taken place. This should have significant impact on UI update speed, if your component has to rerender many subcomponents; this is my hypothesis react should do less work as the rerender of the component should be about the same.

## How it works
To do this React keeps in memory two versions of the DOM:
- the version of the DOM currently displayed
- the next version of the DOM to be displayed

It compares the two and updates the displayed DOM with only the parts that have changed. This process is called tree reconciliation. The root of the tree evaluated for reconciliation is a component which props have changed.

## Main Usage
### TLDR;
shouldComponentUpdate is used as an optimisation tool


If you have a state that is a calculation from multiple props, you could do the calculation here. Don’t forget to check if your relevant props have really changed (compare this.props to nextProps)

## When should you use it?

http://jamesknelson.com/should-i-use-shouldcomponentupdate/
https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/update/using_should_component_update.html

## Pros and Cons

Cons: do not use shouldComponentUpdate() to prevent renders in such cases - The logic inside shouldComponentUpdate should only look at what is relevant to the component. It should never anticipate the contexts the component is used in. The reason is just that your code would quickly become unmaintainable.
