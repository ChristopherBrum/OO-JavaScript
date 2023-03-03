# Hard-Binding Functions with Context

JS also has a `bind` method that creates a copy of the function its called on and *permanently* sets its execution context to an object passed in as an argument.

```js
let myObj = {
  name: 'Chris',
  saySomething() {
    return this.name;
  }
}
  
let otherObj = {
  name: 'Adrienne',
}
  
let saySomethingFunc = myObj.saySomething;
  
// Function invocation w/ implicit execution context
saySomethingFunc(); // undefined
  
// Function invocation w/ explicit execution context
saySomethingFunc.call(myObj); // Chris
  
// Method Invocation w/ implicit execution context
myObj.saySomething(); // Chris
  
// Function invocation w/ explicit execution context via hard-binding
let boundSaySomething = myObj.saySomething.bind(otherObj);
boundSaySomething();            // Adrienne
boundSaySomething.call(myObj);  // Adrienne
boundSaySomething.apply(myObj); // Adrienne
```
