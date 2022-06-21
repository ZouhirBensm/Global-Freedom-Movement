const { ENV, privateKey } = require('../config/config')
const {SQLQuery} = require('../backend-libs/setUptheTable');
const { privateDecrypt, constants } = require("crypto")



module.exports = async (req,res) => {

  
  let connectResolvedVal, isPresent_subscribers, isPresent_subscribers_decrypted, insertResultRessolvedVal, disconnectResolvedVal, entireTableResolvedVal
  
  console.log(req.originalUrl)
  if(req.originalUrl === "/hostgator-to-homecosmos-dec") {
    // CONNECT
    console.log("ici")
    try { connectResolvedVal = await SQLQuery.cable("connect", 1) } catch(err) {console.log("\nPromise returned in SQLQuery.cable('connect') rejected with a error\n"); return next(err)}
  } else if (req.originalUrl === '/localhost-dec') {
    // CONNECT
    try { connectResolvedVal = await SQLQuery.cable("connect") } catch(err) {console.log("\nPromise returned in SQLQuery.cable('connect') rejected with a error\n"); return next(err)}
  } else {
    console.error('Express GET request route is not expecting to use the DecyController.js Middleware')
  }
  
  
  console.log("if resolved1: ", connectResolvedVal)
  

  
  let sqlQuery = new SQLQuery(ENV, "subscribers", 1)
  
  // console.log("BETWEEN")
  // *CHECK TABLE PRESENCE*
  try { isPresent_subscribers = await sqlQuery.checkIfpresent() } catch(err) {console.log("\nPromise returned in sqlQuery.checkIfpresent() rejected with a error\n"); return next(err)}
  
  
  console.log("isPresent_subscribers: ", isPresent_subscribers)
  
  if (!isPresent_subscribers) {
    res.json({
      SRV: {
        type: "Success",
        message: ["No table under the name subscribers to Decrypt"]
      }
    })
  } else {
    // console.log("\n\n", privateKey, typeof privateKey, "\n\n________________________\n\n", publicDecrypt)
    // *RETRIEVING THE ENTIRE TABLE*
    try { entireTableResolvedVal = await sqlQuery.retrieveTable() } catch(err) {console.log("\nPromise returned in sqlQuery.retrieveTable() rejected with a error\n"); return next(err)}
    
    console.log("entireTableResolvedVal: ", entireTableResolvedVal)
    

    // IF /hostgator-to-homecosmos-dec DDIISSCCOONNEECCTT
    // CCOONNEECCTT TO LOCAL

    // Create new instance
    let sqlQuerySubscribersDecy = new SQLQuery(ENV, "subscribers_decrypted")
    
    
    // *CHECK TABLE PRESENCE*
    try { isPresent_subscribers_decrypted = await sqlQuerySubscribersDecy.checkIfpresent() } catch(err) {console.log("\nPromise returned in sqlQuery.checkIfpresent() rejected with a error\n"); return next(err)}
    
    // console.log("isPresent_subscribers_decrypted: ", isPresent_subscribers_decrypted)
    
    if (!isPresent_subscribers_decrypted) {
      // *CREATE TABLE*
      try { isTableCreatedResolvedVal = await sqlQuerySubscribersDecy.createTable(128, 'INT UNSIGNED NOT NULL KEY') } catch(err) {console.log("\nPromise returned in sqlQuery.createTable() rejected with a error\n"); return next(err)}
      // console.log("isTableCreatedResolvedVal: ", isTableCreatedResolvedVal)
    }

    // *DECRYPTING EACH ROW AND INSERTING EACH ENTRY*
    for(let i=0; i<entireTableResolvedVal.length; i++) {
      // For each row check whether the id is not already present in the decrypt table, is so skip process

      try { CheckforIDinDecyTableResolvedVal = await sqlQuerySubscribersDecy.checkForEntryWithID(entireTableResolvedVal[i].id) } catch(err) {console.log("\nPromise returned in sqlQuerySubscribersDecy.checkForEntryWithID() rejected with a error\n"); return next(err)}

      CheckforIDinDecyTableResolvedVal = Object.values(CheckforIDinDecyTableResolvedVal[0])[0]

      console.log(`does the entry for ${entireTableResolvedVal[i].id}  already exist?\n${CheckforIDinDecyTableResolvedVal}, ${(!!CheckforIDinDecyTableResolvedVal)}, ${typeof CheckforIDinDecyTableResolvedVal}`)

      if(!CheckforIDinDecyTableResolvedVal){
        console.log("___ENTERING DECRYPT PROCESS_____")
        // console.log("index: ", i, "\n", entireTableResolvedVal[i])
        const encryptedDataEmail = entireTableResolvedVal[i].email
        const encryptedDataPhone = entireTableResolvedVal[i].phone_number
        
        console.log("\n___Decrypting this Data:___\n", encryptedDataEmail, "\n\n", encryptedDataPhone)
        // console.log("\n\n", privateKey, typeof privateKey, "\n\n")
        
        let decryptedDataEmail = privateDecrypt({
          key: privateKey,
          passphrase: 'nwofokzebi',
        },
        Buffer.from(encryptedDataEmail, "base64"));
  
        let decryptedDataPhone = privateDecrypt({
          key: privateKey,
          passphrase: 'nwofokzebi',
        },
          Buffer.from(encryptedDataPhone, "base64"));
        
        console.log(decryptedDataEmail.toString("utf-8"), "\n\n")
        console.log(decryptedDataPhone.toString("utf-8"), "\n\n")
  
        decryptedDataEmail= decryptedDataEmail.toString("utf-8")
        decryptedDataPhone= decryptedDataPhone.toString("utf-8")
  
        let body = {
          email: decryptedDataEmail,
          phone_number: parseInt(decryptedDataPhone),
          is_subscriber_newsletter: entireTableResolvedVal[i].is_subscriber_newsletter.lastIndexOf(1) !== -1,
          is_brn_phone: entireTableResolvedVal[i].is_subscriber_newsletter.lastIndexOf(1) !== -1,
          id: entireTableResolvedVal[i].id
        }
  
        console.log(body)
  
        
  
        // *INSERT THE ENTRY*
        try { insertResultRessolvedVal = await sqlQuerySubscribersDecy.insertEntry(...Object.values(body)) } catch(err) {console.log("\nPromise returned in sqlQuery.insertEntry() rejected with a error\n"); return next(err)}
  
        //
        
      } // else already present in decrypted DB based on ID
    } // for end loop all encrpted DB

    // *DISCONNECT*
    try { connectResolvedVal = await SQLQuery.cable("endconnect") } catch(err) {console.log("\nPromise returned in SQLQuery.cable('connect') rejected with a error\n"); return next(err)}

    console.log(connectResolvedVal)

    res.json({
      SRV: {
        type: "Success",
        message: ["Done updating decryted database"]
      }
    })
  } // end of else for if encrypted DB present
}
