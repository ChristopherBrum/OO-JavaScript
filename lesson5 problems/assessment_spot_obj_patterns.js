// * Use each of the below patterns to create instance objects
// * which satisfy the following tests below each...

/* 
Factory Function
-----------------
1. Show the prototype chain for instances created with this pattern.

2. Does this pattern conserve memory?

3. What relationships (to other objects) can we determine from the instance?

Write answers to questions listed above and demonstrate using instance properties
*/

console.log(player1.name === 'Dennis');
console.log(player1.position === 'Forward');
console.log(player1.info() === 'Dennis is a Forward in the NBA');

// Demonstration of prototype chain
// Demonstration that memory isn't conserved
// Demonstration of instance object relationships
// Demonstration of how a hierarchy can be create between Factory Functions

/*
Objects-Linking to Other Objects (OLOO)
---------------------------------------
1. Show the prototype chain for instances created with this pattern.
 
2. Does this pattern conserve memory?

3. What relationships (to other objects) can we determine from the instance?

Write answers to questions listed above and demonstrate using instance properties
*/

console.log(player2.name === 'Dennis');
console.log(player2.position === 'Forward');
console.log(player2.info() === 'Dennis is a Forward in the NBA');

// Demonstration of prototype chain
// Demonstration that memory is conserved
// Demonstration of instance object relationships
// Demontration of how a hierarchy can be create between OLOO prototypes


/*
Constructor (JS225)
---------------------------------------
1. Show the prototype chain for instances created with this pattern.
 
2. Does this pattern conserve memory?

3. What relationships (to other objects) can we determine from the instance?

Write answers to questions listed above and demonstrate using instance properties
*/

console.log(player3.name === 'Dennis');
console.log(player3.position === 'Forward');
console.log(player3.info() === 'Dennis is a Forward in the NBA');

/*
Constructor & Prototype (Pseudo-Classical)
---------------------------------------
1. Show the prototype chain for instances created with this pattern.
 
2. Does this pattern conserve memory?

3. What relationships (to other objects) can we determine from the instance?

Write answers to questions listed above and demonstrate using instance properties
*/



console.log(player4.name === 'Dennis');
console.log(player4.position === 'Forward');
console.log(player4.info() === 'Dennis is a Forward in the NBA');

// Demonstration of prototype chain
// Demonstration that memory is conserved
// Demonstration of instance object relationships
// Demontration of how a hierarchy can be create between Constructors


/*
ES6 Class (Pseudo-Classical)
---------------------------------------
1. Show the prototype chain for instances created with this pattern.
 
2. Does this pattern conserve memory?

3. What relationships (to other objects) can we determine from the instance?

Write answers to questions listed above and demonstrate using instance properties
*/

 

console.log(player5.name === 'Dennis');
console.log(player5.position === 'Forward');
console.log(player5.info() === 'Dennis is a Forward in the NBA');

// Demonstration of prototype chain
// Demonstration that memory is conserved
// Demonstration of instance object relationships
// Demontration of how a hierarchy can be create between classes