/*

< p #id >

set id of element
shortcuts to node binds

*/


return function bound(el,deep){
  Object.keys(_getAttr(el))
  .forEach(e=>{
    if(e.startsWith("@")&&app.bind[el.getAttribute(e)]!==undefined){
      app.bind[el.getAttribute(e)]=app.bind[el.getAttribute(e)]
    }
  })
  if(deep)[...el.children].map(function(e){bound(e,true)})
}
