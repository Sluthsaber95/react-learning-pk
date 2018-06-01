# componentDidUpdate
componentDidUpdate(prevProps, prevState, snapshot)
componentDidUpdate() is invoked immediately after updating occurs. This method is not called for the initial render.

Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).

If your component implements the getSnapshotBeforeUpdate() lifecycle, the value it returns will be passed as a third “snapshot” parameter to componentDidUpdate(). (Otherwise this parameter will be undefined.)