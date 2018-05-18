# React.cloneElement() [INCOMPLETE]

React.cloneElement() is almost equivalent to:

<element.type {...element.props} {...props}>{children}</element.type>

## List of what is being studied
React.cloneElement()
<element.type {...element.props} {...props}>{children}</element.type>

## Queries
For Tests:

1) testing "ref" of <element.type></element.type> compared to React.cloneElement()

Quoted: In React Documentation - New children will replace existing children. key and ref from the original element will be preserved

Is the above paragraph actually true? I tried testing it in my own way, with Enzyme and couldn't prove this statement to be true

