console.log(document.readyState)

if(environment != "developement"){
  document.getElementById("decy-id").remove()
} else {
  document.getElementById("local-dec").addEventListener("click", async (e) => {
    const messages_container = document.getElementsByClassName("server-messages")[0]
    messages_container.innerHTML = ""
    console.log("local click")
    console.log(`${endpoint}/localhost-dec`)
    
    try {
      response = await fetch(`${endpoint}/localhost-dec`, {
        method: 'GET',
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
        json_response.SRV.message.forEach(message => {
          const para = document.createElement("p");
          para.innerHTML = message
          messages_container.appendChild(para)
        });
        
      } else {
        const para = document.createElement("p");
        para.innerHTML = 'Got response, but is not ok'
        messages_container.appendChild(para)
        
      }
    } else {
      const para = document.createElement("p");
      para.innerHTML = 'Something went wrong with fetch'
      messages_container.appendChild(para)
      
    }
  })
  
  document.getElementById("staging-hostgator-dec").addEventListener("click", async (e) => {
    const messages_container = document.getElementsByClassName("server-messages")[0]
    messages_container.innerHTML = ""
    console.log(`${endpoint}/hostgator-to-homecosmos-dec`)
    
    try {
      response = await fetch(`${endpoint}/hostgator-to-homecosmos-dec`, {
        method: 'GET',
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
        json_response.SRV.message.forEach(message => {
          const para = document.createElement("p");
          para.innerHTML = message
          messages_container.appendChild(para)
        });
        
      } else {
        const para = document.createElement("p");
        para.innerHTML = 'Got response, but is not ok'
        messages_container.appendChild(para)
        
      }
    } else {
      const para = document.createElement("p");
      para.innerHTML = 'Something went wrong with fetch'
      messages_container.appendChild(para)
      
    }
  })
}

