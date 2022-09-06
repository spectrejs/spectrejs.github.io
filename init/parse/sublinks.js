/**
 * turns dynamic links to absolute fixed links
 */

return function sub(el,deep){
  Object.keys(_getAttr(el))
  .forEach(e=>{
    if(e=="href"){
      el.href=new URL(el.getAttribute("href"),history.state).href
      }
    if (e == "src") {
      el.src = new URL(el.getAttribute("src"), history.state).href
    }
  })
  if(deep)[...el.children].map(function(e){sub(e,true)})
}
