let me = {};
me.firstName = 'Jane';
me.lastName = 'Doe';

let friend = {
  firstName: 'John',
  lastName: 'Smith',
};

let mother = {
  firstName: 'Amber',
  lastName: 'Doe',
};

let father = {
  firstName: 'Shane',
  lastName: 'Doe',
};


let newPerson = {
  firstName: 'Chris',
  lastName: 'Brum',
};

let people = {
  collection: [],
  nextId: 0,

  fullName: function(person) {
    console.log(person.firstName + ' ' + person.lastName);
  },

  rollCall: function() {
    this.collection.forEach(this.fullName);
  },

  get: function(person) {
    if (!this.isInvalidPerson(person)) {
      console.log('Invalid person object');
      return;
    }

    return this.collection[this.getIndex(person)];
  },

  add: function(person) {
    if (!this.isInvalidPerson(person)) {
      console.log('Invalid person object');
      return;
    }
    
    if (this.validId(person)) {
      console.log('This person already exists')
      return;
    } else {
      this.setId(person);
      this.collection.push(person);
    }
  },

  setId: function(person) {
    person.id = this.nextId;
    this.nextId += 1;
  },

  validId: function(person) {
    return typeof person.id === 'number' && person.id >= 0;
  },

  update: function(person) {
    if (!this.isInvalidPerson(person)) {
      console.log('Invalid person object');
      return;
    }

    let personId = this.getIndex(person);
    if (personId === -1) {
      this.add(person);
    } else {
      this.collection[personId] = person;
    }
  },

  remove: function(person) {
    let index;
    if (!this.isInvalidPerson(person)) {
      console.log('Invalid person object');
      return;
    }

    index = this.getIndex(person);
    if (index === -1) return;

    this.collection.splice(index, 1);
  },

  getIndex: function(person) {
    let index = -1;
    this.collection.forEach((propName, i) => {
      if (propName.firstName === person.firstName &&
          propName.lastName === person.lastName) {
        index = i;
      }
    });

    return index;
  },

  isInvalidPerson: function(person) {
    return typeof person.firstName === 'string' && typeof person.lastName === 'string';
  },
};

people.add(me);
people.add(friend);
people.add(mother);
people.add(father);
people.add(newPerson);
people.add(mother);
people.add({id: 5});
console.log(people.collection)