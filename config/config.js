const fs = require("fs")
let privateKey = null

if(process.env.NODE_ENV === "developement"){
  privateKey = fs.readFileSync('./config/private.pem', 'utf8');
}

ENV = {
  port: process.env.PORT,
  domain: process.env.DOMAIN,
  environment: process.env.NODE_ENV,
  protocol: process.env.PROTOCOL,
}

module.exports = {
  ENV,
  privateKey
}