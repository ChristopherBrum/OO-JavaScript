function myBind(func, context, ...partialArgs) {
  return function(...args) {
    const allArgs = partialArgs.concat(args);

    return func.apply(context, allArgs);
  }
}

let obj1 = {
  name: 'Chris',
  sayName() {
    console.log(this.name);
  },
}

let obj2 = {
  name: 'Adrienne',
}

obj1.sayName(); // Chris
let boundFunc = myBind(obj1.sayName, obj2);
boundFunc(); // Adrienne

function addNumbers(a, b) {
  return a + b;
}

const addFive = myBind(addNumbers, null, 5);

console.log(addFive(10)); // 15