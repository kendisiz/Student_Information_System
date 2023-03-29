require('dotenv').config()
const express = require('express');
const router = express.Router();

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

// Create connection to database
const config = {
  server: 'localhost',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa', // update me
      password: 'Parola1' // update me
    }
  },
  options: {
    port: 1433,
    trustServerCertificate: true,
    database: 'OIBS4_English',
    rowCollectionOnRequestCompletion: true
  }
}
const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the MSSQL Server');
  }
});
connection.connect();

router.get('/:id', function (req, res, next) {
  req.query.akademik_personel_no = req.params.id;
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

router.put('/:id', function (req, res, next) {
  req.query.akademik_personel_no = req.params.id;
  updateProfessor(
    req.query,
    sql_result => res.send(sql_result)
  );
});

router.put('/', function (req, res, next) {
  updateProfessor(
    req.query,
    sql_result => res.send(sql_result)
  );
});

router.delete('/:id', function (req, res, next) {
  req.query.akademik_personel_no = req.params.id;
  deleteProfessor(
    req.query,
    sql_result => res.send(sql_result)
  );
});

router.delete('/', function (req, res, next) {
  deleteProfessor(
    req.query,
    sql_result => res.send(sql_result)
  );
});

function selectProfessor(query, callback) {
  // Prepare SQL command
  console.log(query);
  let sql_initial = `SELECT * FROM Professor `;
  let sql_final = sql_initial;
  Object.entries(query).forEach(([key, value], index) => {
    let where_and = (index == 0) ? 'WHERE ' : 'AND ';
    sql_final += where_and + `${key} = '${value}' `;
  });
  console.log(sql_final);

  // Create Request object with prepared SQL command
  request = new Request(
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
  request1 = new Request(
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
    request2 = new Request(
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

function updateProfessor(query, callback) {
  // Prepare SQL command
  console.log(query);
  const PK = 'akademik_personel_no';
  if (query[PK] === undefined)
    callback('akademik_personel_no is required.');
  let sql_initial = `UPDATE Professor `;
  let sql_final = sql_initial;
  Object.entries(query)
    .filter(([key, value]) => key !== PK)
    .forEach(([key, value], index) => {
      let set_or_comma = (index == 0) ? 'SET ' : ', ';
      sql_final += set_or_comma + `${key} = '${value}' `;
    })
  sql_final += ` WHERE ${PK} = ${query.akademik_personel_no}`;
  console.log(sql_final);

  // Create Request object with prepared SQL command
  request = new Request(
    sql_final,
    function (err, rowCount, rows) {
      if (err) {
        callback(err);
      } else {
        console.log(rowCount + ' row(s) returned');
        callback(rows);
      }
    });

  // Execute Request1 object
  connection.execSql(request);
}

function deleteProfessor(query, callback) {
  console.log(query);
  let sql_initial = `DELETE FROM Professor `;
  let sql_final = sql_initial;
  Object.entries(query).forEach(([key, value], index) => {
    let where_and = (index == 0) ? 'WHERE ' : 'AND ';
    sql_final += where_and + `${key} = '${value}' `;
  });
  console.log(sql_final);

  // Create Request object with prepared SQL command
  request = new Request(
    sql_final,
    function (err, rowCount, rows) {
      if (err) {
        callback(err);
      } else {
        console.log(rowCount + ' row(s) returned');
        callback(rows);
      }
    });

  // Execute Request object
  connection.execSql(request);
}

module.exports = router;
