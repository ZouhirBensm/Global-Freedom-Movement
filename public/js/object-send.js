
console.log("in file:1")

async function sendEntryToExpressWebServer(entryobject) {
  console.log(entryobject)
  // console.log(environment, port, domain)



  console.log("endpoint: ", endpoint)
  let response 
  // 2
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
  // console.log(response)
  let json_response
  try {json_response = await response.json()} catch(e) {console.error(e)}
  console.log("server response: ", json_response)

  if(response && json_response){
    if(response.ok) {
      window.location.href = `${endpoint}?popup=${json_response.SRV.message[0]}#middle-box2`;
      // console.log("Go to: ", `${endpoint}?popup=${json_response.SRV.message[0]}#middle-box2`)
    } else {
      window.location.href = `${endpoint}?popup=Something went wrong, please try later or signal problem#middle-box2`;
      console.log(response, json_response, `Response status from submit: ${response.status}, ${response.statusText}#middle-box2`)
    }
  } else {
    window.location.href = `${endpoint}?popup=Something went wrong, please try later or signal problem#middle-box2`;
    console.log(`Did not receive a response`)
  }
}