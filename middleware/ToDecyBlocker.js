const { ENV } = require('../config/config')
const httpStatus = require("http-status-codes")
const { DecyOpDenied } = require('../error-management/custom-errors')

module.exports = (req,res,next)=>{
  if(ENV.environment === 'developement'){
    return next()
  }
  return next(new DecyOpDenied())
}