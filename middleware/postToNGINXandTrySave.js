const { ENV } = require('../config/config'),
fetch = require('node-fetch')

module.exports = async (req,res,next)=>{
  console.log("receiving:", req.body)

  let response, nginx_state_data
  try {
    // response = await fetch('http://homecosmos.ddns.net/Zouhirs-router', {
    response = await fetch('WROND TO SIMULATE TRIGGERING SAVETOHOSTGATOR ON NEXT', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {'Content-Type': 'application/json'}
    })
    nginx_state_data = await response.json();
  } catch(e){
    console.log("_____SAVE ON HOSTGATOR_______")
    // E.g. Could not POST the entry, therefor save in HOSTGATOR
    return next();
  } 

  console.log("222")
  if (nginx_state_data?.didSave === true) {
    // E.g. Theoretically entry been SAVED on my NGINX
    console.log("from nginx:", nginx_state_data);
    // console.log("going to redirect to: ", `${ENV.protocol}://${req.header('host')}`)
    // res.status(200).redirect(`${ENV.protocol}://${req.header('host')}`)
    return res.json(nginx_state_data)
  } else if (nginx_state_data?.didSave === false){
    // E.g Could NOT SAVE according to response on NGINX, therefor save in HOSTGATOR
    next()
  } else {
    // NGINX nginx_state_data structure is invalid, the NGINX shoud return true or false for nginx_state_data.didSave
    console.error("response nginx_state_data.didSave from NGINX is invalid, please check the NGINX server for proper json response")
  }
}