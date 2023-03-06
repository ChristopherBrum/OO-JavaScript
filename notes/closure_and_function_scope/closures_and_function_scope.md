# Closures and Function Scope

## Closure and Function review

Functions can be created using the `function` keyword in two main ways:

- Function declarations
- Function expressions (includes array functions)

```js
// function declaration syntax
function sayHi() {
  console.log("Hi there.");
}

// function expression syntax
let sayHi = function() {
  console.log("Hi there.");
}

// function expression -- arrow function
let sayHi = () => {
  console.log("Hi there.");
}
```

Function expression syntax is generally handy when passing in a function to another function as an argument or return value. For example, as a callback function when invoking `Array.prototype.map` or `Array.prototype.forEach`.

```js
let arr = [1, 2, 3, 4, 5].map(function(num) {
  return num * 10;
});

console.log(arr); // [10, 20, 30, 40, 50]
```

A more in-depth review of Closures and Function Scope.

---

## Higher-Order Functions

Higher-order functions are functions that can accept a function as an argument, return an argument, or both.

In the example below, we are passing a function expression to the `Array.prototype.forEach` method as an argument.

```js
[1, 2, 3, 4, 5].forEach(function(num) {
  console.log(num * 10);
});

// 10
// 20
// 30
// 40
// 50
```

We can also return a function from a higher-order function.

```js
function sayHiTo(name) {
  return function() {
    console.log(`Hi there ${name}`);
  }
}


let sayHiToChris = sayHiTo('Chris');
sayHiToChris(); // 'Hi there Chris'
```

A higher-order function can also take a function as an argument _and_ return a function.

```js
function greet(name) {
  return function(timeOfDay) {
    if (timeOfDay === 'morning') {
      console.log(`Good morning ${name}`);
    } else if (timeOfDay === 'afternoon') {
      console.log(`Good afternoon ${name}`);
    } else if (timeOfDay === 'evening') {
      console.log(`Good evening ${name}`);
    }
  }
}

let greetChris = greet('Chris');
greetChris('morning');   // 'Good morning Chris'
greetChris('afternoon'); // 'Good afternoon Chris'
greetChris('evening');   // 'Good evening Chris'
```

---

## Closures and Private Data

Functions _close over or enclose_ everything that is within scope at their definition point, which is why they are called _closures_. They retain access to the artifacts contained within their closure regardless of where the function is invoked within the program.

```js
function makePerson(name) {
  let age = 0;
  
  return function() {
    age += 1;
    console.log(`${name} is ${age} year(s) old!`);
  }
}

let chrisAge = makePerson('Chris');
chrisAge(); // Chris is 1 year(s) old!
chrisAge(); // Chris is 2 year(s) old!
chrisAge(); // Chris is 3 year(s) old!

let adrienneAge = makePerson('Adrienne');
adrienneAge(); // Adrienne is 1 year(s) old!
adrienneAge(); // Adrienne is 2 year(s) old!
adrienneAge(); // Adrienne is 3 year(s) old!

chrisAge(); // Chris is 4 year(s) old!
```

In the example above, the local variable `age` declared in the `makePerson` function, is inaccessible outside of the function. This presents the opportunity to create private data, that cannot be accessed directly but can still be accessed by the function's closure.

---

## Objects and Closures

Through the use of higher-order functions, we are able to create a function that returns a function. And through the closure of the returned function, we can retain access to variables declared within the original function that is inaccessible anywhere else. This presents us the opportunity to interact with the private through the returned function but gives a rather awkward interface to do so. In this scenario, the only way to adjust the behavior of the returned function would be through arguments passed in.

```js
function makePerson(name) {
  let age = 0;
  
  return function(occupation = null) {
    age += 1;
    if (occupation) {
      console.log(`${name} is a ${occupation} and is ${age} year(s) old!`);
    } else {
     console.log(`${name} is ${age} year(s) old!`); 
    }
  }
}

let chrisAge = makePerson('Chris');
chrisAge(); // Chris is 1 year(s) old!
chrisAge(); // Chris is 2 year(s) old!
chrisAge(); // Chris is 3 year(s) old!
chrisAge('programmer'); // Chris is programmer and is 3 year(s) old!
```

This is not ideal, and the number of arguments you can pass in is limited.

An improvement to this scenario would be to return an object that contains the state and behaviors that you would want access to. This makes the interface much cleaner and easier to interact with. Additionally, this gives you more options for how to organize your code.

```js
function makePerson(name, occupation = null) {
  return {
    age: 0,
    name,
    occupation,
    hasBirthday() {
      this.age += 1;
    },
  }
}

let chris = makePerson('Chris', 'Programmer');
chris.name; // Chris
chris.occupation; // Programmer
chris.age; // 0
chris.hasBirthday();
chris.age; // 1
```

---

## Using Closures and Objects to Create Private Data

The above example is a step in the right direction, but it has also eliminated the privatization of data that we had achieved when returning a function from a function invocation. To our luck, we can still achieve creating private data through closures when returning an object from a function by extracting the data from our object and leaving it in the function body.

In the previous example (shown below), our data was still exposed to the public interface and could be manipulated by anyone.

```js
function makePerson(name, occupation = null) {
  return {
    age: 0,
    name,
    occupation,
    hasBirthday() {
      this.age += 1;
    },
  }
}

let chris = makePerson('Chris', 'Programmer');
console.log(chris.name); // Chris
chris.name = 'Mandy';
console.log(chris.name); // Mandy

console.log(chris.occupation); // Programmer
chris.occupation = 'Carpenter';
console.log(chris.occupation); // Carpenter

console.log(chris.age); // 0
chris.age = 100;
console.log(chris.age); // 100
```

By removing the raw data from the returned object, it is no longer accessible in the public interface, thus becoming private. The data is _only_ accessible via the methods of the object being returned, by way of closure. This does mean that appropriate methods must be defined in order to interact with the object's data.

```js
function makePerson(name, occupation) {
  age = 0;
  
  return {
    name() { console.log(name) },
    age() { console.log(age) },
    occupation() { console.log(occupation) },
    hasBirthday() {
      age += 1;
    },
  }
}

let chris = makePerson('Chris', 'Programmer');

chris.name();       // Chris
chris.age();        // 0
chris.occupation(); // Programmer

chris.hasBirthday();
chris.age();        // 1
chris.hasBirthday();
chris.age();        // 2

chris.age() = 100;  // Uncaught ReferenceError
```
