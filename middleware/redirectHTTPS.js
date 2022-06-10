const ENV = require('../config/config')

module.exports = (req,res,next)=>{
  if(ENV.environment === 'staging' && req.method==="GET"){
    console.log("what is the Fuckin protocol: ", req.header('x-forwarded-proto'))
    console.log(`https://${req.header('host')}${req.url}`)
    // next()
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  }
  next()
}