# 2023-02-27 Study Notes

```js
// // needs an explicit 'return', JS reads the same as if it was multiple lines
// let thing = () => {"words!"}; 
// console.log(thing()); // undefined

// let thing = () => { return "words!"};
// console.log(thing());

// let thing = () => "words!";
// console.log(thing()); // words!


/* Factory Function

1. Show the prototype chain for instances created with this pattern.
Newly created object -> Object.prototype -> Null

2. Does this pattern conserve memory?


3. What relationships (to other objects) can we determine from the instance?


Write answers to questions listed above and demonstrate using instance properties
*/

// function createPlayer(name, position) {
//   let obj = {};
//   obj.name = name;
//   obj.position = position;
//   obj.info = () => `${obj.name} is a ${obj.position} in the NBA`;
//   return obj;
// }

// function createPlayer(name, position) {
//   return {
//     name,
//     position,
//     info: () => `${name} is a ${position} in the NBA`,
//   }
// }


// let player1 = createPlayer('Dennis', 'Forward');

// console.log(player1.name === 'Dennis');
// console.log(player1.position === 'Forward');
// console.log(player1.info() === 'Dennis is a Forward in the NBA');
// console.log(player1.info());

// Demonstration of prototype chain
// console.log(Object.getPrototypeOf(player1) === Object.prototype);
// console.log(Object.getPrototypeOf(Object.prototype) === null);

// // Demonstration that memory isn't conserved
// let player2 = createPlayer('Jordan', 'Forward');
// console.log(player1.info === player2.info);


// Demonstration of instance object relationships
// console.log(player1 instanceof createPlayer); // false
// console.log(player1 instanceof Object); // true
// console.log(player1.constructor); // Object


/*
Objects-Linking to Other Objects (OLOO)
---------------------------------------
1. Show the prototype chain for instances created with this pattern.
this >> proto obj >> Object.prototype

2. Does this pattern conserve memory?
yes

3. What relationships (to other objects) can we determine from the instance?
all instances will be Object type and share the same prototype object

 *  The prototype object (playerPrototype) can be determined, and, thereby,
 *  it can be determined which object defines the common methods.
 *  Because the object is defined using the Object.create() function, all
 *  instances created using this pattern reference the 'Object' constructor.
 
Write answers to questions listed above and demonstrate using instance properties
*/

// const proto = {
//   info: function() {
//     return `${this.name} is a ${this.position} in the NBA`;
//   },
  
//   init: function(name, position) {
//     this.name = name;
//     this.position = position;
//     return this;
//   }
// };

// function createPlayer(name, position) {
//   return Object.create(proto).init(name, position);
// }

// const player2 = createPlayer('Dennis', 'Forward');
// const player3 = createPlayer('Mike', 'Forward');

// console.log(player2.name === 'Dennis');
// console.log(player2.position === 'Forward');
// console.log(player2.info() === 'Dennis is a Forward in the NBA');

// Demonstration of prototype chain
// console.log(Object.getPrototypeOf(player2) === proto) // true
// console.log(Object.getPrototypeOf(proto) === Object.prototype); // true

// Demonstration that memory is conserved
// console.log(player2.info === player3.info); // true


// Demonstration of instance object relationships
// console.log(player2 instanceof Object);
// console.log(player3 instanceof Object);
// console.log(Object.getPrototypeOf(player2) === Object.getPrototypeOf(player3))

// Demontration of how a hierarchy can be create between OLOO prototypes
// const person = {
//   sit: function() {
//     console.log("I can sit!");
//   },
  
//   init: function(name) {
//     this.name = name;
//     return this;
//   },
// }

// const student = {
//   read: function() {
//     console.log("I'm a student who reads!");
//   },
  
//   init: function(name, degree) {
//     this.name = name;
//     this.degree = degree;
//     return this;
//   },
// }

// const graduateStudent = {
//   gradDegree: function() {
//     console.log("I'm a grad student!");
//   },
  
//   init: function(name, advancedDegree) {
//     this.name = name;
//     this.advanceDegree = advancedDegree;
//     return this;
//   },
// }

// Object.setPrototypeOf(graduateStudent, student);
// Object.setPrototypeOf(student, person);

// function createPerson(name) {
//   return Object.create(person).init(name);
// }

// function createStudent(name, degree) {
//   return Object.create(student).init(name, degree);
// }

// function createGraduateStudent(name, advancedDegree) {
//   return Object.create(graduateStudent).init(name, advancedDegree);
// }

// let leeya = createPerson('Leeya');
// let chris = createStudent('Chris', 'Photography');
// let med = createGraduateStudent('Med', 'Chemistry');

// leeya.sit();
// chris.read();
// med.gradDegree();

// console.log(Object.getPrototypeOf(leeya) === person);
// console.log(Object.getPrototypeOf(Object.getPrototypeOf(leeya)) === Object.prototype);

// console.log(Object.getPrototypeOf(chris) === student);
// console.log(Object.getPrototypeOf(Object.getPrototypeOf(chris)) === person);
// console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(chris))) === Object.prototype);

// console.log(Object.getPrototypeOf(med) === graduateStudent);
// console.log(Object.getPrototypeOf(Object.getPrototypeOf(med)) === student);
// console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(med))) === person);
// console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(med)))) === Object.prototype);

// console.log(leeya.constructor); // Object
// console.log(Object.prototype.hasOwnProperty("constructor"));


/*
Constructor (JS225)
---------------------------------------
1. Show the prototype chain for instances created with this pattern.
 newly created obj -> MakePlayer.prototype -> Function.prototype -> Object.prototype -> null
 
2. Does this pattern conserve memory?

3. What relationships (to other objects) can we determine from the instance?

Write answers to questions listed above and demonstrate using instance properties
*/

// function MakePlayer(name, position) {
//   this.name = name;
//   this.position = position;
//   this.info = function() {
//     return `${this.name} is a ${this.position} in the NBA`;
//   }
// }


// let player3 = new MakePlayer('Dennis', 'Forward');
// let player2 = new MakePlayer('Kobe', 'Forward');


// // console.log(player3.name === 'Dennis');
// // console.log(player3.position === 'Forward');
// // console.log(player3.info() === 'Dennis is a Forward in the NBA');

// // console.log(Object.getPrototypeOf(player3) === MakePlayer.prototype); // true
// console.log(Object.getPrototypeOf(MakePlayer.prototype) === Object.prototype); // true


// console.log(player3.info !== player2.info); // true
// console.log(player3.constructor === MakePlayer); // true
// console.log(player3 instanceof MakePlayer); // true



/*
Constructor & Prototype (Pseudo-Classical)
---------------------------------------
1. Show the prototype chain for instances created with this pattern.
 newly created obj -> MakePlayer.prototype -> Object.prototype -> null
 
2. Does this pattern conserve memory?
yes

3. What relationships (to other objects) can we determine from the instance?

Write answers to questions listed above and demonstrate using instance properties
*/

// function MakePlayer(name, position) {
//   this.name = name;
//   this.position = position;
// }

// MakePlayer.prototype.info = function() {
//   return `${this.name} is a ${this.position} in the NBA`;
// }


// let player4 = new MakePlayer('Dennis', 'Forward');
// let player3 = new MakePlayer('Kobe', 'Forward');

// console.log(player4.name === 'Dennis');
// console.log(player4.position === 'Forward');
// console.log(player4.info() === 'Dennis is a Forward in the NBA');

// Demonstration of prototype chain

// console.log(Object.getPrototypeOf(player4) === MakePlayer.prototype); // true
// console.log(Object.getPrototypeOf(MakePlayer.prototype) === Object.prototype); // true

// Demonstration that memory is conserved

// console.log(player4.info === player3.info); // true

// Demonstration of instance object relationships

// console.log(player4.constructor === MakePlayer); // true
// console.log(player4 instanceof MakePlayer); // true

// Demontration of how a hierarchy can be create between Constructors
// function MakeHallOfFamePlayer(name, position, points) {
//   this.name = name;
//   this.position = position;
//   this.points = points;
// }

// MakeHallOfFamePlayer.prototype = Object.create(MakePlayer.prototype);
// MakeHallOfFamePlayer.prototype.constructor = MakeHallOfFamePlayer;

// MakeHallOfFamePlayer.prototype.fame = function() {
//   return `${this.name} is awesome! They scored ${this.points}!`;
// }

// let jordan = new MakeHallOfFamePlayer('Jordan', 'Center', 2000);

// console.log(jordan.fame());
// console.log(jordan.info());
// console.log(jordan.constructor === MakeHallOfFamePlayer);




class MakePlayer {
  constructor(name, position) {
    this.name = name;
    this.position = position;
  }

  info() {
    return `${this.name} is a ${this.position} in the NBA`;
  }
}

let player4 = new MakePlayer('Dennis', 'Forward');
let player3 = new MakePlayer('Kobe', 'Forward');

console.log(player4.name === 'Dennis');
console.log(player4.position === 'Forward');
console.log(player4.info() === 'Dennis is a Forward in the NBA');


// class MakeHallOfFamePlayer extends MakePlayer{
const MakeHallOfFamePlayer = class extends MakePlayer {
  constructor(name, position, points) {
    super(name, position);
    this.points = points;
  }
  
  fame() {
    return `${this.name} is awesome! They scored ${this.points}!`;
  }
}

let jordan = new MakeHallOfFamePlayer('Jordan', 'Center', 2000);

console.log(jordan.fame());
console.log(jordan.info());
console.log(jordan.constructor === MakeHallOfFamePlayer);
```
