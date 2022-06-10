const atags = document.getElementsByTagName("a")
// console.log("atags: \n", atags)


for (i=1; i< atags.length; i++) {
  let display = getSocialURI(atags[i].href)
  const span = document.createElement("span");
  span.innerHTML = display
  span.classList.add("tooltiptext");
  atags[i].insertAdjacentElement("afterend", span);
}


function getSocialURI(href) {

  // console.log("href2: \n", href)

  const parsedURLprotocol =/^(\w+)\:/.exec(href)
  // console.log("proto2: \n", parsedURLprotocol[1])

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

