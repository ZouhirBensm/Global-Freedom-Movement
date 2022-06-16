
console.log("in file:1")

async function sendEntryToExpressWebServer(entryobject) {
  // console.log(entryobject)
  // console.log(environment, port, domain)



  console.log("endpoint: ", endpoint)
  let response 
  // 2
  try {
    response = await fetch(`${endpoint}/backlog_register`, {
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
  if(response.ok) {
    try {json_response = await response.json()} catch(e) {console.error(e)}
    console.log("server response: ", json_response)
    // if(json_response.didSave === true) {window.location.href = `${endpoint}?popup=Data has been saved on the server`;} else if (json_response.didSave === false) {console.log("fetch() and .json() succeeded and Data has not been saved on the server")} else {console.log("fetch() and .json() succeeded but json_response received is missing the didSave property")}
  } 
}