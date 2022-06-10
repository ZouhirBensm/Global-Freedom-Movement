const ENV = require('../config/base')

module.exports = (req,res,next)=>{
  // console.log(ENV.environment)
  res.locals.environmentVars = {
    environment: ENV.environment,
    port: ENV.port,
    domain: ENV.domain
  }
  next()
}