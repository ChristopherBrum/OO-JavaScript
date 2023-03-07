# The Class Syntactic Sugar

ES6 introduced the `class` keyword syntax, which is another way to create objects and implement inheritance. There are no actual classes in JS, but the `class` keyword gives us the ability to create objects and relationships of inheritance that _looks_ similar to the way you would in a classical class-based programming language. JS is still a prototype-based language under the hood.

The `class` keyword essentially wraps around the [[The Pseudo Classical Pattern & The OLOO Pattern#The Pseudo-Classical Pattern|pseudo-classical pattern]] of object creation.

Here is an example of the pseudo-classical pattern:

```js
function Motorcycle(make, model) {
  this.make = make;
  this.model = model;
}

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

And this is how you would translate that using the class syntactic sugar:

```js
// Class Syntactic Sugar Pattern
class Moto {
  constructor(make, model) {
    this.make = make;
    this.model = model;  
  }
  
  startEngine() {
    console.log("Vrooom");
  }
    
  info() {
    console.log(`This is a ${this.make} ${this.model} motorcycle.`);  
  }
}

let suzuki = new Moto('Suzuki', 'Gixxer');

suzuki.info(); // This is a Suzuki Gixxer motorcycle.
suzuki.startEngine(); // Vrooom

console.log(suzuki instanceof Moto); // true
```

Note these differences:

- The `class` keyword is used to define the statement, followed by the "class" name.
- We defined a `constructor` method in which we set the state of the newly created object. This method runs **automatically** and acts exactly as a normal construction function would. 
- Any method included within the "class" will be set as a prototype in `Moto.prototype`.
- No commas are required between the methods within the "class".
- The `new` keyword is used to instantiate a new object.
