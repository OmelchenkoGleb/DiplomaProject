// const mysql = require('mysql');
// require('dotenv').config();
//
// var connection = mysql.createConnection({
//   port: process.env.DB_PORT,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });
//
// connection.connect((err) => {
//   if(!err) {
//     console.log("Connected")
//   } else {
//     console.log(err);
//   }
// })
//
// module.exports = connection;



const mysql = require('mysql');
require('dotenv').config();

function createConnection() {
  return mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
}

let connection;

function handleDisconnect() {
  connection = createConnection();

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      setTimeout(handleDisconnect, 2000); // Попробуйте переподключиться через 2 секунды
    } else {
      console.log('Connected to the database');
    }
  });

  connection.on('error', (err) => {
    console.error('Database connection error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); // Переподключитесь при потере соединения
    } else {
      throw err; // Бросьте ошибку для других типов ошибок
    }
  });
}

handleDisconnect();

module.exports = connection;

