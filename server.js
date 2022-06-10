// Added environment variables
require('dotenv').config()
// Custom environment variables
const ENV = require('./config/config'),
layouts = require('express-ejs-layouts'),
express = require('express'),
wserver = express()



wserver.use(express.json())
wserver.use(express.urlencoded({extended: true}))
wserver.set("port", ENV.port)
wserver.set("view engine", "ejs")
wserver.use(layouts)
wserver.use(express.static("public"))



const cachingMiddleware = require('./middleware/cachingMiddleware')
const objectifyEnvVars = require('./middleware/objectifyEnvironmentVars')
const redirectHTTPS = require('./middleware/redirectHTTPS')

wserver.use(redirectHTTPS)



wserver.get('/', objectifyEnvVars, (req,res)=>{
  const { social_media } = require('./social.data')
  // console.log("DO WE HAVE the F**in data", res.locals.environmentVars)
  res.render('home', {
    social_media, 
    environmentVars: res.locals.environmentVars
  })
})


wserver.post('/backlog_register', (req,res)=>{
  console.log("receiving:", req.body)
  res.json(req.body)
})


wserver.listen(ENV.port, () => {
  console.log(`Global-Freedom-Movement web server is running on port ${wserver.get("port")}`)
})