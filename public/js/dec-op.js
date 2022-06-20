console.log(document.readyState)

if(environment != "developement"){
  document.getElementById("decy-id").remove()
}

document.getElementById("local-dec").addEventListener("click", async (e) => {
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
      
      
    } else {
      
      
    }
  } else {
    
    
  }

})

document.getElementById("staging-hostgator-dec").addEventListener("click", (e) => {
  console.log("remote click")
})
