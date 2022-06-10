const ENV = require('../config/base')

module.exports = (req,res,next)=>{
  console.log(ENV.environment)
  res.locals.environment = ENV.environment
  next()
}