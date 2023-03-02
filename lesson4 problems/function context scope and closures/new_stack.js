/*
A stack is a compound data type like an array. The difference between an array and a stack is that in an array you can insert and remove elements in any order you want, but a stack has a rule whereby you can only add new elements at the end and remove the last inserted element.

Create a function newStack, that, when called, returns a stack object with three methods: push, pop, and printStack. push takes a value and appends it to the stack. pop removes and returns the last element from the stack. printStack logs each remaining element of the stack on its own line, starting with the item that was least recently added to the stack and ending with the most recently added item that is still on the stack.

Internally, use an array to implement the stack. Make sure that the array is not 
accessible from outside the methods.

Stack:
- functionally an array, but you only add/remove elements from the end

Rules:
- create a function that returns a stack object
- the stack will have three functions
  - push --> takes a value and adds it to the stack
  - pop --> removes and returns the last element on the stack
  - printStack --> logs each remaining elements of the stack on their own line, starting with the front(bottom) of the stack
- Internally use an array, should not be accessible outside the object

*/

function newStack() {
  let stack = [];

  return {
    push(el) {
      stack.push(el);
    },

    pop() {
      return `'${stack.pop()}' has been removed.`;
    },

    printStack() {
      console.log("Here's out stack from bottom to top:");
      stack.forEach(element => {
        console.log(element);
      });
    },
  }
}

let stack = newStack();
stack.push('abc');
stack.push('def');
stack.push('ghi');
stack.printStack();
console.log(stack.pop());
stack.printStack();
console.log(stack.stack); // undefined