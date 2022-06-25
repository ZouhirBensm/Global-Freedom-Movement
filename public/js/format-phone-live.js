
const popup = document.getElementById("popup");
popup.style.display = "none";

console.log("format phone live")

const phone2 = document.getElementById("idphone2")
console.log(phone2)

phone2.addEventListener("input", (e) => {
  let got = e.target.value.search(/[^\d]+?/) 
  console.log("___",got,"___")
  
  // Constraint 1: Only digits
  if(got != -1){
    e.target.value = e.target.value.replace(e.target.value[got], "")
    // e.target.value = e.target.value.substr(0, got);
    console.log(e.target.value)
  }
  // Constraint 2: No more than 10 digits
  if(e.target.value.length > 10){
    e.target.value = e.target.value.substr(0, 10);
  }
  
})

phone2.addEventListener("focusin", (e)=>{
  console.log("on focus")
  console.log(e.target.value)

  if(e.target.value){
    let phone = e.target.value
    arr_phone = Array.from(phone)
    arr_phone = arr_phone.filter(character => (/[0-9]/.test(character)))
    e.target.value = parseInt(arr_phone.join(""))
  }

  e.target.value.length = 10

})