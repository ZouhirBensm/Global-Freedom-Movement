const ENV = require('../config/config')
const httpStatus = require("http-status-codes")
const { NotGetWithHTTP } = require('../error-management/custom-errors')

module.exports = (req,res,next)=>{
  console.log("what is the Fuckin protocol: ", req.header('x-forwarded-proto'))
  console.log(`https://${req.header('host')}${req.url}`)
  
  if(ENV.environment === 'staging'){

    if(req.method==="GET"){
      if (req.header('x-forwarded-proto') !== 'https')
        res.status(httpStatus.StatusCodes.MOVED_TEMPORARILY).redirect(`https://${req.header('host')}${req.url}`)
      else
        next()
    } else {
      if (req.header('x-forwarded-proto') !== 'https')
        next(new NotGetWithHTTP())
      else 
        next()
    }
  }
  next()
}