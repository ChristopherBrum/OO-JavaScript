# Partial Function Application

Partial function application is achieved by passing _some_ arguments to a function invocation that then returns a function, with the remaining arguments passed in when the returned function is invoked.

We can think about partial function application utilizing three separate functions to accomplish this: a _primary function_, a _generator function_, and an _applicator function_.

- The _generator function_ returns a new function (the _applicator function_) that invokes the _primary function_.
- The _generator accepts_ some of the arguments at invocation and the _applicator function_ receives the rest at invocation.
- The applicator function calls the _primary function_ passing in all arguments, both those passed to _generator function_ and the _applicator function_.

```js
function primaryFunc(arg1, arg2) {
  console.log(arg1);
  console.log(arg2);
}

function generatorFunc(arg1) {
  return function(arg2) { // applicator func
    return primaryFunc(arg1, arg2);
  }
}

let applicatorFunc = generatorFunc('YO!');
applicatorFunc('WHAZZUP!');
```

An important thing to keep in mind is that closure is what allows us to access the value passed in to the generator function. In essence, this allows us to define private data that persists for the lifetime of the function and is very useful when we need to package data _and_ functionality together.

```js
function multiply(num1, num2) {
  return num1 * num2;
}

function timesN(num1) {
  return function(num2) {
    return multiply(num1, num2);
  }
}

let timesTen = timesN(10);
console.log(timesTen(5));    // 50
console.log(timesTen(2));    // 20
console.log(timesTen(10));   // 100

let timesSeven = timesN(7);
console.log(timesSeven(7));  // 49
console.log(timesSeven(4));  // 28
console.log(timesSeven(10)); // 70
```

## A More Flexible Approach

Another way of approaching partial function application is to create a general purpose generator function that partially applies a single argument to _any_ two-argument function.

```js
// primaries
function multiply(num1, num2) {
  return num1 * num2;
}

function add(num1, num2) {
  return num1 + num2;
}

function personalGreeting(name, greeting) {
  return greeting + name + '!';
}

// general purpose generator
function partial(func, arg1) {
  return function(arg2) {
    return func(arg1, arg2);
  }
}

let timesTen = partial(multiply, 10);
console.log(timesTen(5));  // 50
console.log(timesTen(2));  // 20
console.log(timesTen(10)); // 100

let addSeven = partial(add, 7);
console.log(addSeven(7));  // 14
console.log(addSeven(4));  // 11
console.log(addSeven(10)); // 17

let chrisGreeting = partial(personalGreeting, 'Chris');
console.log(chrisGreeting("Yo, "));          // 'Yo, Chris!'
console.log(chrisGreeting("Goodmorning, ")); // Goodmorning, Chris!
console.log(chrisGreeting("Hi, "));          // 'Hi, Chris!'
```
