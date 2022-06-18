const { publicEncrypt } = require("crypto")
const fs = require("fs")

const publicKey = fs.readFileSync('./config/public.pem', 'utf8');


module.exports = (req,res,next)=>{
  
  // Asymetric encryption
  console.log("\n___Ecrypting this Data:___\n", req.body)
  console.log("\n\n", publicKey, typeof publicKey, "\n\n")
  

  let encryptedDataEmail = publicEncrypt(
    publicKey,
    Buffer.from(req.body.email)
  )
  let encryptedDataPhone = publicEncrypt(
    publicKey,
    Buffer.from(`${req.body.phone}`)
  )

  encryptedDataEmail = encryptedDataEmail.toString("hex")
  encryptedDataPhone = encryptedDataPhone.toString("hex")
  console.log(encryptedDataEmail, encryptedDataEmail.length, "\n\n")
  console.log(encryptedDataPhone, encryptedDataPhone.length, "\n\n")

  req.body.email = encryptedDataEmail
  req.body.phone = encryptedDataPhone

  console.log('___req.body before getting saved in the DB___\n', req.body)


  return next()
}