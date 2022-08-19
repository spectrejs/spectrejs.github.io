/*

< p #id >

set id of element
shortcuts to node binds

*/
app.id=function(id){
  return document.getElementById(id)
}

return function id(el,deep){
  Object.keys(_getAttr(el))
  .forEach(e=>{
    if(e.startsWith("#")){
      el.removeAttribute(e)
      el.id=e.replace("#","")
    }
  })
  if(deep)[...el.children].map(function(e){id(e,true)})
}
