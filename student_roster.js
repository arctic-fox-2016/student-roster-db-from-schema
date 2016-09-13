"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
let file = 'student.db'
let db = new sqlite.Database(file)
class Student_Roster {
  constructor() {
  }

  static addStudent(student){
    db.serialize(()=>{
      let STATEMENT = `INSERT INTO student (firstname, lastname, gender, birthdate, email, address, phone ) VALUES('${student.firstname}', '${student.lastname}',${student.gender},'${student.birthdate}','${student.email}','${student.address}','${student.phone}');`
      db.run(STATEMENT,(err)=>{
        if (err) {
          console.log(err)
        } else{
          console.log(" 1 row Inserted to student");
        }
      })
    })
  }


  static delete(name){
      db.serialize(()=>{
        db.run(`DELETE FROM student WHERE UPPER(firstname) = UPPER('${name}');`,(err)=>{
          if (err) {
            console.log(err)
          } else{
            console.log(" 1 row deleted from student");
          }
        })
      })
  }


  static showAll(){
  db.serialize(()=>{
    console.log('Show All Student:')
    db.all("SELECT * from student;", (err, rows)=>{
      rows.forEach((row)=>{
      console.log(`id: ${row.id}, firstname: ${row.firstname}, lastname: ${row.lastname}, gender: ${row.gender}, birthdate: ${row.birthdate}, email: ${row.email}, address: ${row.address}, phone: ${row.phone}`)
      })
    })
  })
  }


  static showByName(name){
    db.serialize(()=>{

      db.all(`SELECT * from student where UPPER(firstname) like UPPER('%${name}%') OR lastname like UPPER('%${name}%');`, (err, rows)=>{
        console.log(`pencarian dengan kata kunci '${name}' :`)
        rows.forEach((row)=>{
        console.log(`id: ${row.id}, firstname: ${row.firstname}, lastname: ${row.lastname}, gender: ${row.gender}, birthdate: ${row.birthdate}, email: ${row.email}, address: ${row.address}, phone: ${row.phone}`)
        })
      })
    })

  }

  static SearchByEmail(email){
    db.serialize(()=>{
      console.log(`pencarian dengan kata kunci '${email}' :`)
      db.each(`SELECT * from student where UPPER(email) like UPPER('%${email}%') OR email like UPPER('%${email}%');`, (err, row)=>{
        console.log(`id: ${row.id}, firstname: ${row.firstname}, lastname: ${row.lastname}, gender: ${row.gender}, birthdate: ${row.birthdate}, email: ${row.email}, address: ${row.address}, phone: ${row.phone}`)
      })
    })

  }


  static showBirthThisMonth(){
    db.serialize(()=>{
      console.log('Who have birthdate this month:')
      db.each(`SELECT * from student where strftime('%m',birthdate) = strftime('%m',date('now'));`, (err, row)=>{
        console.log(`id: ${row.id}, firstname: ${row.firstname}, lastname: ${row.lastname}, gender: ${row.gender}, birthdate: ${row.birthdate}, email: ${row.email}, address: ${row.address}, phone: ${row.phone}`)
      })
    })
  }


  static studentBirthDay(date){
    db.serialize(()=>{
      console.log(`Who have birthdate is ${date}:`)
      db.each(`SELECT * from student where strftime('%m',birthdate) = strftime('%m','${date}');`, (err, row)=>{
        console.log(`id: ${row.id}, firstname: ${row.firstname}, lastname: ${row.lastname}, gender: ${row.gender}, birthdate: ${row.birthdate}, email: ${row.email}, address: ${row.address}, phone: ${row.phone}`)
      })
    })
  }

}
Student_Roster.delete('Sahbana')
Student_Roster.showAll()
Student_Roster.addStudent({
  firstname: 'Tevin',
  lastname: 'Stein',
  gender: 0,
  birthdate: '2012-09-09',
  email: 'tevinstain@gmail.com',
  address: 'gajeals',
  phone: '8957837683632'
})
Student_Roster.showByName('sahbana')
Student_Roster.showBirthThisMonth('2012-09-09')
Student_Roster.SearchByEmail('imam.nugraha23@gmail.com')
