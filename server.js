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





wserver.get('/', (req,res)=>{
  const { social_media } = require('./social.data')
  
  res.render('home', {social_media})
})




wserver.listen(ENV.port, () => {
  console.log(`Global-Freedom-Movement web server is running on port ${wserver.get("port")}`)
})