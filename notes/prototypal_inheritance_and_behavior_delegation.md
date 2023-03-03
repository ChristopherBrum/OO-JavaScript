
# Prototypal Inheritance and Behavior Delegation

## Prototype Chain Lookup for Property Access

When we attempt to access a property on an object, JS looks for that property on the object itself and all the objects on its prototype chain.

```js
const person = {
  arms: 2,
  legs: 2,
  brain: true,
}

const person1 = Object.create(person);
const person2 = Object.create(person1);
const person3 = Object.create(person2);

console.log(person1.arms);  // 2
console.log(person1.legs);  // 2
console.log(person1.brain); // true

console.log(person2.arms);  // 2
console.log(person2.legs);  // 2
console.log(person2.brain); // true

console.log(person3.arms);  // 2
console.log(person3.legs);  // 2
console.log(person3.brain); // true
```

In the example above, we have:

- the `person` object is the prototype object of the `person1` object,
- the `person1` object is the prototype object of the `person2` object,
- and the `person2` object is the prototype object of the `person3` object.

The only object that has properties set on it is the `person` object, yet each object has access to the `arms`, `legs`, and `brain` properties.

When the `person3` object references the `arms` property, JS first searches in the `person3` object, does not find the property there, then searches in the prototype object of `person3`, which is `person2`. It does not find `arms` in `person2`, so it searches in `person2`'s prototype object, which is `person1`, and again doesn't find `arms`. It then looks in the prototype object of `person1`, which is `person`, and finally finds the `arms` property.

If `arms` was not set on the `person` object, JS would continue searching for that property in `person`'s prototype object, which is `Object.prototype`. If it is not found there it will return `undefined`.

---

## Prototypal Inheritance/Behavior Delegation

The prototype chain explored in the previous section allows us to store/access data and behavior not only in the object itself but anywhere up the prototype chain. This is a powerful feature when we want to share data and behavior.

```js
const moto = {
  giveThrottle() {
    console.log("Braaaappppp");
  },
  
  upshift() {
    console.log("Up a gear!");
  },
  
  downshift() {
    console.log("Down a gear!");
  },
}

let suzuki = Object.create(moto);
suzuki.giveThrottle();      // Braaaappppp
suzuki.upshift();           // Up a gear!
suzuki.downshift();         // Down a gear!

let kawasaki = Object.create(moto);
kawasaki.giveThrottle();      // Braaaappppp
kawasaki.upshift();           // Up a gear!
kawasaki.downshift();         // Down a gear!
```

Looking at the example above we can see that we have defined a generic `moto` object that contains data and behavior common to all motorcycle objects. Therefore, we can create new motorcycle objects using [[Object.create]] with the `moto` object set as the prototype object, which will give each individual object we create access to the data and behaviors defined in `moto`, without having to define them on each individual object.

This accomplishes two main things for us:

- We can easily create motorcycle objects with the `moto` prototype and don't have copies of the `giveThrottle`, `upshift`, and `downshift`, properties on each individual motorcycle object we create.
- If we need to add/update/delete the behaviors defined on the `moto` object, we can simply modify the `moto` object, and all motorcycle objects that have `moto` as their prototype object will immediately have access to the updated behaviors.

This is what some refer to as JS's **Prototypal Inheritance**. JJ does not have true classes, but in this way allows for objects to be created directly from other objects and share behaviors and data via the prototype chain.

Thinking of this from a top-down point of view, the objects at the bottom are inheriting the behaviors of the objects higher up the prototype chain. Thinking of this from a bottom-up point of view, the objects at the bottom of the prototype chain can _delegate_ requests to be handled by the objects further up the prototype chain. This design pattern is also called **Behavior Delegation**.

---

## Overriding Default Behavior

Objects created from prototypes can override behaviors inherited from up the prototype chain by defining the same methods locally.

```js
const moto = {
  wheels: 2,
  giveThrottle() {
    console.log("Braaaappppp");
  },
}

let suzuki = Object.create(moto);
suzuki.giveThrottle = function() { 
  console.log("Rip rip rip rippppp");
}
// overriding the behavior of giveThrottle
suzuki.giveThrottle();   // Rip rip rip rippppp

let kawasaki = Object.create(moto);
kawasaki.giveThrottle(); // Braaaappppp
```

---

## Helpful Methods
