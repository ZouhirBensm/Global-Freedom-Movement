// const { ENV, connection } = require('../config/config')
const { ENV } = require('../config/config')
const { CurrentlySavingNotWorkingFromServer } = require('../error-management/custom-errors')
mysql = require('mysql')


var connection

class SQLQuery {
  constructor(ENVvariablesOBJ, tableName){
    this.ENVvariablesOBJ = ENVvariablesOBJ
    this.tableName = tableName
  }
  
  static cable(value){
    return new Promise(function(resolve, reject) {
      //Code for resolving the promise
        if(value==="connect"){
          connection = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME,
            port: process.env.DB_PORT,
          });
          connection.connect((err) => {if (err) {return reject(err);} return resolve("mySQL connection established");});
        } 
        if(value==="endconnect"){
          connection.end((err) => {if (err) {return reject(new CurrentlySavingNotWorkingFromServer());} return resolve("mySQL connection closing");});
        }
    });
    

  }


  checkIfpresent(tableName = this.tableName) {
    return new Promise(function(resolve, reject) {
      //Code for resolving the promise
        connection.query(`
        SHOW tables
        `, function (error, results) {
          if (error) {return reject(new CurrentlySavingNotWorkingFromServer())};
          // console.log('found: ', results[0]['Tables_in_global-partisans'])
          results = results?.map((element) => {return element['Tables_in_global-partisans']})
          console.log('found: ', results)
          const present = results?.includes(tableName) 
          return resolve(present)
        });
    });
    
  }


  createTable(){
    connection.query(`
    CREATE TABLE ${this.tableName} (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT KEY,
      email VARCHAR(128),
      phone_number VARCHAR(16),
      is_brn_phone BIT(1),
      is_subscriber_newsletter BIT(1)
    ) ENGINE InnoDB
    `, function (error, results) {
      if (error) return new CurrentlySavingNotWorkingFromServer();
      console.log('Created table: ', results);
    });
  }

  
  insertEntry(email, phone_number, is_subscriber_newsletter, is_brn_phone, tableName = this.tableName){
    return new Promise(function(resolve, reject) {
      //Code for resolving the promise
      connection.query(`
      INSERT INTO ${tableName}(email, phone_number, is_subscriber_newsletter, is_brn_phone) VALUES('${email}','${phone_number}',${is_subscriber_newsletter},${is_brn_phone})
      `, function (error, results) {
        if (error) {return reject(new CurrentlySavingNotWorkingFromServer());}
        return resolve(results)
      });
    });
  }


}


module.exports = {SQLQuery}