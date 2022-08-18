/*

<input ::submit >
set typeof input
shortcut
*/


return function type(el,deep){
  Object.keys(_getAttr(el))
    .forEach(e => {
      if (e.startsWith("::")) {
        el.type=e.replace("::", "")
        el.removeAttribute(e)
      }
    })
  if (deep)[...el.children].map(function(e) { type(e, true) })
}
