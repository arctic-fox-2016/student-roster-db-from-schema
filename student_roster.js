"use strict"

const repl = require('repl');
const sqlite = require ('sqlite3').verbose();
let file = 'student.db';
let db = new sqlite.Database(file);

// write your code here

let insertData = (firstname,lastname,birthdate) => {
  //RUN SQL one at a a time

  let test2 = `INSERT INTO student (firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}');`

  db.serialize(function() {
    // Create TABLE

    db.run (test2, function(err,row){
      if (err){
        console.log(err);
      } else {
        //console.log('seed data');
        console.log(row);
      }
    })
  })
}


//insertData("Ivan","Gerard","1986-11-20");
let deltData = (firstname) => {
  //RUN SQL one at a a time

  let test = `  DELETE FROM student where firstname='${firstname}' `

  db.serialize(function() {
    // Create TABLE

    db.run (test,function(err,result){
      if (err){
        console.log(err);
      } else {
        console.log(result);
      }
    })
  })
}

//insertData("Cmd","deee","1987-05-20")
let listSearch = (nama) => {
  //RUN SQL one at a a time

  let list = `SELECT firstname,lastname FROM student where firstname like '${nama}%'` // start with d

  db.serialize(function() {
    // Create TABLE

    db.each (list,function(err,result){
      if (err){
        console.log(err);
      } else {
        console.log(result);

      }
    })
  })
}
//tampilkan semua student
let listStudent = () => {
  //RUN SQL one at a a time

  let list = `SELECT * FROM student ` // atribute tertentu

  db.serialize(function() {
    // Create TABLE

    db.each (list,function(err,result){
      if (err){
        console.log(err);
      } else {
        console.log(result);

      }
    })
  })
}

let birthDate = (month) => {
  //RUN SQL one at a a time

  let list = `SELECT * FROM student WHERE  strftime('%m',birthdate)= '${month}'`  // atribute tertentu

  db.serialize(function() {
    // Create TABLE

    db.each (list,function(err,result){
      if (err){
        console.log(err);
      } else {
        console.log(result);
      }
    })
  })
}
//birthDate("05");

let birthlist = (date) => {
  //RUN SQL one at a a time

  let list = `select firstname,strftime('%Y %m %d',birthdate) as birthdate from student where birthdate = "${date}"`  // atribute tertentu

  db.serialize(function() {
    // Create TABLE

    db.each (list,function(err,result){
      if (err){
        console.log(err);
      } else {
        console.log(result);
      }
    })
  })
}

//birthlist("1981-12-31");
let replServer = repl.start({prompt:">"})
replServer.context.birthlist = birthlist //birthlist("1981-12-31");
replServer.context.birthDate = birthDate //birthDate("05");
replServer.context.listStudent = listStudent
replServer.context.listSearch = listSearch
replServer.context.deltData = deltData
replServer.context.insertData = insertData
