# componentWillUnmount [INCOMPLETE]
Note: Insufficient test cases and not finding any valid way to testing componentWillUnmount, can only test for calls, and it is not used to return a value.

Basically asking for ways to test whether a method has unmounted successfully...

## When is it invoked?
componentWillUnmount() is invoked immediately before a component is unmounted and destroyed. 

## How to use
Perform any necessary cleanup in this method, such as 
- invalidating timers
- canceling network requests 
- cleaning up any subscriptions that were created in componentDidMount(). 

You should not call setState() here because the component will never be re-rendered.

## Why use?
[ UNKNOWN ], like why is cleanup that important, is for performance reasons, related to rendering/reusing the component in some way.
