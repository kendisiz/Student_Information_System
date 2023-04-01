require('dotenv').config()
const fs = require('fs');
const path = require('path')
const express = require('express');
const router = express.Router();

// import connection from './connection';
const conn = require('./connection');
const connection = conn.connection;

const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

router.get('/:id', function (req, res, next) {
  req.query.operationType = req.params.id;
  databaseOperations(
    req.query,
    sql_result => res.send(sql_result)
  );
});

router.get('/', function (req, res, next) {
  databaseOperations(
    req.query,
    sql_result => res.send(sql_result)
  );
});


function databaseOperations(query, callback) {
  // Prepare SQL command
  console.log(query);
  let sql;
  if (query.operationType === 'createDatabase')
    sql = fs.readFileSync('databaseBatchSQL/create_database_english.sql', 'utf-8');
  else if (query.operationType === 'createSchema')
    sql = fs.readFileSync('databaseBatchSQL/create_schema_english.sql', 'utf-8');
  else if (query.operationType === 'insertAllRecords')
    sql = fs.readFileSync('databaseBatchSQL/add_data_english.sql', 'utf-8');
  else if (query.operationType === 'removeAllRecords')
    sql = fs.readFileSync('databaseBatchSQL/remove_data_english.sql', 'utf-8');
  console.log(sql);

  // Create Request object with prepared SQL command
  const request = new Request(
    sql,
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
