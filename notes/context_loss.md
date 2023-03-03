# Context Loss

Most common ways a function can lose context:

## Method loses context when taken out of its object

If you remove a method from its containing object and execute it, it loses its context:

```js
let myObj = {
  name: 'Chris',
  saySomething() {
    return this.name;
  }
}
  
let newSaySomething = myObj.saySomething; // setting function to a local variable and then invoking as a function loses execution context
  
myObj.saySomething; // Chris
newSaySomething()   // undefined
```

Depending on the structure of your code this can become a deeper issue if the method removed from the object is no longer in scope at invocation, making calls to `call` and `apply` useless.

```js
function repeatName(func) {
  return func() + ' ' + func(); // 'chris' is out of scope
}
  
function sayNames() {
  let chris = {
    name: 'Chris',
    sayName() {
      return "I'm " + this.name;
    },
  }
    
  return repeatName(chris.sayName);
}

console.log(sayNames()); // I'm I'm
```

One way of fixing this would be to pass in a context object with your function.

```js
function repeatName(func, context) {
  return func.call(context) + ' ' + func.call(context);
}
  
function sayNames() {
  let chris = {
    name: 'Chris',
    sayName() {
      return "I'm " + this.name;
    }
  }
    
  return repeatName(chris.sayName, chris);
}

console.log(sayNames()); // I'm Chris I'm Chris
```

Some built-in JS methods are already setup to accept a context object, like `forEach` ([see this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#using_thisarg))

If you cannot update your function to accept a context object **hard-binding** with `bind` will often work.

```js
function repeatName(func) {
  return func() + ' ' + func();
}
  
function sayNames() {
  let chris = {
    name: 'Chris',
    sayName() {
      return "I'm " + this.name;
    }
  }
  
  return repeatName(chris.sayName.bind(chris));
}
  
console.log(sayNames()); // I'm Chris I'm Chris
```

### Internal Method Losing Method Context

The code below will output `undefined` because context loss is occurring through the _function invocation_ of `getName` within the `sayName` method. Even though the `getName`function is nested within the `obj` object, it is invoked as a function and therefore JS implicitly sets the execution context to the global object (window).

```js
let obj = {
  name: 'Chris',
  sayName() {
    function getName() {
      return this.name;
    }
      
    return getName(); // function invocation loses context with obj
  },
}
  
console.log(obj.sayName()); // undefined
```

To remedy this we can:

1. Preserve context with a local variable in the lexical scope
2. Pass the context to internal functions
3. Bind the context with a function expression
4. Use an arrow function

_Preserve context with a local variable in the lexical scope_

```js
let obj = {
  name: 'Chris',
  sayName() {
    let self = this; // set this to a local variable
    
    function getName() {
      return self.name;
    }
      
    return getName();
  },
}
  
console.log(obj.sayName()); // Chris
```

_Pass the context to internal functions_

```js
  let obj = {
  name: 'Chris',
  sayName() {
    function getName() {
      return this.name;
    }
      
    return getName.call(this); // explicitly set the context
  },
}
  
console.log(obj.sayName()); // Chris
```

_Bind the context with a function expression_

```js
let obj = {
  name: 'Chris',
  sayName() {
    let getName = function() { // use a function expression
      return this.name;
    }.bind(this);              // hard-bind the context
      
    return getName();
  },
}
  
console.log(obj.sayName()); // Chris
```

_Use an arrow function_

```js
let obj = {
  name: 'Chris',
  sayName() {
    let getName = () => this.name;
      
    return getName();
  },
}
  
console.log(obj.sayName()); // Chris
```

When using an arrow function the value of `this` is the _current_ value of `this` in the calling function. Arrow functions inherit the value of `this` from their surround context.

### Function as Argument Losing Surrounding Context

In the example below, context loss is occurring when we pass a callback function to the `forEach` method. This callback function is being invoked as a function, not a method, therefore, JS implicitly sets the execution context to the global object. When `this.name` is referenced within the callback function, `this` refers to `window`, not the `chris` object.

```js
let chris = {
  name: 'Chris',
  nums: [1, 2],
  sayHiTwice() {
    this.nums.forEach(function() {
      console.log('hello, ' + this.name);
    });
  },
};
  
chris.sayHiTwice(); // 'hello, ' (repeated twice)
```

To remedy this we can:

1. Use a local variable in the lexical scope to store `this`
2. Bind the argument function with the surrounding context
3. Use the optional thisArg argument
4. Use arrow function for the callback

_Use a local variable in the lexical scope to store `this`_

```js
let chris = {
  name: 'Chris',
  nums: [1, 2],
  sayHiTwice() {
    let self = this;
      
    this.nums.forEach(function() {
      console.log('hello, ' + self.name);
    });
  },
};
  
chris.sayHiTwice(); // 'hello, Chris' (repeated twice)
```

_Bind the argument function with the surrounding context_

```js
let chris = {
  name: 'Chris' ,
  nums: [1, 2],
  sayHiTwice() {
    this.nums.forEach(function() {
      console.log('hello, ' + this.name);
    }.bind(this));
  },
};
  
chris.sayHiTwice(); // 'hello, Chris' (repeated twice)
```

_Use the optional thisArg argument_

```js
let chris = {
  name: 'Chris',
  nums: [1, 2],
  sayHiTwice() {
    this.nums.forEach(function() {
      console.log('hello, ' + this.name);
    }, this);
  },
};
  
chris.sayHiTwice(); // 'hello, Chris' (repeated twice)
```

_Use arrow function for the callback_

```js
let chris = {
  name: 'Chris',
  nums: [1, 2],
  sayHiTwice() {
    this.nums.forEach(num => console.log('hello, ' + this.name));
  },
};
  
chris.sayHiTwice(); // 'hello, Chris' (repeated twice)
```
