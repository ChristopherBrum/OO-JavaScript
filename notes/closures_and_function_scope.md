# Closures and Function Scope

## Closure and Function review

Functions can be created using the function `keyword` in two main ways:

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

A more in-depth review of [[Closures and Function Scope]].

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

---

## Garbage Collection

When a value is created in JS memory is allocated and eventually freed up in an "automatic" way that we call **garbage collection**. In general, programmers don't need to think too much about managing memory but sometimes we do need to concern ourselves with how much memory we are using.

Some programming languages don't have garbage collection and require the programmer to manually allocate/deallocate memory, but this can be error-prone and lead to bugs and memory leaks.

If JS did not perform garbage collection we could imagine the process of allocating/deallocating to look something like this:

```js
let name = claim(5);   // Claim 5 bytes of memory for use by name
if (memoryNotAllocated(name)) { // check is memory was allocated
  throw new Error("Memory allocation error!");
}

copy(name, "Sarah");  // Copies "Sarah" into claimed memory referenced by name
console.log(name);    // Do something with object referenced by name
release(name);        // Release memory for use by others
```

Luckily, JS performs garbage collection for us so the same process as above looks like this:

```js
let name = 'Chris';   // Declare a variable and set its value. 
                      // The JavaScript runtime automatically allocates 
                      // the memory.
console.log(name);    // Do something with name
```

The JS runtime handles claiming and releasing memory for us automatically. When we create a new object or primitive value it claims (allocates) the necessary memory, and releases (deallocates) that memory when the program has no more references to the object or value.

It's important to understand that **only when there are no variables, objects, or closures that maintain a reference to the object or value does JS mark the memory as eligible for garbage collection**. As long as the object or value remains accessible in some way, JS can't and won't garbage collect it.

```js
function sayName() {
  let name = 'Chris'; // declare variable and set value to it. The 
                      // JavaScript runtime automatically allocates the 
                      // memory.
  
  console.log(name);  // do something with the value
}

sayName(); // Chris 
           // at this point name is no longer accessible and 
           // is eligible for garbage collection
```

```js
function sayName() {
  let name = 'Chris'; // declare variable and set value to it. The
                      // JavaScript runtime automatically allocates the 
                      // memory.
  
  console.log(name);  // do something with the value
  return name;        // return "Chris" to the caller
}

let myName = sayName(); // logs "Chris"
                        // the "Chris" assigned to myName is NOT 
                        // eligible for garbage collection 
                        // the "Chris" assigned to name is eligible for 
                        // garbage collection
```

```js
function sayName() {
  let name = {    
    firstName: 'Chris',   // Declare variable and set its value. The JS
  };                      // runtime automatically allocates the memory.
  
  console.log(name.firstName);  // Do something with name
  return name;                  // Returns the `name` object to caller
}

let loggedName = sayName(); // loggedName variable is assigned the value 
                            // stored in name which is a reference to 
                            // the object defined on line 2 
                            // Returned value is NOT eligible for GC.
                            // This value is the same value that is 
                            // assigned to name
```

### The Stack and Heap

When allocating memory for values, most programming languages divide memory into two principal regions: **the stack** and **the heap**.

- JS stores most _primitive values_ as well as _references_ in the stack.
- You can think of references as pointers to the actual value of an object, array, or string that lives in the heap, stored in the stack.

Main takeaways:

1. Values on the _stack_ get discarded when a function or method returns.
2. Anything on the _heap_ or referenced by a _closure_ eventually needs to get garbage collected.

The stack **does not** participate in garbage collection, which means that _primitive values are not garbage collected as they are stored on the stack_. When a function or a block is executed, JS allocates memory on the stack for all variables defined within the function or block. Primitive values are a fixed size so the JS engine can predetermine the amount of memory to allocate in the creation phase (meaning the amount of stack space required can be determined when hoisting occurs). Once the function or block is done running the allocated stack memory is discarded/deallocated and automatically returned to the system. This is considered distinct from garbage collection.

```js
function person() {
  let name = "chris";
  let age = 39;
}
// JS automatically discards the values of name and age after the function is done running, this is not considered garbage collection

person();
```

Since the size of values on _the heap_ cannot be predetermined, values must be added to the heap when they are created. Because the program _can_ contain references to values on the heap, it can't use the same allocate/deallocate mechanism that it does for primitive values. Instead, it used garbage collection to determine when a value on the heap is no longer being referenced and made be deallocated from the heap. This can be done in various ways; [reference-counting garbage collectors](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)#:~:text=Reference%20counting%20garbage%20collection%20is,when%20a%20reference%20is%20destroyed.) and [mark and sweep garbage collectors](https://en.wikipedia.org/wiki/Tracing_garbage_collection#Na%C3%AFve_mark-and-sweep) are two examples.

```js
function person() {
  let name = "chris";
  let age = 39;
  
  let personObj = {
    name, 
    age,
  }
  
  return;
}
// JS automatically discards the values of name and age after the function is done running, this is not considered garbage collection
// The personObj object is eligible for garbage collected after the function executes

person();
```

See this [post](https://launchschool.com/posts/460ef753) for more info.

### How Closures Affect Garbage Collection

Closures store a reference to all variables it can access at the time of creation. As long as a closure exists, the references to objects or values contained within that closure also exist. Therefore, JS can't garbage collect any objects referenced by the variables captured by the closure.

```js
function names() {
  let listOfNames = ['chris', 'adrienne', 'sarah'];
  
  return function() {
    console.log(listOfNames);
  }
}

let namesFunction = names();
namesFunction();
// the listOfNames array is NOT eligible for garbage collection because the nameFunction contains a reference to this array.
```

Since the `namesFunction` above still contains a reference to the `listOfNames` array it is not eligible for garbage collection. We can explicitly remove the reference to `listOfNames` by setting `namesFunction` to `null`. After this executes, `listOfNames` will be eligible for garbage collection as no references to it exist.

```js
function names() {
  let listOfNames = ['chris', 'adrienne', 'sarah'];
  
  return function() {
    console.log(listOfNames);
  }
}

let namesFunction = names();
namesFunction();
// the listOfNames array is NOT eligible for garbage collection because the nameFunction contains a reference to this array.

namesFunction = null;
// the array referenced by listOfNames is no longer being referenced and is therefore eligible for garbage collection
```

---

## Partial Function Application

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

### A More Flexible Approach

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

---

## Immediately Invoked Function Expressions

An **immediately invoked function expression** (IIFE) is a function we define and invoke simultaneously.

```js
(function() {
  console.log('What is happening??');
})(); 
// logs "What is happening??"
```

A pair of parenthesis enclose the function expression and an additional pair of parenthesis invoke the IIFE. Without the parenthesis enclosing the function expression we _cannot_ invoke the function right away.

```js
function() {
  console.log('What is happening??');
}(); 
// SyntaxError
```

The parenthesis is a grouping operator that controls the evaluation of expressions. Just as you can control the execution of mathematical operators using parenthesis, and just as a value is returned in these situations, the same is true when wrapped around a function expression. When enclosed in parenthesis the _function definition_ is parsed as an expression and a value (the function) is returned which can immediately be invoked by appending parenthesis to it.

```js
let noParenthesisExpression = 10 - 5 * 10 + 5;
let parenthesisExpression = (10 - 5) * (10 + 5);

console.log(noParenthesisExpression); // -35
console.log(parenthesisExpression);   // 75
// the parenthesis groups chunks of code into their own expressions to be evaluated that may differ from the normal flow of execution

(function() {
  console.log('HI!');
})(); // HI!
// the function expression defined above is wrapped in parenthesis and parsed as an expression. The value returned by this expression is the function is itself, which is immediately invoked due to the parenthesis appended to the function expression.
```

IIFEs can also take arguments.

```js
(function(name) {
  console.log('Hi, ' + name + '!');
})('Chris'); // 'Hi, Chris!'
```

We can also enclose the parenthesis within the parenthesis wrapping the function expression.

```js
(function(name) {
  console.log('Hi, ' + name + '!');
}('Chris')); // 'Hi, Chris!'
```

When the function expression doesn't occur at the beginning of a line the outer parenthesis can be omitted. 

```js
let sayName = function(name) {
  return function() {
    console.log('Hi, ' + name + '!');  
  }()
}('Chris'); // 'Hi, Chris!'
```

### Creating Private Scope with IIFEs

> This material applies primarily to pre-ES6 JS code.

There may come a time when you need to work within an existing code base that is large and messy. Depending on what you need to accomplish, IIFEs can be helpful. For example, if you need to create an object literal that creates some specific data and log it to the console you may have potential naming conflicts when adding this code to the global scope. Both with the local variable set to your object literal and to the function that you create to help accomplish this task.

```js
// lots of messy code

let fido = {
  name: 'fido', 
  age: 7,
}

function logDogInfo() {
  console.log(`A dog named ${fido.name} is ${fido.age} years old.`);
}

logDogInfo() // potential naming conflicts!!

// lots of messy code
```

By using an IIFE you can define the function and variable set to the object literal within the private scope created by your IIFE. This way you are working in a scope independent of the global scope, and avoiding potential naming conflicts that could otherwise arise. 

```js
// lots of messy code

(function logDogInfo() {
  let fido = {
    name: 'fido', 
    age: '7'
  }
  
  console.log(`A dog named ${fido.name} is ${fido.age} years old.`);
})(); // A dog named fido is 7 years old.


// lots of messy code

```

Although the above works, functions are generally useful when needing to repeatedly execute code in some way. Since ES6 introduced `let` and `const`, we can achieve the same private scope without using IIFEs. For example, variables declared with `let` or `const` are block-scoped, so we can alter the code to utilize a block, remove the function altogether, and still maintain our private scope.

```js
// lots of messy code

{
  let fido = {
    name: 'fido', 
    age: '7'
  }
  
  console.log(`A dog named ${fido.name} is ${fido.age} years old.`);
} // A dog named fido is 7 years old.


// lots of messy code
```

### Creating Private Data with an IIFE

Previously we went over using IIFEs to create private data with closures. This can be taken a step further by returning functions and objects from an IIFE with access to private data.

#### Using an IIFE to Return a Function with Access to Private Data

There may be a time when we need to generate some type of data without being able to alter how it is created. For example, we may need to generate an employee ID number that increments automatically. There are a few ways of achieving this, but they have downsides.

```js
let employeeId = 0;

function generateId() {
  employeeId += 1;
  return employeeId;
}

let employeeId1 = generateId();
let employeeId2 = generateId();
let employeeId3 = generateId();

console.log(employeeId1); // 1
console.log(employeeId2); // 2
console.log(employeeId3); // 3
```

The above code works, but `employeeId` is accessible globally and there's no way of telling whether its value has been tampered with in our code.

We can attempt to keep track of the id number ourselves, but again this becomes unwieldy and prone to error.

Instead, we can use IIFEs to create a private scope that contains private data and return a new function that will retain access to this private data through its closure.

```js
let generateId = (function() {
  let lastId = 0;

  return function() {
    lastId += 1;
    return lastId;
  }
})();

let employeeId1 = generateId();
let employeeId2 = generateId();
let employeeId3 = generateId();

console.log(employeeId1); // 1
console.log(employeeId2); // 2
console.log(employeeId3); // 3

console.log(lastId); // Uncaught RefernceError
```

As you can see above, the `generateId` function will return a new ID number for each invocation, and that `lastId` is private to the IIFE defined on lines 1-8.

#### Using an IIFE to Return an Object with Access to Private Data

The example above demonstrates returning a functions with access to private data from an IIFE, but the same can be accomplished by returning an object from an IIFE.

```js
let bookList = (function() {
  let books = [];
  let booksRead = [];
  
  return {
    add(book) {
      books.push(book);
    },
    
    remove() {
      booksRead.unshift(books.pop());
    }, 
    
    nextUp() {
      books.at(-1);
    },
    
    needToRead() {
      console.log('Starting from the top, here the books on my list:')
      for (let i = books.length - 1; i >= 0; i -= 1) {
        console.log('- ' + books[i]);
      }
    },
    
    alreadyRead() {
      console.log('So far I\'ve read:');
      booksRead.forEach(book => console.log('- ', book));
    },
  }
})();


bookList.add('Geek Love');
bookList.add('The Hobbit');
bookList.add('Watership Down');

bookList.needToRead()
bookList.remove()

bookList.needToRead()
bookList.alreadyRead()

console.log(books); // Uncaught RefernceError
console.log(booksRead); // Uncaught RefernceError
```

The above code demonstrates an IIFE returning an object that is set to the `bookList` variable. Through the closure formed by each of the object's methods, each method has access to the `books` and `booksRead` arrays. They can be manipulated only through the methods defined within the object.
