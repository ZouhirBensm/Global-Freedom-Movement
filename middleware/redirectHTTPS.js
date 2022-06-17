const { ENV } = require('../config/config')
const httpStatus = require("http-status-codes")
const { NotGetWithHTTP } = require('../error-management/custom-errors')

module.exports = (req,res,next)=>{
  // console.log("what is the Fuckin protocol: ", req.header('x-forwarded-proto'))
  console.log("WHAT IS THE FUCKIN ENV: ", ENV.environment)
  if(ENV.environment === 'staging'){
    console.log("A")
    if(req.method==="GET"){
      console.log("B")
      // header() method giving headers from the browser
      if (req.header('x-forwarded-proto') !== 'https') {
        // E.g. GET with HTTP
        console.log("C")
        console.log(`https://${req.header('host')}${req.url}`)
        res.status(httpStatus.StatusCodes.MOVED_TEMPORARILY).redirect(`https://${req.header('host')}${req.url}`)
      }
      else {
        // E.g. GET with HTTPS
        console.log("D")
        return next()
      }
    } else {
      console.log("E")
      if (req.header('x-forwarded-proto') !== 'https') {
        // E.g. POST with HTTP
        console.log("F")
        return next(new NotGetWithHTTP())
      }
      else {
        // E.g. POST with HTTPS
        console.log("G")
        return next()
      }
    }
  }
  console.log("H")
  return next()
}