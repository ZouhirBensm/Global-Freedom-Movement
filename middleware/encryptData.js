const { publicEncrypt, privateDecrypt } = require("crypto")
const fs = require("fs")

const publicKey = fs.readFileSync('./config/public.pem', 'utf8');
// const {privateKey, publicKey} = require("../config/keyGenerator")

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

  encryptedDataEmail = encryptedDataEmail.toString("base64")
  encryptedDataPhone = encryptedDataPhone.toString("base64")
  console.log(encryptedDataEmail, encryptedDataEmail.length, "\n\n")
  console.log(encryptedDataPhone, encryptedDataPhone.length, "\n\n")

  req.body.email = encryptedDataEmail
  req.body.phone = encryptedDataPhone

  console.log('___req.body before getting saved in the DB___\n', req.body)

  return next()

  // console.log("\n___Decrypting this Data:___\n", encryptedDataEmail, encryptedDataPhone)
  // console.log("\n\n", privateKey, typeof privateKey, "\n\n")
  
  // const decryptedDataEmail = privateDecrypt(
  //   {
  //     key: privateKey,
  //     passphrase: '',
  //   },
  //   Buffer.from(encryptedDataEmail, "base64")
  // );
  // const decryptedDataPhone = privateDecrypt(
  //   {
  //     key: privateKey,
  //     passphrase: '',
  //   },
  //   Buffer.from(encryptedDataPhone, "base64")
  // );
  
  // console.log(decryptedDataEmail.toString("utf-8"), "\n\n")
  // console.log(decryptedDataPhone.toString("utf-8"), "\n\n")

}