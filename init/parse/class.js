/*

<p .blue.centered .round >
 
 appends classes to element
 shortcut

*/

  return function clss(el,deep){
  Object.keys(_getAttr(el))
    .forEach(e => {
      if (e.startsWith(".")) {
        e.split(".").forEach(e=>e?el.classList.add(e):"")
        el.removeAttribute(e)
      }
    })
  if (deep)[...el.children].map(function(e) { clss(e, true) })
}
