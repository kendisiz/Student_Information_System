require('dotenv').config()
const express = require('express');
const router = express.Router();

// import connection from './connection';
const conn = require('./connection');
const connection = conn.connection;

const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

router.get('/:id', function (req, res, next) {
  req.query.section_id = req.params.id;
  selectSections(
    req.query,
    sql_result => res.send(sql_result)
  );
});

router.get('/', function (req, res, next) {
  selectSections(
    req.query,
    sql_result => res.send(sql_result)
  );
});

router.post('/', function (req, res, next) {
  insertSection(
    req.query,
    sql_result => res.send(sql_result)
  );
});

function selectSections(query, callback) {
  // Prepare SQL command
  console.log(query);
  let sql_initial = `
  SELECT
    sec.section_id, sec.academic_personnel_id, ap.name, ap.surname,
    sec.classroom_id, cls.name, crs.course_id, crs.name, crs.credits,
    dep.department_id, dep.name, sec.semester_id, sem.year_, sem.season,
    sec.section_number, sec.week_day, sec.start_time, sec.end_time,
    cls.capacity, Count(*) AS number_of_students 
  FROM Section AS sec
  JOIN Classroom AS cls 
    ON  sec.classroom_id = cls.classroom_id
  JOIN Section_Enrollment AS sen
    ON sec.section_id = sen.section_id
  JOIN Academic_Personnel AS ap
    ON sec.academic_personnel_id = ap.academic_personnel_id
  JOIN Semester AS sem
    ON sec.semester_id = sem.semester_id
  JOIN Course AS crs
    ON sec.course_id = crs.course_id
  JOIN Department AS dep
    ON crs.department_id = dep.department_id `;
  let sql_final = sql_initial;
  Object.entries(query).forEach(([key, value], index) => {
    let where_and = (index == 0) ? 'WHERE ' : 'AND ';
    sql_final += where_and + `sec.${key} = '${value}' `;
  });
  sql_final += ` GROUP BY sec.section_id, sec.academic_personnel_id,
  ap.name, ap.surname, sec.classroom_id, cls.name, crs.course_id, crs.name,
  crs.credits, dep.department_id, dep.name, sec.semester_id, sem.year_, sem.season,
  sec.section_number, sec.week_day, sec.start_time, sec.end_time, cls.capacity `
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

function insertSection(query, callback) {
  // Prepare SQL command
  console.log(query);
  const fields = ['academic_personnel_id', 'classroom_id', 'course_id', 'semester_id', 'section_number', 'week_day', 'start_time', 'end_time'];

  let sql_initial = `INSERT INTO Section(${fields.join()}) VALUES (`;
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

module.exports = router;
