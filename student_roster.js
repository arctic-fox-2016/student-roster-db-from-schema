"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();

class Controller {
  

  static addStudent(firstname, lastname, birthdate) {
    let CREATE_TABLE = "INSERT INTO student (firstname, lastname, birthdate) values (" + firstname + ", " + lastname + ", " + birthdate + ");"
  }

  static deleteStudent() {

  }

  static displayStudent() {

  }

  static displayStudentByName() {

  }

  static displayStudentByAttribute() {

  }

  static displayStudentByBirthdayMonth() {

  }

  static displayStudentSortBirthday() {

  }
}



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
