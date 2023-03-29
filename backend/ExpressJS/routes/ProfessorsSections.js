require('dotenv').config()
const express = require('express');
const router = express.Router();

// import connection from './connection';
const conn = require('./connection');
const connection = conn.connection;

const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

router.get('/', function (req, res, next) {
  selectProfessorsSections(
    req,
    sql_result => res.send(sql_result)
  );
});

function selectProfessorsSections(req, callback) {
  const query = { ...req.query, academic_personnel_id: req.academic_personnel_id };
  // Prepare SQL command
  console.log(query);
  let sql_initial = `
  SELECT 
    sec.section_id, sec.classroom_id, cls.name, sec.course_id, crs.name, crs.credits,
    crs.department_id, dep.name, sec.semester_id, sem.year_, sem.season, sec.section_number, sec.week_day, sec.start_time, sec.end_time   
  FROM Section AS sec
  JOIN Course AS crs
    ON sec.course_id = crs.course_id 
  JOIN Semester AS sem
    ON sec.semester_id = sem.semester_id
  JOIN Classroom AS cls
    ON sec.classroom_id = cls.classroom_id 
  JOIN Department AS dep 
    ON crs.department_id = dep.department_id `;
  let sql_final = sql_initial;
  Object.entries(query).forEach(([key, value], index) => {
    let where_and = (index == 0) ? 'WHERE ' : 'AND ';
    sql_final += where_and + `sec.${key} = '${value}' `;
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


module.exports = router;