let global = 55
document.getElementById("form").onsubmit = function(e) {
  e.preventDefault()
  // console.log(e.target.elements.email.value)
  // console.log(e.target.elements.phone.value)
  // console.log(e.target.elements.newsletter.checked)
  // console.log(e.target.elements.brn.checked)
  // console.log(e.target.elements.terms.checked)

  let phone = e.target.elements.phone.value
  arr_phone = Array.from(phone)
  arr_phone = arr_phone.filter(character => (/[0-9]/.test(character)))
  phone = parseInt(arr_phone.join(""))

  // console.log("phone number: ", phone)

  const entryobject = {
    email: e.target.elements.email.value,
    phone: phone,
    newsletter: e.target.elements.newsletter.checked,
    brn: e.target.elements.brn.checked,
  }
  sendEntryToExpressWebServer(entryobject)
}

function sendEntryToExpressWebServer(entryobject) {
  console.log(entryobject)
  console.log(global)
  console.log(protocol, sprotocol, port, domain)

  // const response = fetch(`${process.env.ROOT}/backlog_register`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   },
  //   body: JSON.stringify(entryobject)
  // })

  // console.log(response)
}