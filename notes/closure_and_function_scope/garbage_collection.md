# Garbage Collection

When a value is created in JS memory is allocated and eventually freed up in an "automatic" way that we call **garbage collection**. In general, programmers don't need to think too much about managing memory but sometimes we do need to concern ourselves with how much memory we are using.

Some programming languages don't have garbage collection and require the programmer to manually allocate/deallocate memory, but this can be error-prone and lead to bugs and memory leaks.

If JS did not perform garbage collection we could imagine the process of allocating/deallocating to look something like this:

```js
let name = claim(5);   // Claim 5 bytes of memory for use by name
if (memoryNotAllocated(name)) { // check is memory was allocated
  throw new Error("Memory allocation error!");
}

copy(name, "Sarah");  // Copies "Sarah" into claimed memory referenced by name
console.log(name);    // Do something with object referenced by name
release(name);        // Release memory for use by others
```

Luckily, JS performs garbage collection for us so the same process as above looks like this:

```js
let name = 'Chris';   // Declare a variable and set its value. 
                      // The JavaScript runtime automatically allocates 
                      // the memory.
console.log(name);    // Do something with name
```

The JS runtime handles claiming and releasing memory for us automatically. When we create a new object or primitive value it claims (allocates) the necessary memory, and releases (deallocates) that memory when the program has no more references to the object or value.

It's important to understand that **only when there are no variables, objects, or closures that maintain a reference to the object or value does JS mark the memory as eligible for garbage collection**. As long as the object or value remains accessible in some way, JS can't and won't garbage collect it.

```js
function sayName() {
  let name = 'Chris'; // declare variable and set value to it. The JavaScript
                      // runtime automatically allocates the memory.
  console.log(name);  // do something with the value
}

sayName(); // Chris 
           // at this point name is no longer accessible and 
           // is eligible for garbage collection
```

```js
function sayName() {
  let name = 'Chris'; // declare variable and set value to it. The JavaScript
                      // runtime automatically allocates the memory.
  console.log(name);  // do something with the value
  return name;        // return "Chris" to the caller
}

let myName = sayName(); // logs "Chris"
                        // the "Chris" assigned to myName is NOT 
                        // eligible for garbage collection 
                        // the "Chris" assigned to name is eligible for 
                        // garbage collection
```

```js
function sayName() {
  let name = {    
    firstName: 'Chris',   // Declare variable and set its value. The JS
  };                      // runtime automatically allocates the memory.
  
  console.log(name.firstName);  // Do something with name
  return name;                  // Returns the `name` object to caller
}

let loggedName = sayName(); // loggedName variable is assigned the value 
                            // stored in name which is a reference to 
                            // the object defined on line 2 
                            // Returned value is NOT eligible for GC.
                            // This value is the same value that is 
                            // assigned to name
```

## The Stack and Heap

When allocating memory for values, most programming languages divide memory into two principal regions: **the stack** and **the heap**.

- JS stores most _primitive values_ as well as _references_ in the stack.
- You can think of references as pointers to the actual value of an object, array, or string that lives in the heap, stored in the stack.

Main takeaways:

1. Values on the _stack_ get discarded when a function or method returns.
2. Anything on the _heap_ or referenced by a _closure_ eventually needs to get garbage collected.

The stack **does not** participate in garbage collection, which means that _primitive values are not garbage collected as they are stored on the stack_. When a function or a block is executed, JS allocates memory on the stack for all variables defined within the function or block. Primitive values are a fixed size so the JS engine can predetermine the amount of memory to allocate in the creation phase (meaning the amount of stack space required can be determined when hoisting occurs). Once the function or block is done running the allocated stack memory is discarded/deallocated and automatically returned to the system. This is considered distinct from garbage collection.

```js
function person() {
  let name = "chris";
  let age = 39;
}
// JS automatically discards the values of name and age after the function is done running, this is not considered garbage collection

person();
```

Since the size of values on _the heap_ cannot be predetermined, values must be added to the heap when they are created. Because the program _can_ contain references to values on the heap, it can't use the same allocate/deallocate mechanism that it does for primitive values. Instead, it used garbage collection to determine when a value on the heap is no longer being referenced and made be deallocated from the heap. This can be done in various ways; [reference-counting garbage collectors](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)#:~:text=Reference%20counting%20garbage%20collection%20is,when%20a%20reference%20is%20destroyed.) and [mark and sweep garbage collectors](https://en.wikipedia.org/wiki/Tracing_garbage_collection#Na%C3%AFve_mark-and-sweep) are two examples.

```js
function person() {
  let name = "chris";
  let age = 39;
  
  let personObj = {
    name, 
    age,
  }
  
  return;
}
// JS automatically discards the values of name and age after the function 
// is done running, this is not considered garbage collection
// The personObj object is eligible for garbage collected after the 
// function executes

person();
```

See this [post](https://launchschool.com/posts/460ef753) for more info.

## How Closures Affect Garbage Collection

Closures store a reference to all variables it can access at the time of creation. As long as a closure exists, the references to objects or values contained within that closure also exist. Therefore, JS can't garbage collect any objects referenced by the variables captured by the closure.

```js
function names() {
  let listOfNames = ['chris', 'adrienne', 'sarah'];
  
  return function() {
    console.log(listOfNames);
  }
}

let namesFunction = names();
namesFunction();
// the listOfNames array is NOT eligible for garbage collection because 
// the nameFunction contains a reference to this array.
```

Since the `namesFunction` above still contains a reference to the `listOfNames` array it is not eligible for garbage collection. We can explicitly remove the reference to `listOfNames` by setting `namesFunction` to `null`. After this executes, `listOfNames` will be eligible for garbage collection as no references to it exist.

```js
function names() {
  let listOfNames = ['chris', 'adrienne', 'sarah'];
  
  return function() {
    console.log(listOfNames);
  }
}

let namesFunction = names();
namesFunction();
// the listOfNames array is NOT eligible for garbage collection because 
// the nameFunction contains a reference to this array.

namesFunction = null;
// the array referenced by listOfNames is no longer being referenced and 
// is therefore eligible for garbage collection
```
