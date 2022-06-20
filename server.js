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
const ToDecyBlocker = require('./middleware/ToDecyBlocker')
const DecyMiddleware = require('./middleware/DecyMiddleware')
const errorHandler = require('./error-management/errorsMiddleware')
const encryptData = require('./middleware/encryptData')



let i = 0

wserver.use((req,res,next)=>{
  if (i === 0 ) {
    console.log("HEADERS", req.headers)
  }
  i = 1

  next()
})
wserver.use(redirectHTTPS)


wserver.get('/', objectifyEnvVars, (req,res)=>{
  // console.log("DO WE HAVE the F**in data", res.locals.environmentVars)

  console.log("Query parameter", req.query.popup)
  const { social_media } = require('./social.data')
  res.render('home', {
    social_media, 
    environmentVars: res.locals.environmentVars,
    [req.query.popup ? "popup": null]: req.query.popup,
  })
})


wserver.get('/op' , objectifyEnvVars, (req,res)=>{
  res.render('op', {
    environmentVars: res.locals.environmentVars,
  })
})




wserver.get('/localhost-dec', ToDecyBlocker, DecyMiddleware, (req,res)=>{
  res.json({})
})


// wserver.post('/backlog_register', saveToHostgator, (req,res) => {
//   // console.log("in server.js: ", res.locals.insertResultRessolvedVal)

//   res.json({SRV: {
//     type: "Success",
//     message: ["You have successfully submited your form! Thank you."]
//   }})

// })

wserver.post('/store', encryptData, saveToHostgator, (req,res) => {
  
  res.json({SRV: {
    type: "Success",
    message: ["You have successfully submited your form! Thank you."]
  }})
})


wserver.post('/test', (req,res) => {

  return res.json({SRV: {
    type: "Success",
    message: ["test post is working"]
  }})

})



wserver.use(errorHandler.errorHandler)

wserver.listen(ENV.port, () => {
  console.log(`Global-Freedom-Movement web server is running on port ${wserver.get("port")}`)
})