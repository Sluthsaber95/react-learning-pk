# React Global

## Prequisites
(none)

## Tools used
### libraries
[React](https://reactjs.org/docs/react-api.html)
[ReactDOM](https://reactjs.org/docs/react-dom.html)
[Jest](https://facebook.github.io/jest/docs/en/api.html)

## List of what is being studied

- ReactDOM.render() 
  - diffing algorithms for efficient updates
  - does not modify the container node; only appends DOM elements, modifies the children of that container
  - returns an instances of React.Component, recommend attach callback ref to reference the root ReactComponent instance if required
  - For server-rendered container use ReactDOM.hydrate() instead

- ReactDOM.hydrate()
  - React expects that the rendered content is identical between the server and the client
  - Mismatches are rare, and so validating all markup would be prohibitively expensive

### Content that is unavoidably different
Between Server and Client
Components that render something different on the client can read a state variable like this.state.isClient, which you can set to true in componentDidMount()