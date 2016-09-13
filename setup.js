"use strict"
const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
//write your code here
let file = 'student.db'
let db = new sqlite.Database(file)
// write your code here
let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT,gender INT(1), birthdate DATE,email TEXT,address TEXT,phone TEXT); ALTER TABLE student AUTOINCREMENT=1;"
let SEED_DATA = "INSERT INTO student (firstname, lastname, gender, birthdate, email, address, phone ) VALUES('Sahbana', 'Lubis',1,'1986-11-20','sahbanalo@gmail.com','jl.pudin jakarta selatan', '081212121212'), ('Imam', 'Nugraha',1, '1981-12-3', 'imam.nugraha23@gmail.com', 'jln. Pejaten Raya', '083820081991');"

//CREATE_TABLE
let createTable = () => {
  // Run AQL one at a time
  db.serialize(function() {
    // Create table
    db.run(CREATE_TABLE, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE');
      }

    })
  })
}

// SEED_DATA

let seedData = () => {
  db.serialize(()=> {
      db.run(SEED_DATA,(err)=>{
          if(err){
            console.log(err)
          } else{
            console.log('2 Rows of Data Inserted');
          }
      })
  })
}

createTable()
seedData()
