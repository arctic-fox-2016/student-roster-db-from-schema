"use strict"
//contoh
const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();

let file = 'student.db'
let db = new sqlite.Database(file)

class Controller {
  static addStudent(firstname, lastname, birthdate) {
    let ADD_STUDENT = `INSERT INTO student (firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}')`
    Controller.runDbCommand(ADD_STUDENT)
  }

  static deleteStudent(id) {
    let DELETE_STUDENT = `DELETE FROM student WHERE id = ${id}`
    Controller.runDbCommand(DELETE_STUDENT)
  }

  static displayStudent() {
  	let i = 0
    let DISPLAY_STUDENT = `SELECT * FROM student`
    Controller.runDbAllCommand(DISPLAY_STUDENT)
  }

  static displayStudentByName(firstname, lastname) {
    let DISPLAY_STUDENT_BY_NAME = `SELECT * FROM student WHERE firstname = ${firstname} AND lastname = ${lastname}`
    Controller.runDbAllCommand(DISPLAY_STUDENT_BY_NAME)
  }

  static displayStudentByAttribute() {

  }

  static displayStudentByBirthdayMonth(month) {
    let DISPLAY_STUDENT_BY_BIRTHDAY_MONTH = `SELECT * FROM student WHERE MONTH(birthdate) = ${month}`
    Controller.runDbAllCommand(DISPLAY_STUDENT_BY_BIRTHDAY_MONTH)
  }

  static displayStudentSortBirthday() {
    let DISPLAY_STUDENTS_SORT_BIRTHDAY = `SELECT * FROM student ORDER BY birthdate`
    Controller.runDbAllCommand(DISPLAY_STUDENTS_SORT_BIRTHDAY)
  }

  static runDbCommand(command){
    db.serialize(function() {
      // Create table
      db.run(command, function(err,data) {
        if (err) {
          console.log(err)
        } else {
          console.log("Successful")
          console.log(data)
        }
      })
    })
  }

  static runDbAllCommand(command){
    db.serialize(function() {
      // Create table
      db.all(command, function(err,data) {
        if (err) {
          console.log(err)
        } else {
          console.log(data)
        }
      })
    })
  }
}

let replServer = repl.start({prompt:'> '})
replServer.context.Controller = Controller

// Create Student class to CRUD with Database
// Create many methods for Student class to execute SQL commands

// Write Javascript code to complete tasks
// 1. Add student
// 2. Delete student
// Display all students
// Display students that has name
// Display students with attribute
// Display students with birthday this month
// Display students based on birthday sort
