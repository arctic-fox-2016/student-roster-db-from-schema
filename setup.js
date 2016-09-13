"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
var file = 'student.db';
var db = new sqlite.Database(file);
// write your code here
var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE);";

var SEED_DATA = "INSERT INTO student (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1981-12-31');";

//CREATE TABLE
let createTable = () => {
  db.serialize(function () {
    db.run(CREATE_TABLE, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE');
      }
    });
  });
}

let seedData = () => {
  db.serialize(function () {
    db.run(SEED_DATA, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('SEED DATA');
      }
    });
  });
}
let modifyTable = () => {
  db.serialize(function () {
    db.run(ALTER_TABLE, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('ALTER TABLE');
      }
    });
  });
}
