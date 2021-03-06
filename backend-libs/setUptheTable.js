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
  // env = 0, default values, env = 1, Secondary values, see .env file to understand, env = 2, Terciary values, see .env file to understand
  static cable(value, env = 0){
    return new Promise(function(resolve, reject) {
      //Code for resolving the promise
      if(value==="connect"){
        connection = mysql.createConnection({
          host     : env === 0? process.env.DB_HOST: env === 1? process.env.DB_HOST2: env === 2? process.env.DB_HOST3: undefined,
          user     : env === 0? process.env.DB_USER: env === 1? process.env.DB_USER2: env === 2? process.env.DB_USER3: undefined,
          password : env === 0? process.env.DB_USER_PASSWORD: env === 1? process.env.DB_USER_PASSWORD2: env === 2? process.env.DB_USER_PASSWORD3: undefined,
          database : env === 0? process.env.DB_NAME: env === 1? process.env.DB_NAME2: env === 2? process.env.DB_NAME3: undefined,
          port: env === 0? process.env.DB_PORT: env === 1? process.env.DB_PORT2: env === 2? process.env.DB_PORT3: undefined,
        });
        //deploy
        connection.connect((err) => {if (err) {return reject(err);} return resolve(`MySQL connection established.\nYou have connected to;\nHost:${connection.config.host}\nDatabase: ${connection.config.database}\n`);});
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
          console.log('found: ', results)
          // console.log('template: ', connection.config.database, "  vs  ", process.env.DB_NAME)
          results = results?.map((element) => {return element[`Tables_in_${connection.config.database}`]})
          console.log('found: ', results)
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