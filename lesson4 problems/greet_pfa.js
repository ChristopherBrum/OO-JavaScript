function greet(arg1, arg2) {
  let uppercase = arg1[0].toUpperCase() + arg1.slice(1);
  let message = uppercase + ', ' + arg2 + '!';
  console.log(message);
}

function partial(primary, arg1) {
  return function(arg2) {
    return primary(arg1, arg2);
  };
}

// greet('howdy', 'Joe');
// // Howdy, Joe!
// greet('good morning', 'Sue');
// // Good morning, Sue!

let sayHello = partial(greet, 'hello');
let sayHi = partial(greet, 'hi');

sayHello('Brandon');
// Hello, Brandon!
sayHi('Sarah');
// Hi, Sarah!