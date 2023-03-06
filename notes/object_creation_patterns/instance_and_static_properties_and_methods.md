# Static and Instance Properties & Methods

We often refer to objects of a particular data type as an _instance_ of that type. For example, an object created by invoking the `Moto` constructor function would be considered an _instance of `Moto`_.  This is another way of categorizing objects that are created in the same way. The term _object_ is more general, while the term _instance_ is more specific.

## Instance Properties

We can think of the properties that are specific to instances of a specific type as **instance properties**. In order to access instance properties, the property must be chained to the instance. Chaining an instance property name to the constructor function will return `undefined`, as they contain no property by that name.

```js
function Motorcycle(make, model) {
  this.make = make;
  this.model = model;
}

let suzuki = new Motorcycle('Suzuki', 'Gixxer');

console.log(suzuki.make);     // 'Suzuki'
console.log(suzuki.model);    // 'Gixxer'
console.log(Motorcycle.make); // undefined
```

## Instance Methods

Like instance properties, the term **instance method** refers to methods defined directly on an instance (object). In general, methods should not be stored directly on an instance, rather they should be stored in the prototype object of the instance. Even though methods are usually defined on the prototype of an object, they still operate on each individual instance and are therefore usually referred to as instance objects.

Just like instance properties, calling an instance method on the constructor function will not work, and raises an error.

> Any method defined in any prototype in the prototype chain of an object is considered to be an instance method of the object.

```js
function Motorcycle(make, model) {
  this.make = make;
  this.model = model;
}

Motorcycle.prototype.openThrottle = function() {
  console.log("Braaappppp");
}

let suzuki = new Motorcycle('Suzuki', 'Gixxer');

suzuki.openThrottle();     // Braaapppp
Motorcycle.openThrottle(); // Uncaught TypeError
```

## Static Properties

**Static properties** are defined and accessed directly on the [[constructor function]], not on an instance or prototype. You can think of static properties belonging directly to the type (`Motorcycle`) and not the instance (`suzuki`).

```js
function Motorcycle(make, model) {
  this.make = make;
  this.model = model;
}

Motorcycle.numOfWheels = 2;

let suzuki = new Motorcycle('Suzuki', 'Gixxer');

console.log(suzuki.numOfWheels);     // undefined
console.log(Motorcycle.numOfWheels); // 2
```

## Static Methods

Like static properties, you can define static methods directly on the constructor function.

```js
function Motorcycle(make, model) {
  this.make = make;
  this.model = model;
}

Motorcycle.numOfWheels = 2;

Motorcycle.fact = function() {
  console.log(`All Motorcycles have ${this.numOfWheels} wheels.`)  
}

let suzuki = new Motorcycle('Suzuki', 'Gixxer');

suzuki.fact();     // Uncaught TypeError
Motorcycle.fact(); // All Motorcycles have 2 wheels.
```
