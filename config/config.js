// mysql = require('mysql')

// var connection = mysql.createConnection({
//   host     : process.env.DB_HOST,
//   user     : process.env.DB_USER,
//   password : process.env.DB_PASSWORD,
//   database : process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

// connection.connect((err) => {err? console.log(err): null; console.log("mySQL connection established");});

ENV = {
  port: process.env.PORT,
  domain: process.env.DOMAIN,
  environment: process.env.NODE_ENV,
  protocol: process.env.PROTOCOL,
  // db_host: process.env.DB_HOST,
  // db_user: process.env.DB_USER,
  // db_password: process.env.DB_PASSWORD,
  // db_name: process.env.DB_NAME,
  // db_port: process.env.DB_PORT,
}



module.exports = {
  ENV
}