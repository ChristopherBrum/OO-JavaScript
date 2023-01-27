function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    notes: {},
    info() {
      return this.name + ' is a ' + this.year + ' student.'
    },
    
    listCourses() {
      return this.courses;
    },

    addCourse(course) {
      this.courses.push(course);
    },

    addNote(courseCode, note) {
      if (this.notes[courseCode]) {
        this.notes[courseCode].push(note);
      } else {
        this.notes[courseCode] = [note];
      }
    },

    viewNotes() {
      for (let i = 0; i < this.courses.length; i++) {
        let courseCode = this.courses[i].code;
        let courseName = this.courses[i].name;

        for (let prop in this.notes) {
          if (prop === String(courseCode)) {
            console.log(`${courseName}: ${this.notes[prop].join('; ')}`);
          }
        }
      }
    },

    updateNote(courseCode, note) {
      this.notes[courseCode] = [note];
    },
  }
}

let school = {
  students: [],
  addStudent(name, year) {
    const validYears = ['1st', '2nd', '3rd', '4th', '5th'];

    if (validYears.includes(year)) {
      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    } else {
      console.log('Invalid Year');
    }
  },

  enrollStudent(student, courseName, courseCode) {
    student.addCourse({name: courseName, code: courseCode});
  },

  addGrade(student, courseCode, grade) {
    for (let i = 0; i < student.courses.length; i++) {
      if (student.courses[i].code === courseCode) {
        student.courses[i].grade = grade;
        return;
      }
    }
  },

  getReportCard(student) {
    for (let i = 0; i < student.courses.length; i++) {
      let course = student.courses[i];
      let grade = course.grade || "In progress";
      console.log(course.name + ": " + grade);
    }
  },

  courseReport(courseName) {
    let output = [`=${courseName} Grades=`];
    let courseTotal = 0;
    let studentTotal = 0;

    for (let i = 0; i < this.students.length; i++) {
      let studentCourses = this.students[i].courses;
      let studentName = this.students[i].name;
      for (let j = 0; j < studentCourses.length; j++) {
        
        if (studentCourses[j].name === courseName && studentCourses[j].grade) {
          courseTotal += studentCourses[j].grade;
          studentTotal += 1;
          output.push(studentName + ": " + studentCourses[j].grade);
        }
      }
    }

    if (studentTotal === 0) {
      console.log("No students enrolled in " + courseName);
    } else {
      let average = Math.round(courseTotal / studentTotal);
      output.push("---", "Course Average: " + average);

      output.forEach(statement => console.log(statement));
    }
  },
}

let chris = school.addStudent('Chris', '5th');
let adrienne = school.addStudent('Adrienne', '1st');
let mitch = school.addStudent('Mitch', '4th');

school.enrollStudent(chris, 'Math', 101);
school.enrollStudent(chris, 'English', 102);
school.enrollStudent(chris, 'Science', 103);
school.enrollStudent(adrienne, 'Math', 101);
school.enrollStudent(adrienne, 'English', 102);
school.enrollStudent(adrienne, 'Science', 103);
school.enrollStudent(mitch, 'Math', 101);
school.enrollStudent(mitch, 'English', 102);
school.enrollStudent(mitch, 'Science', 103);

school.addGrade(chris, 101, 95);
school.addGrade(chris, 102, 94);
school.addGrade(chris, 103, 99);
school.addGrade(adrienne, 101, 100);
school.addGrade(adrienne, 102, 91);
school.addGrade(adrienne, 103, 94);
school.addGrade(mitch, 101, 88);
school.addGrade(mitch, 102, 90);
school.addGrade(mitch, 103, 79);

// school.getReportCard(chris);

// school.courseReport('Math');
// school.courseReport('English');
// school.courseReport('Science');
school.courseReport('History');
