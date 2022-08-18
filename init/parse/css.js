/*

<p -color=blue -z-index=3 >

set inline css
shortcut

*/

return function css(el,deep){
  Object.keys(_getAttr(el))
    .forEach(e => {
      if (e.startsWith("-")) {
        el.style[e.replace("-", "")]=el.getAttribute(e)
        el.removeAttribute(e)
      }
    })
  if (deep)[...el.children].map(function(e) { css(e, true) })
}
