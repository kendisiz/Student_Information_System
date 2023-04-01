const Connection = require('tedious').Connection;

// Create connection to database
const config = {
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', // update me
            password: 'yourStrong(!)Password' // update me
        }
    },
    options: {
        port: 1433,
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
    } else {
        console.log('Connected to the MSSQL Server');
    }
});
connection.connect();

exports.connection = connection;