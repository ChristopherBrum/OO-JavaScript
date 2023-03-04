# Immediately Invoked Function Expressions

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

## Creating Private Scope with IIFEs

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

## Creating Private Data with an IIFE

Previously we went over using IIFEs to create private data with closures. This can be taken a step further by returning functions and objects from an IIFE with access to private data.

### Using an IIFE to Return a Function with Access to Private Data

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

### Using an IIFE to Return an Object with Access to Private Data

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
