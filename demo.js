function Animal(){
  this.offspring=[];
}

Animal.prototype.makeBaby = function(){ 
  var baby = new Animal();
  if (!this.hasOwnProperty('offspring')) {
    this.offspring = [];
  } 
  this.offspring.push(baby);
  return baby;
};

//create Cat as a sub-class of Animal
function Cat() {
}

//Inherit from Animal
Cat.prototype = new Animal();

var puff = new Cat();
puff.makeBaby();
var colonel = new Cat();
colonel.makeBaby();

console.log(puff.offspring);
console.log(colonel.offspring);