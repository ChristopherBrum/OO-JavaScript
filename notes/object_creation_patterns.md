# Object Creation Patterns

## Factory Object Creation Pattern (aka Factory Functions)

Factory Functions give us a way to create objects based on a pre-defined pattern using a function.

```js
function makePerson(name, age) {
  return {
    name,
    age,
    greeting() {
      console.log('Hi, I\'m ' + this.name + "!");
    },
    
    sayAge() {
      console.log("I'm " + this.age + " years old.");
    }
  }
}

const chris = makePerson('Chris', 39);
const adrienne = makePerson('Adrienne', 36);

chris.greeting();    // Hi, I'm Chris!
chris.sayAge();      // I'm 39 years old.
adrienne.greeting(); // Hi, I'm Adrienne!
adrienne.sayAge();   // I'm 36 years old.
```

### Private Data with Factory Functions

Private data can be created and utilized by way of closure within our factory functions. In the example below, we've included a local variable `species` that is bound to the methods of the returned object through closure. Therefore, the methods available to our object have access to `species` but we cannot access it, or modify it, directly.

```js
function makePerson(name, age) {
  let species = 'Human';
  return {
    name,
    age,
    
    saySpecies() {
      console.log("I'm a " + species + ".");
    }
  }
}

const chris = makePerson('Chris', 39);

chris.name;        // Chris
chris.age;         // 39
chris.saySpecies() // I'm a Human.
chris.species;     // undefined
```

### Disadvantages of Factory Functions

- Each object created by a factory function has a full copy of the methods and properties defined within the function. This is a redundant, and inefficient use of memory.
- There is no way of knowing if an object was created by a factory function, which makes identifying the objects as a specific type difficult. An object created by a factory function will not have a `constructor` property, just like an object literal.

```js
function makePerson(name, age) {
  return {
    name,
    age,
    sayName() {
      console.log("I'm " this.name);
    },
  }
}

const chris = makePerson('Chris', 39);

console.log(chris.constructor); // undefined
console.log({}.constructor);    // undefined
```

---

## Constructor Pattern

The constructor pattern consists of defining a "constructor function" and invoking it with the keyword `new`. A constructor function is just like any other function but its name is capitalized by convention.

When invoked with the keyword `new`, a few important things occur within the constructor function:

- A new object is created.
- The execution context of `this` is set to the newly created object.
- The newly created objects `[[prototype]]` property (`__proto__`) is set to the constructor functions `prototype` property object. (See [[Prototypes]])
- The code within the constructor function is executed.
- The newly created object is _implicitly_ returned.

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.logPersonInfo = function() {
    console.log(`My name is ${this.name} and I'm ${this.age} years old.`)
  }
}

let chris = new Person('Christopher', 39);
console.log(chris.name); // Christopher 
console.log(chris.age);  // 39
chris.logPersonInfo();   // My name is Christopher and I'm 39 years old.
```

Because the execution context of `this` has been set to the newly created object, we can use `this` to set new properties on the new object. In the example above we've set the `name`, `age`, and `logPersonInfo` properties to the object created and returned by `new Person('Christopher', 39);`. We save this object to the variable `chris` and can then access the value of these properties.

It's important to note that the `new` keyword _implicitly_ returns the newly created object unless another object is _explicitly_ returned. This can cause unexpected behavior if we are unaware of this behavior. Looking at the example below, we can see that we explicitly return a string if the `age` parameter is a falsey value. But because we did not explicitly return an _object_, the constructor function still returns the newly created object.

```js
function Person(name, age=null) {
  if (!age) {
    return "No age argument was passed in!"
  }
  
  this.name = name;
  this.age = age;
  this.logPersonInfo = function() {
    console.log(`My name is ${this.name} and I'm ${this.age} years old.`)
  }
}

let chris = new Person('Christopher');
console.log(chris);            // Person {}
console.log(chris.constructor) // [Function: Person]
```

The correct way to update the example above would be to include the error message within an object. The object saved to `chris` is now the object containing the error message, not the `Person` object as it was before.

```js
function Person(name, age=null) {
  if (!age) {
    return { error: "No age argument was passed in!" }
  }
  
  this.name = name;
  this.age = age;
  this.logPersonInfo = function() {
    console.log(`My name is ${this.name} and I'm ${this.age} years old.`)
  }
}

let chris = new Person('Christopher');
console.log(chris);            // { error: "No age argument was passed in!" }
console.log(chris.constructor) // [Function: Object]
```
