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
          password : process.env.DB_USER_PASSWORD,
          database : process.env.DB_NAME,
          port: process.env.DB_PORT
        });
        //deploy
        connection.connect((err) => {if (err) {return reject(err);} return resolve("mySQL connection established");});
      } 
      if(value==="endconnect"){
        connection.end((err) => {if (err) {return reject(new CurrentlySavingNotWorkingFromServer());} return resolve("mySQL connection closing");});
      }
    });

    
    
  }

  checkIfpresent(tableName = this.tableName) {
    // console.log("SAME CONNECTION? ", connection.config)
    return new Promise(function(resolve, reject) {
      //Code for resolving the promise
        connection.query(`
        SHOW tables
        `, function (error, results) {
          if (error) {return reject(new CurrentlySavingNotWorkingFromServer())};
          // console.log('found: ', results)
          results = results?.map((element) => {return element[`Tables_in_${process.env.DB_NAME}`]})
          // console.log('found: ', results)
          const present = results?.includes(tableName) 
          return resolve(present)
        });
    });
    
  }


  createTable(datalength, idtype, tableName = this.tableName){
    console.log("B")
    return new Promise(function(resolve, reject) {
      //Code for resolving the promise
      connection.query(`
      CREATE TABLE ${tableName} (
        id ${idtype},
        email VARCHAR(${datalength}),
        phone_number VARCHAR(${datalength}),
        is_brn_phone BIT(1),
        is_subscriber_newsletter BIT(1)
      ) ENGINE InnoDB
      `, function (error, results) {
        if (error) return reject(error);
        console.log('Created table: ', results);
        return resolve(results)
      });
    });
  }

  insertEntry(email, phone_number, is_subscriber_newsletter, is_brn_phone, id = null, tableName = this.tableName){
    console.log(
    `
      INSERT INTO ${tableName}(${id?'id, ': ''}email, phone_number, is_subscriber_newsletter, is_brn_phone) VALUES(${id?`'${id}',`:''}'${email}','${phone_number}',${is_subscriber_newsletter},${is_brn_phone})
      `)
    return new Promise(function(resolve, reject) {
      //Code for resolving the promise
      connection.query(`
      INSERT INTO ${tableName}(${id?'id, ': ''}email, phone_number, is_subscriber_newsletter, is_brn_phone) VALUES(${id?`'${id}',`:''}'${email}','${phone_number}',${is_subscriber_newsletter},${is_brn_phone})
      `, function (error, results) {
        if (error) {return reject(error);}
        return resolve(results)
      });
    });
  }

  retrieveTable(tableName = this.tableName){
    return new Promise(function(resolve, reject) {
      //Code for resolving the promise
      connection.query(`
      SELECT * FROM ${tableName}
      `, function (error, results) {
        if (error) {return reject(error);}
        return resolve(results)
      });
    });
  }

  checkForEntryWithID(id, tableName = this.tableName){
    return new Promise(function(resolve, reject) {
      //Code for resolving the promise
      connection.query(`
      SELECT CASE WHEN EXISTS (SELECT id FROM ${tableName} WHERE id = ${id}) THEN 1 ELSE 0 END
      `, function (error, results) {
        if (error) {return reject(error);}
        console.log("____exists?", results)
        return resolve(results)
      });
    });
  }


}


module.exports = {SQLQuery}