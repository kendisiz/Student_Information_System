require('dotenv').config()
const express = require('express');
const router = express.Router();

// import connection from './connection';
const conn = require('./connection');
const connection = conn.connection;

const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

router.get('/:id', function (req, res, next) {
  req.query.student_id = req.params.id;
  selectStudents(
    req.query,
    sql_result => res.send(sql_result)
  );
});

router.get('/', function (req, res, next) {
  selectStudents(
    req.query,
    sql_result => res.send(sql_result)
  );
});

router.post('/', function (req, res, next) {
  insertStudent(
    req.query,
    sql_result => res.send(sql_result)
  );
});

function selectStudents(query, callback) {
  // Prepare SQL command
  console.log(query);
  let sql_initial = `
  SELECT 
    st.student_id, st.advisor_id, ap.name, ap.surname,
    st.department_id, dep.name, st.tcno, st.name,
    st.surname, st.email, st.GPA, st.total_credits
  FROM 
  Student AS st 
  JOIN Academic_Personnel AS ap 
    ON st.advisor_id = ap.academic_personnel_id 
  JOIN Department AS dep
    ON st.department_id = dep.department_id `;
  let sql_final = sql_initial;
  Object.entries(query).forEach(([key, value], index) => {
    let where_and = (index == 0) ? 'WHERE ' : 'AND ';
    sql_final += where_and + `${key} = '${value}' `;
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

function insertStudent(query, callback) {
  // Prepare SQL command
  console.log(query);
  const fields = ['advisor_id', 'department_id', 'tcno', 'name', 'surname', 'email', 'GPA', 'total_credits', 'last_update_time'];

  let sql_initial = `INSERT INTO Student(${fields.join()}) VALUES (`;
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
