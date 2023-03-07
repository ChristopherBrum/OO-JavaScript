# The Pseudo Classical Pattern & The OLOO Pattern

These two patterns are considered best practice for creating types and instances in JS.

## Object Creation Considerations

Using an object literal is great if we only need to create one object. Utilizing an object creation pattern may be appropriate when our program requires the use of multiple objects that...

- may need their own state,
- or may need to share behaviors.

---

## The Pseudo-Classical Pattern

The pseudo-classical pattern is a combination of the [[Object Creation Patterns#Constructor Pattern|constructor pattern]] and the [[Object Creation Patterns#The Prototype Pattern|prototype pattern]]. We use a [[Constructor Function|constructor function]] to set the state of the objects being created, and defined shared methods on the constructor functions prototype.

```js
// Constructor Pattern
function Motorcycle(make, model) {
  this.make = make;
  this.model = model;
}

// Prototype Pattern
Motorcycle.prototype.startEngine = function() {
  console.log("Vrooom")  
}

Motorcycle.prototype.info = function() {
  console.log(`This is a ${this.make} ${this.model} motorcycle.`);  
}

let suzuki = new Motorcycle('Suzuki', 'Gixxer');

suzuki.info(); // This is a Suzuki Gixxer motorcycle.
suzuki.startEngine(); // Vrooom
```

---

## The OLOO Pattern

This pattern stands for **Objects Linking to Other Objects**. With this pattern, we define shared behaviors on a prototype object we define and then use [[Object.create]] to create a new object and explicitly set the new object's prototype object.

```js
// OLOO Pattern
const motoPrototype = {
  init(make, model) {
    this.make = make;
    this.model = model;  
  },
  
  startEngine() {
    console.log("Vrooom");
  },
    
  info() {
    console.log(`This is a ${this.make} ${this.model} motorcycle.`);  
  },
}

let suzuki = Object.create(motoPrototype);
suzuki.init('Suzuki', 'Gixxer');

suzuki.info(); // This is a Suzuki Gixxer motorcycle.
suzuki.startEngine(); // Vrooom
```

The example above required us to invoke the `init` method in order to set the state of our object. If we were to forget to do this the instance we created would not have a `make` or `model` property.

Another way to do this would be to create another function that would create the new object and invoke the `init` method for you. Note that the `init` method must return the value of `this` in order for the `makeMoto` method to return the new object.

```js
// OLOO Pattern
const motoPrototype = {
  init(make, model) {
    this.make = make;
    this.model = model;  
    return this;
  },
  
  startEngine() {
    console.log("Vrooom");
  },
    
  info() {
    console.log(`This is a ${this.make} ${this.model} motorcycle.`);  
  },
}

function makeMoto(make, model) {
  return Object.create(motoPrototype).init(make, model);
}

let suzuki = makeMoto('Suzuki', 'Gixxer');

suzuki.info(); // This is a Suzuki Gixxer motorcycle.
suzuki.startEngine(); // Vrooom
```
