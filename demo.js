function getDefiningObject(object, propKey) {
  let lastPrototype = object;
  let currentPrototype;

  while (currentPrototype !== null) {
    currentPrototype = Object.getPrototypeOf(lastPrototype);


    console.log(Object.getPrototypeOf(Object.prototype));
    lastPrototype = currentPrototype;
  }

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
// console.log(getDefiningObject(qux, 'e'));             // => null