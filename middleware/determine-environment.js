// const ENV = require('../config/base')

module.exports = (req,res,next)=>{
  console.log(process.env.NODE_ENV)
  res.locals.environment = process.env.NODE_ENV
  next()
}