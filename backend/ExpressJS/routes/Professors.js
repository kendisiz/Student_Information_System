require('dotenv').config()
const express = require('express');
const router = express.Router();

// import connection from './connection';
const conn = require('./connection');
const connection = conn.connection;

const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

router.get('/:id', function (req, res, next) {
  req.query.academic_personnel_id = req.params.id;
  selectProfessor(
    req.query,
    sql_result => res.send(sql_result)
  );
});

router.get('/', function (req, res, next) {
  selectProfessor(
    req.query,
    sql_result => res.send(sql_result)
  );
});

router.post('/', function (req, res, next) {
  insertProfessor(
    req.query,
    sql_result => res.send(sql_result)
  );
});

function selectProfessor(query, callback) {
  // Prepare SQL command
  console.log(query);
  let sql_initial = `
  SELECT
    ap.academic_personnel_id, ap.department_id, dep.name, ap.tcno, ap.name, ap.surname, ap.email, p.office_id, p.phone_number, p.website_url, p.research_area
  FROM Academic_Personnel AS ap 
  JOIN Professor AS p
    ON p.academic_personnel_id = ap.academic_personnel_id 
  JOIN Department AS dep
    ON ap.department_id = dep.department_id `;
  let sql_final = sql_initial;
  Object.entries(query).forEach(([key, value], index) => {
    let where_and = (index == 0) ? 'WHERE ' : 'AND ';
    sql_final += where_and + `ap.${key} = '${value}' `;
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



function insertProfessor(query, callback) {
  // Prepare SQL command
  console.log(query);
  const fields1 = ['department_id', 'tcno', 'name', 'surname', 'email', 'P_TYPE'];
  query['P_TYPE'] = 'P';

  // First create a new Academic_Personnel record and get its id
  let next_academic_personnel_id;
  let sql_initial1 = `INSERT INTO Academic_Personnel(${fields1.join()}) OUTPUT INSERTED.academic_personnel_id VALUES (`;
  let sql_final1 = sql_initial1;
  fields1.forEach((field, index) => {
    let comma = index === 0 ? '' : ',';
    sql_final1 += `${comma} '${query[field]}'`;
  })
  sql_final1 += ')';
  console.log(sql_final1);

  // Create Request object with prepared SQL command
  const request1 = new Request(
    sql_final1,
    function (err, rowCount, rows) {
      if (err) {
        callback(err);
      } else {
        console.log(rowCount + ' row(s) returned');
        // callback(rows);
        console.log(rows);
        next_academic_personnel_id = rows[0][0]['value'];
        insertIntoProfessor();
      }
    });

  // Execute request1 object
  connection.execSql(request1);

  function insertIntoProfessor() {
    // Now using next_academic_personnel_id, create a new Professor record
    const fields2 = ['academic_personnel_id', 'office_id', 'phone_number', 'website_url', 'research_area'];
    // Add next_academic_personnel_id to the query object
    query.academic_personnel_id = next_academic_personnel_id;
    let sql_initial2 = `INSERT INTO Professor(${fields2.join()}) VALUES (`;
    let sql_final2 = sql_initial2;
    fields2.forEach((field, index) => {
      let comma = index === 0 ? '' : ',';
      sql_final2 += `${comma} '${query[field]}'`;
    })
    sql_final2 += ')';
    console.log(sql_final2);

    // Create Request object with prepared SQL command
    const request2 = new Request(
      sql_final2,
      function (err, rowCount, rows) {
        if (err) {
          callback(err);
        } else {
          console.log(rowCount + ' row(s) returned');
          callback(rows);
        }
      });
    connection.execSql(request2);
  }
}

module.exports = router; 