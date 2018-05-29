# getDerivedStateFromProps

"I don’t have a great answer for you here—indeed class methods like this tend to have code that’s unsafe for async which is why we want it to be static. So yes, you’d need to pull that out if you want the code to be async-friendly. One upside of doing this is that it should be easier to test because it’s separated from the rest of the class logic." - Gaearon

Please see [gist](https://github.com/reactjs/reactjs.org/issues/721) for more details

## Use Cases
### Expensive compution on prop passed
I think in some cases moving a prop to state is the right solution.
Assume you need to perform an impossibly expensive computation based on a prop, and you want to make sure you only perform it when the prop has actually changed. And supposedly you need the computed value for rendering.

In this case, instead of doing:

```
// modified from getDerivedStateFromProps
const expensiveProcess = props => {...}

class Child extends Component {
  state = { cachedSomeProp: null}
  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.startProcess === true){
      return {
        isBeenLookedAfter: expensiveProcess(nextProps.isBeenLookedAfter)
      }
    }
    return null;
  }
  render(){
    return (
      this.state.isBeenLookedAfter
      ? <div><h1>Child is been looked after</h1></div>
      : <div><h1>Child is out of sight</h1></div>
    )
  }
}
```
From the code above, the props returns an object below

```
props = {
  startProcess: true,
  isBeenLookedAfter: true
}
```

This can be used to pass in the props and decide whether the expensive can be started or not.

## Covers componentWillReceiveProps
Current docs state, for [more details](https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops)

So instead of using componentWillReceiveProps, you will now use

- static getDerivedStateFromProps lifecycle - to calculate next state based on a change in props => For Calculation
- componentDidUpdate - needed to perform a side effect in response to prop change => For Side Effect