"use strict"

//write your code here
const repl = require('repl')
const sqlite = require('sqlite3').verbose()
const faker = require('faker');

let file = 'student.db'
let db = new sqlite.Database(file)

let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS STUDENT(ID INTEGER PRIMARY KEY AUTOINCREMENT, FIRSTNAME TEXT NOT NULL, LASTNAME TEXT, BIRTHDATE DATE)";
let INSERT_DATA = "INSERT INTO STUDENT (FIRSTNAME,LASTNAME,BIRTHDATE) VALUES ($FNAME,$LNAME,$BIRTHDATE)";
let DELETE_DATA = "DELETE FROM STUDENT"

let createTable = () => {
  db.serialize(function(){
    db.run(CREATE_TABLE,function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('--CREATE TABLE--');
      }
    })
  })
}

let insertStudent = () => {
  db.run(INSERT_DATA,{
    $FNAME: faker.name.firstName(),
    $LNAME: faker.name.lastName(),
    $BIRTHDATE: faker.date.month()
  })
}

let deleteAllStudent = () => {
  db.serialize(function(){
    db.run(DELETE_DATA,function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('--DELETE ALL TABLE--');
      }
    })
  })
}

let selectAllStudent = () => {
  let SQLQuery = "SELECT * FROM STUDENT"
  db.all(SQLQuery, function(err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log(`=======================`)
      console.log(`Daftar Student Saat Ini`)
      console.log(`=======================`)
      console.log(`ID - First Name - Last Name - Cohort Name`)
      for(let idx in data){
        console.log(`${data[idx].ID} - ${data[idx].FIRSTNAME} - ${data[idx].LASTNAME} - - ${data[idx].BIRTHDATE}`);
      }
    }
  })
}

let selectStudentWithSpecName = () => {
  let SQLQuery = "SELECT * FROM STUDENT WHERE FIRSTNAME LIKE 'A%'"
  db.all(SQLQuery, function(err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log(`=======================`)
      console.log(`Daftar Student Berawalan A`)
      console.log(`=======================`)
      console.log(`ID - First Name - Last Name - Cohort Name`)
      for(let idx in data){
        console.log(`${data[idx].ID} - ${data[idx].FIRSTNAME} - ${data[idx].LASTNAME} - - ${data[idx].BIRTHDATE}`);
      }
    }
  })
}

let selectStudentWithBirthDate = () => {
  let SQLQuery = "SELECT ID, FIRSTNAME, LASTNAME, BIRTHDATE FROM STUDENT WHERE BIRTHDATE ='February'"
  db.all(SQLQuery, function(err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log(`=======================`)
      console.log(`Daftar Student Lahir Bulan Februari`)
      console.log(`=======================`)
      console.log(`ID - First Name - Last Name - Cohort Name`)
      for(let idx in data){
        console.log(`${data[idx].ID} - ${data[idx].FIRSTNAME} - ${data[idx].LASTNAME} - ${data[idx].BIRTHDATE}`);
      }
    }
  })
}

//--------------------------------------------------- driver code ----------------------------
//create table
createTable()

//1. insert student
for(let i=1;i<100;i++){
  insertStudent()
}

//3. select all student
selectAllStudent()

//4&5. select name with firstname started with 'A%'
selectStudentWithSpecName()

//6
selectStudentWithBirthDate()

//2. delete all student
deleteAllStudent()
