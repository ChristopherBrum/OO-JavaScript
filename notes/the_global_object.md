# The Global Object

JS creates a **global object** at runtime which serves as the _implicit execution context_. In the browser, the global variable is the `window` object. _Global variables_ such as `NaN` and `Infinity`, and _global functions_ such as `isFinite` and `parseInt` all live in this object. You can even add custom properties to the global object:

```js
console.log(window);        // Object { ... }
console.log(window.NaN);    // NaN
console.log(Infinity);      // Infinity
console.log(isNaN);         // ƒ isNaN() { [native code] }
console.log(isFinite);      // ƒ isFinite() { [native code] }
console.log(parseInt);      // ƒ parseInt() { [native code] }

window.myName = 'Chris';
console.log(window.myName); // 'Chris'
```

## Global Object as Implicit Context

By default, the global object is the _implicit context_ when we evaluate expressions.

For example, when assigning a value to an undeclared variable, that "variable" is actually just a new property that we are adding to the global object. JS assigns an implicit context object that the new property will be added to. In the case of an undeclared variable, it is to the global object.

```js
myFavoriteHoliday = 'Halloween!';

myFavoriteHoliday;                              // 'Halloween!'
window.myFavoriteHoliday;                       // 'Halloween!'
window.myFavoriteHoliday === myFavoriteHoliday; // true
```

## Global Variables and Function Declarations

When declaring variables with the `var` keyword or functions JS adds them to the global variables as properties.

```js
myName = 'Chris';
var favoriteFood = 'Burritos';
var myAge = 39;

function sayHi() {
  console.log('Yo');
}
  
window.favoriteFood // 'Burritos'
window.myName // 'Chris'
window.myAge // 39
window.sayHi; // ƒ sayHi() { ... }
```

Properties set to the global object as undeclared variables and variables declared with `var` seem like they are identical in behavior, but _you cannot delete global variables declared with the `var` keyword but you can delete undeclared variables._

```js
myName = 'Chris';
var favoriteFood = 'Burritos';
  
delete window.favoriteFood; // false
delete window.myName;       // true
  
window.favoriteFood;        // 'Burritos'
window.myName;              // undefined
```

As you can see from the example above, the undeclared variable was deleted from the global object but the variable declared with the `var` keyword was not.

**Global Object in Non-Browser Environment:** In non-browser environments, like Node, the global object is `global` and not `window`. There are other peculiarities of Node that we discuss [here](https://launchschool.com/lessons/c9200ad2/assignments/c8e3c9a4).

## Strict Mode and the Global Object

When using [Strict Mode](https://launchschool.com/gists/406ba491) the global object is not used as the implicit context, rather, `undefined` is. Because of this, we cannot access/assign variables that have not been declared with `let`, `const`, or `var`.

```js
"use strict";

myName = 'Chris'; // ReferenceError (cannot assign an undeclared variable)
```

This can be beneficial in guarding against misspellings that would previously have been allowed. 

In 'sloppy' mode:

```js
let food = 'Burrito';
fo0d = 'Enchiladas';

food // 'Burrito'
fo0d // 'Enchiladas'
```

In strict mode:

```js
"use strict";
  
let food = 'Burrito';
fo0d = 'Enchiladas'; // ReferenceError: fo0d is not defined
  
food
fo0d
```
