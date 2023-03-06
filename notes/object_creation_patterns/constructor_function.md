# Constructor Function

A **constructor function** is a function just like any other, but its purpose is to be invoked with [[the `new` keyword]] in order to create new objects. Constructor functions have their names capitalized by convention. When a constructor function is invoked with the `new` keyword, `new` causes a number of important things occur:

- A new object is created.
- The newly created object has its prototype object set to the object at the `prototype` property of the constructor function.
- The execution context (`this`) within the constructor function is set to point at the newly created object. 
- The constructor function is invoked.
- The newly created object is implicitly returned.

```js
function Motorcycle(make, model) {
  this.make = make;
  this.model = model;
  this.openThrottle = function() {
    console.log("Braaappppp");
  }
}

let suzuki = new Motorcycle('Suzuki', 'Gixxer');
let kawi = new Motorcycle('Kawasaki', 'ZX');
let yamaha = new Motorcycle('Yamaha', 'WR250r');

suzuki.openThrottle(); // Braaappppp
kawi.openThrottle();   // Braaappppp
yamaha.openThrottle(); // Braaappppp
```

When we create new objects from the `Motorcycle` constructor function each new object has a `make`, `model`, and `openThrottle` property. Each object has a unique value for `make` and `model` but the function set to `openThrottle` is the same for all. Even though the `openThrottle` method behaves the same for each object, each object has its own copy of the method. This may not be a problem in small programs but this can be a major waste of memory if we have a lot of `Motorcycle` objects.

```js
function Motorcycle(make, model) {
  this.make = make;
  this.model = model;
  this.openThrottle = function() {
    console.log("Braaappppp");
  }
}

let suzuki = new Motorcycle('Suzuki', 'Gixxer');
let kawi = new Motorcycle('Kawasaki', 'ZX');
let yamaha = new Motorcycle('Yamaha', 'WR250r');

console.log(suzuki.openThrottle === kawi.openThrottle); // false
console.log(kawi.openThrottle === yamaha.openThrottle); // false
```

## Method Delegation to Prototypes

As discussed in the [[Function Prototypes and Object Prototypes]], prototypes can be used to share code between different objects of the same type, methods in particular. Each constructor function has a `prototype` property that we can access to store methods that each object instantiated from the constructor function will have access to via [[Prototypal Inheritance and Behavior Delegation]]. Furthermore, by inheriting behaviors through the `prototype` property of a constructor we can avoid creating a new copy of the method for each object created from the constructor.

```js
function Motorcycle(make, model) {
  this.make = make;
  this.model = model;
}

Motorcycle.prototype.openThrottle = function() {
  console.log("Braaappppp");
}

let suzuki = new Motorcycle('Suzuki', 'Gixxer');
let kawi = new Motorcycle('Kawasaki', 'ZX');
let yamaha = new Motorcycle('Yamaha', 'WR250r');

suzuki.openThrottle(); // Braaappppp
kawi.openThrottle();   // Braaappppp
yamaha.openThrottle(); // Braaappppp

console.log(suzuki.openThrottle === kawi.openThrottle); // true
console.log(kawi.openThrottle === yamaha.openThrottle); // true
```

As we can see above, by setting the `openThrottle` method on the `prototype` property of `Motorcycle`, each object created by the `'Motorcycle'` constructor function has access to a single `openThrottle` method defined on its `prototype`. None of the individual `Motorcycle` objects has a copy of `openThrottle`, but instead has access to them through their prototype object.

**Arrow functions do NOT have a `prototype` property.**

## How does this happen?

When using the `new` keyword to invoke a constructor function, one of the things that it does is set the `[[prototype]]` property of the newly created object to point at the object referenced by the constructor functions `prototype` property.

```js
function Motorcycle(make, model) {
  this.make = make;
  this.model = model;
}

Motorcycle.prototype.openThrottle = function() {
  console.log("Braaappppp");
}

let suzuki = new Motorcycle('Suzuki', 'Gixxer');

Object.getPrototypeOf(suzuki) === Motorcycle.prototype; // true
```

## Overriding the Prototype

Setting a property of the same name as one further up the prototype chain will effectively override the property higher up.

```js
function Motorcycle(make, model) {
  this.make = make;
  this.model = model;
}

Motorcycle.prototype.openThrottle = function() {
  console.log("Braaappppp");
}

let suzuki = new Motorcycle('Suzuki', 'Gixxer');
console.log(Object.getOwnPropertyNames(suzuki)); // ['make', 'model']
suzuki.openThrottle() // Braaappppp

suzuki.openThrottle = function() {
  console.log('Rinrinrinnnnn');
}

console.log(Object.getOwnPropertyNames(suzuki)); // ['make', 'model', 'openThrottle']
suzuki.openThrottle() // Rinrinrinnnnn
```
