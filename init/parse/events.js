/*

< p #id >

set id of element
shortcuts to node binds

*/
app.on=function(event,val){
  return val?(_app.events[event]=val,app):_app.events[event]
}
app.off=function(event){
  let x=_app.events[event]
  delete _app.events[event]
  return x
}

return function events(el,deep){
  Object.keys(_getAttr(el))
  .forEach(e=>{
    if(e.startsWith("on:")){
      let bind=el.getAttribute(e)
      e=e.replace("on:","").split(".")
      el["on"+e[0]]=(x)=>{
        if(e[1])x.preventDefault()
        if(_app.events[bind])_app.events[bind].apply(el,[x])
      }
      
    }
  })
  if(deep)[...el.children].map(function(e){events(e,true)})
}
