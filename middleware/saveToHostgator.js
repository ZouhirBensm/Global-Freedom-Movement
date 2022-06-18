const {SQLQuery} = require('../backend-libs/setUptheTable');



module.exports = async (req,res,next)=>{
  console.log("\n___Saving to Hostgator receiving:___\n", req.body)

  // save to mysql
  // Callbacks execute last
  // new Promise()


  let connectResolvedVal, isPresentTableResolvedVal, insertResultRessolvedVal, disconnectResolvedVal
  // CONNECT
  try { connectResolvedVal = await SQLQuery.cable("connect") } catch(err) {console.log("\nPromise returned in SQLQuery.cable('connect') rejected with a error\n"); return next(err)}
  
  console.log("if resolved1: ", connectResolvedVal)

  let sqlQuery = new SQLQuery(ENV, "subscribers")

  console.log("BETWEEN")
  // *CHECK TABLE PRESENCE*
  try { isPresentTableResolvedVal = await sqlQuery.checkIfpresent() } catch(err) {console.log("\nPromise returned in sqlQuery.checkIfpresent() rejected with a error\n"); return next(err)}
  

  console.log("isPresentTableResolvedVal: ", isPresentTableResolvedVal)
  
  if (!isPresentTableResolvedVal) {
    console.log("A")
    try { isTableCreatedResolvedVal = await sqlQuery.createTable() } catch(err) {console.log("\nPromise returned in sqlQuery.createTable() rejected with a error\n"); return next(err)}
    console.log("isTableCreatedResolvedVal: ", isTableCreatedResolvedVal)
  }
  
  // *INSERT THE ENTRY*
  try { insertResultRessolvedVal = await sqlQuery.insertEntry(...Object.values(req.body)) } catch(err) {console.log("\nPromise returned in sqlQuery.insertEntry() rejected with a error\n"); return next(err)}

  
  console.log("insertResultRessolvedVal",  insertResultRessolvedVal)

  // *DISCONNECT*
  try { disconnectResolvedVal = await SQLQuery.cable("endconnect") } catch(err) {console.log("\nPromise returned in SQLQuery.cable('endconnect') rejected with a error\n"); return next(err)}

  
  console.log(disconnectResolvedVal)

  res.locals.insertResultRessolvedVal = insertResultRessolvedVal
  
  console.log("__before responding json:__\n")
  return next()





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
  //     res.json({
  //     didSave: false,
  //     msg: [`Hello from ${ENV.domain} web server pn port ${ENV.port}`],
  //     Igot: req.body,
  //     i: undefined,
  //   })
  // }
}