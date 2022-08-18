/*

<p load=path >

loads in new page on el click.
default state based scopes apply

*/

return function load(el,deep){
  Object.keys(_getAttr(el))
    .forEach(e => {
      if (e=="load") {
        el.onclick=()=>_app.load(el.getAttribute("load"))
      }
    })
  if (deep)[...el.children].map(function(e) { load(e, true) })
}
