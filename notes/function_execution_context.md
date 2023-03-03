# Function Execution Context

When a JS function is invoked it has access to an _object_ called the **execution context** of that function, which is accessible through the `this` keyword. The object that `this` refers to depends on _how_ the function was invoked.

There are two types of execution contexts:

1. **Implicit**: an execution context that JS sets _implicitly_.
2. **Explicit**: an execution context that _you_ set _explicitly_.

## _Implicit_ Function Execution Context

The **implicit function execution context** (also known as implicit binding for functions) is the execution context (an object) bound to a function at invocation, when _not_ supplying an explicit context. JS binds such functions to the _global object_ at invocation.

```js
function saySomething() {
  console.log("What is 'this': " + this);
}
  
saySomething(); // What is 'this': [object Window]
```

In the example above, the `saySomething` function is being invoked, we can determine it is a function and not a method because it is not being called with a _receiver_. At invocation, JS implicitly binds the function invocation to the global object as its execution context. Therefore, any references to `this` within the function definition will reference the window object (because that is the browser's global object).

When in strict mode, JS binds implicitly binds functions invocations to undefined as its execution context.

```js
"use strict";
  
function saySomething() {
  console.log("What is 'this': " + this);
}
  
saySomething(); // What is 'this': undefined
```

Binding a function to its execution context occurs **when you invoke the function, not when you define it**.

## _Implicit_ Method Execution Context

The **implicit method execution context** is the execution context (an object) bound to a method (any function referenced as an object property) at invocation when _not_ supplying an explicit context. JS implicitly binds such methods to the _calling object_ at invocation.

```js
let myObj = {
	name: 'Chris',
	saySomething() {
		console.log("What is 'this': " + this);
	},
}

myObj.saySomething(); // What is 'this': [object Object]
```

It's important to understand that binding a method to its execution context occurs **when you invoke the method, not when you define it**. In the code below, assigning the `saySomething` method to a new variable (`saySomethingFunc`) and invoking it as a function implicitly binds the function to the global object (`window`) as its execution context. Whereas, invoking the `saySomething` method on the `myObj` object implicitly binds the method to the receiver (the `myObj` object) as the execution context.

```js
let myObj = {
  name: 'Chris' ,
  saySomething() {
    return this;
  },
}
  
let saySomethingFunc = myObj.saySomething;
  
saySomethingFunc() === myObj; // false
saySomethingFunc() === window; // true
myObj.saySomething() === myObj; // true
myObj.saySomething() === window; // false
```

## _Explicit_ Function Execution Context

To _explicitly_ set the execution context of a function JS gives us the `call` and `apply` methods. This allows us to invoke the function and explicitly set the functions execution context to our desired object at that time.

```js
let myObj = {
  name: 'Chris',
  saySomething() {
    return this;
  },
}
  
let saySomethingFunc = myObj.saySomething;
  
saySomethingFunc() === window;           // true
saySomethingFunc.call(myObj) === myObj;  // true
saySomethingFunc.apply(myObj) === myObj; // true
```

### The `call` method

The `call` method can also pass a list of arguments to the function. 

```js
someObject.someMethod.call(context, arg1, arg2, arg3, ...)
```

### The `apply` method

The `apply` method is identical to the `call` method, except that it takes an optional array to pass in arguments.

```js
someObject.someMethod.apply(context, [arg1, arg2, arg3, ...])
```
