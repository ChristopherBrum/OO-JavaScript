# Objects and Prototypes

## Object Prototype Property - `[[prototype]]`

Each object in JS has a _hidden_ property called `[[prototype]]` which is set to an object. We can retrieve and set the value of the `[[prototype]]` property using the [[Object.getPrototypeOf]] and [[Object.setPrototypeOf]] methods.

```js
let chris = {};
let steve = {};

let adrienne = Object.create(chris);
console.log((Object.getPrototypeOf(adrienne) === chris)); // true

Object.setPrototypeOf(adrienne, steve);
console.log((Object.getPrototypeOf(adrienne) === steve)); // true
```

In the example above, we have set an object literal to the variable `chris`, then created a new object using the [[Object.create]] method to create a new object that is set to `adrienne`. We pass in `chris` as an argument that sets `chris` as the **prototype object** of the `adrienne` object. We confirm that `chris` is the prototype object of `adrienne` using the [[Object.getPrototypeOf]] method. We then update the prototype object of `adrienne` to be set to the `steve` object using the [[Object.setPrototypeOf]] method, and then again confirm the new prototype object of `adrienne` on the last line.

We can also use the [[Object.prototype.isPrototypeOf]] method to determine if an object is the prototype object of another object.

```js
let chris = {};
let steve = {};

let adrienne = Object.create(chris);
console.log(chris.isPrototypeOf(adrienne)); // true

Object.setPrototypeOf(adrienne, steve);
console.log(steve.isPrototypeOf(adrienne)); // true
```

**Setting the `[[prototype]]` property using [[Object.setPrototypeOf]] is a slow operation in browsers and JS engines. Using [[Object.create]] is the preferable way of setting the [[prototype]] object. See [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) for more info.**

---

## Object Prototype Property - `__proto__`

The `__proto__` property (pronounced "dunder proto") is a non-hidden prototype version of the `[[prototype]]` property on all objects. It is deprecated, so it should not be unless you are working with older versions of js, or as a shortcut for debugging.

---

## Prototype Chain and the Object.prototype Object

We can use [[Object.create]] to create objects that form a prototype chain. An object has access to the properties in its prototype object. Because the prototype object is an _object_ it, too, has a prototype object. By chaining together prototype objects an object can gain access to all of the properties up its prototype chain. The `Object.prototype` object is always at the end of the prototype chain for JS objects. If you do not create an object from a prototype, the prototype object is `Object.prototype`.

```js
const person = {
  arms: 2,
  legs: 2,
  brain: true,
}

const person1 = Object.create(person);
const person2 = Object.create(person1);
const person3 = Object.create(person2);

// Object.prototype is in the prototype chain of person and
// Object.prototype is the prototype object of person
console.log(Object.prototype.isPrototypeOf(person));             // true
console.log(Object.getPrototypeOf(person) === Object.prototype); // true

// Object.prototype is in the prototype chain of person1 and
// person is the prototype object of person1
console.log(Object.prototype.isPrototypeOf(person1));   // true
console.log(Object.getPrototypeOf(person1) === person)  // true

// Object.prototype is in the prototype chain of person2 and
// person1 is the prototype object of person2
console.log(Object.prototype.isPrototypeOf(person2));   // true
console.log(Object.getPrototypeOf(person2) === person1) // true

// Object.prototype is in the prototype chain of person3 and
// person2 is the prototype object of person3
console.log(Object.prototype.isPrototypeOf(person3));   // true
console.log(Object.getPrototypeOf(person3) === person2) // true
```
