let subjects = {
  English: ['Bob', 'Tyrone', 'Lizzy'],
  Math: ['Fatima', 'Gary', 'Susan'],
  Biology: ['Jack', 'Sarah', 'Tanya'],
};

function rollCall(subject, students) {
  console.log(subject + ':');
  students.forEach(function(student) {
    console.log(student);
  });
}

function sameArrays(arr1, arr2) {
  return arr1.every((el, idx) => el === arr2[idx] );
}

function makeMathRollCall() {
  return function(students) {
    let subjectKeys = Object.keys(subjects);
    let subject;
    for (let prop in subjects) {
      if (sameArrays(subjects[prop], students)) {
        subject = prop; 
      }
    }

    return rollCall(subject, students);
  }
}

let mathRollCall = makeMathRollCall();
mathRollCall(subjects['Math']);
// => Math:
// => Fatima
// => Gary
// => Susan