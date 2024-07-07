const mysql = require('mysql2');

// DB Connection

//I was using a config for my home pc using localhost
//I have changed it to the same config for my assn3 and it should work on the lab/uni computers
const dbConfig = {
  host: 'localhost',
  database: '',
  user: 'phpmyadmin',
  password: '' //password removed for security reasons
};

const db = mysql.createConnection(dbConfig);
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Successfully connected to the db');
});

module.exports = db;
