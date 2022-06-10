const ENV = require('../config/config')

module.exports = (req,res,next)=>{
  // console.log(ENV.environment)
  res.locals.environmentVars = {
    environment: ENV.environment,
    port: ENV.port,
    domain: ENV.domain
  }
  next()
}