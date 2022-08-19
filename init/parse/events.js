/*

< p #id >

set id of element
shortcuts to node binds

*/
app.events={}
app.on=function(event,val){
  return val?app.events[event]=val:app.events[event]
}
app.off=function(event){
  let x=app.events[event]
  delete app.events[event]
  return x
}

return function events(el,deep){
  Object.keys(_getAttr(el))
  .forEach(e=>{
    if(e.startsWith("on:")){
      let bind=el.getAttribute(e)
      e=e.replace("on:","").split(".")
      el.addEventListener(e[0],(x)=>{
        if(e[1])x.preventDefault()
        if(app.events[bind])app.events[bind](x)
      })
      
    }
  })
  if(deep)[...el.children].map(function(e){events(e,true)})
}
