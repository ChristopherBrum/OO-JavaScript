# Function Prototypes and Object Prototypes

There are two different but similarly worded concepts that are the cause of a lot of confusion, the _object prototype_ and the _function prototype_.

## Object Prototype

As discussed in Prototypes and Prototypal Inheritance and Behavior Delegation, each object in JS has a hidden `prototype` property (and a deprecated`__proto__` property) that points to another object, that has its own hidden `prototype` property that points to another object, and so on, which goes all the way to the `Object.prototype` property. This is how prototypal inheritance is achieved and data and behavior between objects are shared.

The object that an object's `prototype` property points to is considered its **prototype object**. Put another way, the next object in the prototypal lookup path of an object is its **prototype object**.

## Function Prototype

In JS, functions are objects and most functions have a special `prototype` property that points to an object. This object is referred to as the **function prototype**. If the function is used as a Constructor Function (i.e., its called with the `new` keyword), then the _function prototype_ of the Constructor Function will become the newly created object's _prototype object_.

Most non-function objects do not have a `prototype` property.

function declarations, function expressions, and arrow functions are a special case and do not have a `prototype` property, therefore, they cannot be used as a Constructor Function.

## Prototypes & Constructor Functions

A Constructor Function is a function invoked with the `new` keyword in order to make objects with predefined properties. When a constructor function is invoked with the `new` keyword the **function prototype** (the object set to the `prototype` property of the construct function) is set as the newly created object's **prototype object** (set to the hidden `prototype` property).

Constructor Function names are capitalized by convention.

```js
function Moto() {};
const motoPrototype = Moto.prototype;

let suzuki = new Moto();
let kawasaki = new Moto();

console.log(Object.getPrototypeOf(suzuki) === motoPrototype);   // true
console.log(Object.getPrototypeOf(kawasaki) === motoPrototype); // true

// the constructor is a property of a function prototype
console.log(suzuki.constructor === Moto);   // true
console.log(kawasaki.constructor === Moto); // true

console.log(suzuki instanceof Moto);   // true
console.log(kawasaki instanceof Moto); // true
```

Whenever we create an object with a Constructor Function JS creates objects that are prototype linked to the object set to the `prototype` property of the constructor. This is what allows us to use a constructor function for behavior delegation. **This approach of defining shared behaviors on the constructor's prototype property is called the Prototype Pattern of object creation**.

```js
function Moto() {};
Moto.prototype.wheels = 2;         // setting property to Moto.prototype
Moto.prototype.info = function() { // setting property to Moto.prototype
  console.log(`I'm a ${this.make} motorcyle, and I have ${this.wheels} wheels!`);
}

let suzuki = new Moto();
let kawasaki = new Moto();

suzuki.make = "Suzuki";     // Setting property to the suzuki object
kawasaki.make = "Kawasaki"; // Setting property to the kawasaki object

suzuki.info();   // I'm a Suzuki motorcycle, and I have 2 wheels!
kawasaki.info(); // I'm a Kawasaki motorcycle, and I have 2 wheels!
```
