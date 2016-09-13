"use strict"

const repl = require('repl')
const sqlite = require('sqlite3').verbose()

let file = 'student.db'
let db = new sqlite.Database(file)

// SQL Statement
let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE )"
let SEED_DATA = "INSERT INTO student (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1981-12-31')"

// CREATE_TABLE
let createTable = () => {

  // Run SQL one at a time
  db.serialize(function() {

    // Create table
    db.run(CREATE_TABLE, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('CREATE TABLE')
      }
    })
  })
}

// SEED_DATA
let seedData = () => {

  // Run SQL one at a time
  db.serialize(function() {

    // Insert data into datatable
    db.run(SEED_DATA, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('INSERT DATA')
      }
    })
  })
}

createTable()
seedData()
