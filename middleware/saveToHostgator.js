const {SQLQuery} = require('../backend-libs/setUptheTable');


module.exports = async (req,res,next)=>{
  console.log("saving to hostgator receiving: ", req.body)

  // save to mysql
  // Callbacks execute last
  // new Promise()


  // Execute the script to setup the table
  let resolvedto1 = await SQLQuery.cable("connect")
  console.log(resolvedto1)

  let sqlQuery = new SQLQuery(ENV, "subscribers")

  console.log("BETWEEN")
  present = await sqlQuery.checkIfpresent()

  console.log(present)
  
  if (!present) {
    sqlQuery.createTable()
  }
  console.log("A")
  let result = await sqlQuery.insertEntry(...Object.values(req.body))
  // let result = sqlQuery.insertEntry(...Object.values(req.body))

  
  console.log("D",  result)
  let resolvedto2 = await SQLQuery.cable("endconnect")
  console.log(resolvedto2)

  return res.json({
    didSave: true,
    msg: [`Hello from ${ENV.domain} web server on port ${ENV.port}`],
    Igot: req.body,
    i: undefined,
  })

  



  console.log("Async? YES line END")




  // const a = true
  // if(a){
  //   console.log(`from ${ENV.domain} saving to Hostgator`);
  //   console.log("going to redirect to: ", `${ENV.protocol}://${req.header('host')}`)
    
  //   return res.json({
  //     didSave: true,
  //     msg: [`Hello from ${ENV.domain} web server on port ${ENV.port}`],
  //     Igot: req.body,
  //     i: undefined,
  //   })
  //   console.log('3333')
  // } else {
  //   next()
  // }
}