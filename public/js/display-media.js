const atags = document.getElementsByTagName("a")
console.log("atags: \n", atags)


for (i=0; i< atags.length; i++) {
  
  // console.log("href: \n", atags[i].href)
  let display = getSocialURI(atags[i].href)
  
  const span = document.createElement("span");
  span.innerHTML = display
  span.classList.add("tooltiptext");
  // code to be executed
  // atags[i].firstChild.appendChild(span);
  atags[i].insertAdjacentElement("afterend", span);
  // if(display.length < 10){
  // } 
  // else {
  //   const span1 = document.createElement("span");
  //   const br = document.createElement("br")
  //   const span2 = document.createElement("span");
  //   span1.innerHTML = display.slice(0,9)
  //   span2.innerHTML = display.slice(10,display.length)
  //   span1.classList.add("tooltiptext");
  //   span2.classList.add("tooltiptext");
  //   // code to be executed
  //   // atags[i].firstChild.appendChild(span);
  //   atags[i].insertAdjacentElement("afterend", span2);
  //   atags[i].insertAdjacentElement("afterend", br);
  //   atags[i].insertAdjacentElement("afterend", span1);
  // }


}


function getSocialURI(href) {

  console.log("href2: \n", href)

  const parsedURLprotocol =/^(\w+)\:/.exec(href)
  console.log("proto2: \n", parsedURLprotocol[1])

  let display
  switch (parsedURLprotocol[1]) {
    case 'https':
    case 'http':
      const parsedURLhttp = /^\w+\:\/\/([^\/]+)\/(.*)$/.exec(href);
      // console.log(parsedURLhttp[2])
      // const [, protocol, fullhost, fullpath] = parsedURL
      display = parsedURLhttp[2]
      
      break;
    case 'mailto':
      const reg = /^[^@.\/]+:([^@.]+@[^@.]+\.{1}\w{1,6}$)/;
      const parsedURLmailto = reg.exec(atags[i].href)
      // console.log(parsedURLmailto[1])
      display = parsedURLmailto[1]
      break;
  
    default:
      break;
  }

  return display
}

