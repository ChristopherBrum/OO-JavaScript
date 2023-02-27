# Code Pawzzles

## Question

Examine the code below. What will be logged to the console when we invoke `arrowFunc5` on the last line?

```node
const arrowFunc1 = () => 101;
const arrowFunc2 = () => "Hi there!";
const arrowFunc3 = () => [5, 4, 3, 2, 1];
const arrowFunc4 = () => true;
const arrowFunc5 = () => {};

console.log(arrowFunc1()); // 101
console.log(arrowFunc2()); // 'Hi there!'
console.log(arrowFunc3()); // [5, 4, 3, 2, 1]
console.log(arrowFunc4()); // true
console.log(arrowFunc5()); // ???
```

## Hint

Take a look at the [MDN Documentation for Arrow Function Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) if you need a hint.

## Answer

`arrowFunc5` will log `undefined` to the console, not `{}`.

```node
const arrowFunc5 = () => {};

console.log(arrowFunc5()); // undefined
```

## Explanation

Arrow functions can have either a _concise body_ or the usual _block body_.

The curly braces (`{}`) on line 5 are considered part of the syntax that defines a **block body** for the arrow function expression. In this case, the body is empty so `undefined` is returned.

JavaScript Arrow Function Expressions can implicitly return a value if they use **concise body** syntax, which consists of a single expression and no curly braces. The Arrow function expressions on lines 1-4 are using concise body syntax, and therefore implicitly return the value of the expressions to the right of the `=>`.

To implicitly return an object (`{}`) from `arrowFunc5` using concise body syntax we can wrap the object in parenthesis.

```node
const arrowFunc5 = () => ({});

console.log(arrowFunc5()); // {}
```

To explicitly return an object (`{}`) from `arrowFunc5` using block body syntax, we can include the `return` keyword within the curly braces followed by the object to be returned.

```node
const arrowFunc5 = () => { return {} };

console.log(arrowFunc5()); // {}
```
