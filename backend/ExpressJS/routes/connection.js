require('dotenv').config();
const Connection = require('tedious').Connection;

// Create connection to database
const config = {
    server: process.env.DB_HOST, // 'localhost'
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER, // sa
            password: process.env.DB_PWD // yourStrong(!)Password
        }
    },
    options: {
        port: parseInt(process.env.DB_PORT), // 1433
        trustServerCertificate: true,
        // database: 'OIBS4_English',
        database: 'master',
        rowCollectionOnRequestCompletion: true
    }
}
const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function (err) {
    if (err) {
        console.log(err);
        process.exit();
    } else {
        console.log('Connected to the MSSQL Server');
    }
});
connection.connect();

exports.connection = connection;