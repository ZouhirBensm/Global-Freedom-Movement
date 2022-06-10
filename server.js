// Added environment variables
require('dotenv').config()
// Custom environment variables
const ENV = require('./config/base'),

layouts = require('express-ejs-layouts'),
express = require('express'),
wserver = express()

// wserver.use(express.json())
// wserver.use(express.urlencoded())
wserver.set("port", ENV.port)
wserver.set("view engine", "ejs")
wserver.use(layouts)
wserver.use(express.static("public"))

const cachingMiddleware = require('./middleware/cachingMiddleware')
const detEnvironment = require('./middleware/determine-environment')

wserver.use(detEnvironment)



wserver.get('/', (req,res)=>{
  const { social_media } = require('./social.data')
  console.log("DO WE HAVE the F**in data", res.locals.environment)
  res.render('home', {social_media, environment: res.locals.environment})
})


wserver.get('/backlog_register', (req,res)=>{
  console.log("receiving: ". req.body)
})


wserver.listen(ENV.port, () => {
  console.log(`Global-Freedom-Movement web server is running on port ${wserver.get("port")}`)
})