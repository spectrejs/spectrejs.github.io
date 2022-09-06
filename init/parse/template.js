return function template(el,deep){
  Object.keys(_getAttr(el))
  .forEach(e=>{
    if((e.startsWith("format")||e.startsWith("list"))&&(!el.getAttribute("template"))){
      let cf=el.getAttribute(e)
      el.setAttribute("template",el.innerHTML)
      el.innerHTML=""
      //reset format
      app.format(cf,_app.format[cf])
    }
  })
  if(deep)[...el.children].map(function(e){template(e,true)})
}
