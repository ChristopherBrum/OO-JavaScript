function getDefiningObject(object, propKey) {
  if (object === Object.prototype) return null;
  if (object.hasOwnProperty(propKey)) return object;

  let proto = Object.getPrototypeOf(object);
  return getDefiningObject(proto, propKey);
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
console.log(getDefiningObject(qux, 'e'));             // => null