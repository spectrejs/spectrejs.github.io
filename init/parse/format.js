/*

*/

/*formats object into element*/function format(el,val){
  if(typeof val=="object"){
    let temp=el.getAttribute("template")||""
    Object.keys(val).forEach(e=>temp=temp.replaceAll(`{${e}}`,val[e]))
    el.innerHTML=temp } else el.innerHTML=(el.getAttribute("template")||"").replace("{*}",String(val))}

//reflect formats to ui
app.format=new Proxy({},{
  set(target,prop,val,rec){
    //proxy sub objects
    if(typeof val=="object"&&!val[".proxied"]){ val[".proxied"]=true; val=new Proxy(val,{set(nt, np, nv){ nt[np]=nv; app.format[prop]=app.format[prop]; return true}})}
    //format changes
    ;[...document.querySelectorAll(`[format="${prop}"]`)]
    .forEach(e=>format(e,val)); target[prop]=val; return true
  }
})

return function format(el,deep){
  Object.keys(_getAttr(el))
  .forEach(e=>{
    if(e=="format"||e=="list"){
      el.setAttribute("template",el.innerHTML)
      el.innerHTML=""
      
      //rebinds values
      e=="format"?app.format[el.getAttribute(e)]=app.format[el.getAttribute(e)]:app.list[el.getAttribute(e)]=app.list[el.getAttribute(e)]
    }
  })
  if(deep)[...el.children].map(function(e){format(e,true)})
}
