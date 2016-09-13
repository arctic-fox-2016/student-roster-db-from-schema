"use strict"

//write your code here
const repl = require("repl");
const sqlite = require("sqlite3").verbose();
let file = "student.db";
let db = new sqlite.Database(file);

class System{
  static clearScreen(){
    let lines = process.stdout.getWindowSize()[1];
    for(let idx = 0; idx < lines; idx++) console.log("\r\n");
  }
  static printHead(text){
    console.log(text);
  }
  static printTitle(text){
    console.log("\n");
    console.log("========================");
    console.log(text);
  }
}

let process_db = () => {
  System.clearScreen();
  System.printHead("tevinstein - digachandra");

  let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)";
  let CLEAR_TABLE = "DELETE from student";
  let SELECT_ALL_DATA = "SELECT * FROM student";
  let SEED_DATA = "INSERT INTO student (firstname, lastname, birthdate) VALUES ('Rubi','Henjaya','1986-11-20'),('Riza','Fahmi','1981-12-31'),('Tevin','Stein','1994-01-01'),('Septhianto Diga','Chandra','1992-09-04');";
  let SELECT_SPECIFIC_DATA = "SELECT * FROM student WHERE firstname like '%Tevin%'";
  let SELECT_ATTRIBUTE_DATA = "SELECT firstname FROM student";
  let SELECT_MONTH_DATA = "SELECT * FROM student WHERE strftime('%m', birthdate) = '01'";
  let SELECT_SAME_BIRTHDATE_DATA = "SELECT * FROM student GROUP BY birthdate";

  db.serialize(function(){

    function process_1(){
      System.printTitle("Task #1 CREATE TABLE");
      db.run(CREATE_TABLE, function(err){
        console.log("... TABLE CREATED");
        db.run(CLEAR_TABLE, function(err){
          console.log("... TABLE CLEARED");
          process_2();
        });
      });
    }

    function process_2(){
      System.printTitle("Task #2 INSERT RECORD");
      db.run(SEED_DATA, function(err){
        console.log("... RECORD INSERTED");
        process_3();
      });
    }

    function process_3(){
      System.printTitle("Task #3 SELECT ALL RECORD");
      db.all(SELECT_ALL_DATA, function(err, result){
        console.log(result);
        process_4();
      });
    }

    function process_4(){
      System.printTitle("Task #4 SELECT SPECIFIC RECORD WHERE firstname contains 'Tevin'");
      db.all(SELECT_SPECIFIC_DATA, function(err, result){
        console.log(result);
        process_5();
      });
    }

    function process_5(){
      System.printTitle("Task #5 SELECT ATTRIBUT RECORD");
      db.all(SELECT_ATTRIBUTE_DATA, function(err, result){
        console.log(result);
        process_6();
      });
    }

    function process_6(){
      System.printTitle("Task #6 SELECT MONTH BIRTHDATE RECORD = JANUARY");
      db.all(SELECT_MONTH_DATA, function(err, result){
        console.log(result);
        process_7();
      });
    }

    function process_7(){
      System.printTitle("Task #7 SELECT SAME MONTH BIRTHDATE RECORD");
      db.all(SELECT_SAME_BIRTHDATE_DATA, function(err, result){
        console.log(result);
      });
    }
    
    process_1();
  });
}
process_db();
