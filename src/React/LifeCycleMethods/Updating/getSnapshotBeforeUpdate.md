# getSnapshotBeforeUpdate()

## How to use
getSnapshotBeforeUpdate() is invoked right before the most recently rendered output is committed to e.g. the DOM - called right before mutations are made (e.g. before the DOM is updated)

It enables your component to capture current values (e.g. scroll position) before they are potentially changed. Any value returned by this lifecycle will be passed as a parameter to componentDidUpdate().

## What part does it play in the component lifecycle
Both getSnapshotBeforeUpdate and componentWillUpdate should cover all use cases of componentWillUpdate, this also helps supports async rendering