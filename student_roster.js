"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
var file = 'student.db';
var db = new sqlite.Database(file);
// write your code here
var ADD_STUDENT = "insert into student (firstname, lastname, birthdate) values ('Ahyana', 'Rizky', '1992-01-18'), ('Lilianti', 'Wibisono', '1977-02-28');"

let addStudent = (firstname, lastname, birthdate) => {
  db.serialize(function () {
    var ADD_STUDENT = `insert into student (firstname, lastname, birthdate) values ('${firstname}', '${lastname}', '${birthdate}');`


    db.run(ADD_STUDENT, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('STUDENT ADDED');
      }
    })
  })
}
let deleteStudent = (id) => {
  db.serialize(function () {
    var DELETE_STUDENT = `delete from student where id = ${id};`
    db.run(DELETE_STUDENT, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`STUDENT DELETED`);
      }
    })
  })
}

let viewAll = () => {
  console.log(`--- All Data ---`);
  db.each('select * from student;', function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  })
}

let showStudent = (name) => {
  db.each(`select * from student where firstname = '${name}' COLLATE NOCASE;`, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  })
}

let byGender = (gender) => {
  db.each(`select * from student where gender = '${gender}' COLLATE NOCASE;`, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  })
}

let thisMonthBirthday = (month) => {
  db.each(`select * from student where strftime('%m', birthdate) = '${month}';`, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  })
}

let birthdayGroup = () => {
  db.each(`select * from student group by birthdate;`, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  })
}




// addStudent("murid", "baru", "1990-01-24")
// deleteStudent(5)
// viewAll()
// showStudent('rubi')
// thisMonthBirthday("01")
// console.log(`\n\n--- January Birthday ---`);
// birthdayGroup()
byGender('male')
