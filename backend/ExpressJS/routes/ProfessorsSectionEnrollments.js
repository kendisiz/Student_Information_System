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

router.put('/', function (req, res, next) {
  updateProfessorsSections(
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
    sec.section_id, sen.grade, crs.course_id, crs.name, crs.credits,
    st.student_id, st.name, st.surname, st.email
  FROM Section AS sec
  JOIN Course AS crs
    ON sec.course_id = crs.course_id 
  JOIN Section_Enrollment AS sen
    ON sec.section_id = sen.section_id
  JOIN Student AS st
    ON st.student_id = sen.student_id `;
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

function updateProfessorsSections(req, callback) {
  const query = { ...req.query, academic_personnel_id: req.academic_personnel_id };
  // Prepare SQL command
  console.log(query);

  let sql = `
    UPDATE Section_Enrollment 
    SET grade = ${query.grade} 
    WHERE student_id = ${query.student_id} AND section_id = ${query.section_id} `;
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