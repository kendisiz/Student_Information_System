require('dotenv').config()
const express = require('express');
const router = express.Router();

// import connection from './connection';
const conn = require('./connection');
const connection = conn.connection;

const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

router.get('/', function (req, res, next) {
  selectStudentsSections(
    req,
    sql_result => res.send(sql_result)
  );
});

router.post('/', function (req, res, next) {
  insertStudentsSections(
    req,
    sql_result => res.send(sql_result)
  );
});

router.delete('/', function (req, res, next) {
  deleteStudentsSections(
    req,
    sql_result => res.send(sql_result)
  );
});

router.put('/', function (req, res, next) {
  updateStudentsSections(
    req,
    sql_result => res.send(sql_result)
  );
});

function selectStudentsSections(req, callback) {
  const query = { ...req.query, student_id: req.student_id };
  // Prepare SQL command
  console.log(query);
  let sql_initial = `
  SELECT 
    sen.section_id, sen.grade, sec.academic_personnel_id, ap.name, ap.surname, sec.classroom_id, cls.name, sec.course_id, crs.name, sec.semester_id, sem.year_, sem.season, sec.section_number, sec.week_day, sec.start_time, sec.end_time
  FROM Student AS st
  JOIN Section_Enrollment AS sen
    ON st.student_id = sen.student_id
  JOIN Section AS sec
    ON sen.section_id = sec.section_id
  JOIN Academic_Personnel AS ap 
    ON sec.academic_personnel_id = ap.academic_personnel_id
  JOIN Classroom AS cls
    ON sec.classroom_id = cls.classroom_id
  JOIN Course AS crs
    ON sec.course_id = crs.course_id
  JOIN Semester AS sem
    ON sec.semester_id = sem.semester_id `;
  let sql_final = sql_initial;
  Object.entries(query).forEach(([key, value], index) => {
    let where_and = (index == 0) ? 'WHERE ' : 'AND ';
    let tableName = key === 'student_id' ? 'st' : 'sec';
    sql_final += where_and + `${tableName}.${key} = '${value}' `;
  });
  console.log(sql_final);

  // Create Request object with prepared SQL command
  const request = new Request(
    sql_final,
    function (err, rowCount, rows) {
      if (err) {
        callback(err);
      } else {
        console.log(rowCount + ' row(s) returned');
        // Filter metadata about column values in rows
        let filteredRows = rows.map(
          row => row.map(
            column => column.value
          ));
        callback(filteredRows);
      }
    });

  // Execute Request object
  connection.execSql(request);
}

function insertStudentsSections(req, callback) {
  const query = { ...req.query, student_id: req.student_id };
  // Prepare SQL command
  console.log(query);
  const fields = ['student_id', 'section_id'];

  let sql_initial = `INSERT INTO Section_Enrollment(${fields.join()}) VALUES (`;
  let sql_final = sql_initial;
  fields.forEach((field, index) => {
    let comma = index === 0 ? '' : ',';
    sql_final += `${comma} '${query[field]}'`;
  })
  sql_final += ')';
  console.log(sql_final);

  // Create Request object with prepared SQL command
  const request = new Request(
    sql_final,
    function (err, rowCount, rows) {
      if (err) {
        callback(err);
      } else {
        console.log(rowCount + ' row(s) returned');
        callback(rows);
      }
    });
  // Execute request1 object
  connection.execSql(request);
}

function deleteStudentsSections(req, callback) {
  const query = { ...req.query, student_id: req.student_id };
  // Prepare SQL command
  console.log(query);

  let sql_initial = `DELETE FROM Section_Enrollment `;
  let sql_final = sql_initial;
  Object.entries(query).forEach(([key, value], index) => {
    let where_and = (index == 0) ? 'WHERE ' : 'AND ';
    sql_final += where_and + `${key} = '${value}' `;
  })
  console.log(sql_final);

  // Create Request object with prepared SQL command
  const request = new Request(
    sql_final,
    function (err, rowCount, rows) {
      if (err) {
        callback(err);
      } else {
        console.log(rowCount + ' row(s) returned');
        callback(rows);
      }
    });
  // Execute request1 object
  connection.execSql(request);
}

function updateStudentsSections(req, callback) {
  const query = { ...req.query, student_id: req.student_id };
  // Prepare SQL command
  console.log(query);

  let sql = `
    UPDATE Section_Enrollment 
    SET section_id = ${query.new_section_id} 
    WHERE student_id = ${query.student_id} AND section_id = ${query.old_section_id} `;
  console.log(sql);

  // Create Request object with prepared SQL command
  const request = new Request(
    sql,
    function (err, rowCount, rows) {
      if (err) {
        callback(err);
      } else {
        console.log(rowCount + ' row(s) returned');
        callback(rows);
      }
    });
  // Execute request1 object
  connection.execSql(request);
}

module.exports = router;