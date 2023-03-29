require('dotenv').config()
const express = require('express');
const router = express.Router();

// import connection from './connection';
const conn = require('./connection');
const connection = conn.connection;

const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

router.get('/:id', function (req, res, next) {
  req.query.semester_id = req.params.id;
  selectSemesters(
    req.query,
    sql_result => res.send(sql_result)
  );
});

router.get('/', function (req, res, next) {
  selectSemesters(
    req.query,
    sql_result => res.send(sql_result)
  );
});

router.post('/', function (req, res, next) {
  insertSemester(
    req.query,
    sql_result => res.send(sql_result)
  );
});

function selectSemesters(query, callback) {
  // Prepare SQL command
  console.log(query);
  let sql_initial = `
  SELECT 
    semester_id, year_, season, is_active 
  FROM Semester `;
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

function insertSemester(query, callback) {
  // Prepare SQL command
  console.log(query);
  const fields = ['year_', 'season', 'is_active'];

  let sql_initial = `INSERT INTO Semester(${fields.join()}) VALUES (`;
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
