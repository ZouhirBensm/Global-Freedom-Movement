// Transform into a promise, when resolves returns the value of the object
document.getElementById("form").onsubmit = function(e) {
  e.preventDefault()
  // console.log(e.target.elements.email.value)
  // console.log(e.target.elements.phone.value)
  // console.log(e.target.elements.newsletter.checked)
  // console.log(e.target.elements.brn.checked)
  // console.log(e.target.elements.terms.checked)

  // if use phone 1
  // let phone = e.target.elements.phone.value
  // arr_phone = Array.from(phone)
  // arr_phone = arr_phone.filter(character => (/[0-9]/.test(character)))
  // phone = parseInt(arr_phone.join(""))

  let phone2 = parseInt(e.target.elements.phone2.value)
  // console.log("phone number: ", phone)
  // console.log("phone number2: ", phone2)
  // console.log(phone === phone2)

  const entryobject = {
    email: e.target.elements.email.value,
    // phone: phone,
    phone: phone2,
    newsletter: e.target.elements.newsletter.checked,
    brn: e.target.elements.brn.checked,
  }

  // encrypt the entry object
  // encrypted result
  // decrypt the result locally
  // send the encrypted data to the server

  sendEntryToExpressWebServer(entryobject)

  // 1
  // console.log("Async?")
}

