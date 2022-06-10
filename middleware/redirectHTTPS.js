const ENV = require('../config/config')

module.exports = (req,res,next)=>{
  console.log("what is the Fuckin protocol: ", req.header('x-forwarded-proto'))
  console.log(`https://${req.header('host')}${req.url}`)
  
  if(ENV.environment === 'staging'){

    if(req.method==="GET"){
      if (req.header('x-forwarded-proto') !== 'https')
        res.redirect(`https://${req.header('host')}${req.url}`)
      else
        next()
    } else {
      if (req.header('x-forwarded-proto') !== 'https')
        res.send("cannot send requests with http protocol")
      else 
        next()
    }
  }
  next()
}