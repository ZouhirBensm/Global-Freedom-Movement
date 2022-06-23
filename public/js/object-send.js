
console.log("in file:1")

async function sendEntryToExpressWebServer(entryobject) {
  const popup = document.getElementById("popup");
  console.log(entryobject)
  // console.log(environment, port, domain)



  console.log("endpoint: ", endpoint)
  let response 
  try {
    response = await fetch(`${endpoint}/store`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(entryobject)
    })
  } catch (e) {
    console.error(`Catched Error: ${e}`)
  }
  let json_response
  try {json_response = await response.json()} catch(e) {console.error(e)}
  console.log("server response: ", json_response)

  if(response && json_response){
    if(response.ok) {
      popup.innerHTML = json_response.SRV.message[0]
      popup.style.color = "green";
    } else {
      popup.innerHTML = `Something went wrong, please try later or signal problem <a href="https://webdevelopercanada.website/Zouhir" target="_blank">to website developer</a>`
      popup.style.color = "red";
      console.log(response, json_response, `Response status from submit: ${response.status}, ${response.statusText}#middle-box2`)
    }
  } else {
    popup.innerHTML = `Something went wrong, please try later or signal problem <a href="https://webdevelopercanada.website/Zouhir" target="_blank">to  website developer</a>`
    popup.style.color = "red";
    console.log(`Did not receive a response`)
  }
}