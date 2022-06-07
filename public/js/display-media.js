const atags = document.getElementsByTagName("a")
// console.log(cards)


for (i=0; i< atags.length; i++) {
  
  let display = getSocialURI(atags[i].href)
  console.log(display)

  const span = document.createElement("span");
  span.innerHTML = display
  span.classList.add("tooltiptext");
  // code to be executed
  // atags[i].firstChild.appendChild(span);
  atags[i].insertAdjacentElement("afterend", span);

}


function getSocialURI(href) {

  // console.log(href)

  const parsedURLprotocol =/^(\w+)\:/.exec(href)
  // console.log("proto: ", parsedURLprotocol[1])

  let display
  switch (parsedURLprotocol[1]) {
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

