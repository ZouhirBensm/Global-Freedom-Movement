// Require memory-cache module
const mcache = require('memory-cache')


module.exports = {
  // Defining the cache function middleware
  cache: (duration) => {
    return(req,res,next)=>{
      let key =  '__express__' + req.originalUrl || req.url
      let cachedBody = mcache.get(key)
      // If cached respond with cached content
      if(cachedBody){
        res.send(cachedBody)
        return
      // else put content in cache
      } else {
        res.sendResponse = res.send
        res.send = (body)=>{
          mcache.put(key,body,duration*1000)
          res.sendResponse(body)
        }
        // Go to next middleware
        next()
      }
    }
  }
}