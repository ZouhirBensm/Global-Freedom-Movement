const { ENV } = require('../config/config')
const httpStatus = require("http-status-codes")
const { NotGetWithHTTP } = require('../error-management/custom-errors')

module.exports = (req,res,next)=>{
  // console.log("HEADERS", req.headers)
  console.log("what is the Fuckin protocol: ", req.header('x-forwarded-proto'))
  
  if(ENV.environment === 'staging'){
    
    if(req.method==="GET"){
      // header() method giving headers from the browser
      if (req.header('x-forwarded-proto') !== 'https') {
        // E.g. GET with HTTP
        console.log(`https://${req.header('host')}${req.url}`)
        res.status(httpStatus.StatusCodes.MOVED_TEMPORARILY).redirect(`https://${req.header('host')}${req.url}`)
      }
      else {
        // E.g. GET with HTTPS
        next()
      }
    } else {
      if (req.header('x-forwarded-proto') !== 'https') {
        // E.g. POST with HTTP
        next(new NotGetWithHTTP())
      }
      else {
        // E.g. POST with HTTPS
        next()
      }
    }
  }
  next()
}