// Write a function that returns the object on a given object's prototype chain where a property is defined. See the example code below:

function getDefiningObject(object, propKey) {
  let currentPrototype = object;

  while (currentPrototype !== null) {
    if (currentPrototype.hasOwnProperty(propKey)) {
      return currentPrototype;
    }
    currentPrototype = Object.getPrototypeOf(currentPrototype);
  }

  return null;
}

let foo = {
  a: 1,
  b: 2,
};

let bar = Object.create(foo);
let baz = Object.create(bar);
let qux = Object.create(baz);

bar.c = 3;

console.log(getDefiningObject(qux, 'c') === bar);     // => true
console.log(getDefiningObject(baz, 'a') === foo);     // => true
console.log(getDefiningObject(bar, 'b') === foo);     // => true
console.log(getDefiningObject(qux, 'e'));             // => null