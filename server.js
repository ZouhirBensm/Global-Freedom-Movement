// Added environment variables
require('dotenv').config()
// Custom environment variables
const { ENV } = require('./config/config'),
layouts = require('express-ejs-layouts'),
express = require('express'),
mysql = require('mysql'),
fetch = require('node-fetch'),
XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest,


 

wserver = express()


wserver.use(express.json())
wserver.use(express.urlencoded({extended: true}))
wserver.set("port", ENV.port)
wserver.set("view engine", "ejs")
wserver.use(layouts)
wserver.use(express.static("public"))



const cachingMiddleware = require('./middleware/cachingMiddleware')
const objectifyEnvVars = require('./middleware/objectifyEnvironmentVars')
const postToNGINXandTrySave = require('./middleware/postToNGINXandTrySave')
const saveToHostgator = require('./middleware/saveToHostgator')
const redirectHTTPS = require('./middleware/redirectHTTPS')
const errorHandler = require('./error-management/errorsMiddleware')




wserver.use(redirectHTTPS)






wserver.get('/', objectifyEnvVars, (req,res)=>{
  const { social_media } = require('./social.data')
  // console.log("DO WE HAVE the F**in data", res.locals.environmentVars)
  res.render('home', {
    social_media, 
    environmentVars: res.locals.environmentVars
  })
})

// postToNGINXandTrySave
wserver.post('/backlog_register', saveToHostgator, (req,res) => {

  // console.log("in server.js: ", res.locals.insertResultRessolvedVal)


  res.json({SRV: {
    type: "Success",
    message: ["You have successfully submited your form! Thank you."]
  }})

})


wserver.post('/test', (req,res) => {

  res.json({SRV: {
    type: "Success",
    message: ["test post is working"]
  }})

})



wserver.use(errorHandler.errorHandler)

wserver.listen(ENV.port, () => {
  console.log(`Global-Freedom-Movement web server is running on port ${wserver.get("port")}`)
})