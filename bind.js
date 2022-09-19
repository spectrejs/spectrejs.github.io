



_app.raw_bind=(data,temp,join="",preview)=>{
  //wrap non-arrays into an array
  if(typeof data=="object"){
    if(data===null||!(data instanceof Array))data=[data]
  } else data=[data]
  
  //handle previews
  if(preview=="first")data=[data[0]]
  if(preview=="last")data=[data.pop()]
  if(preview=="random")data=[data[Math.floor(Math.random() * data.length)]]

  
  let list =""
  //template data
  data.forEach(e=>{
    let t=temp.replaceAll("{*}",String(e))
    .replace(/{.*?}/gi,function(rep){
      rep=rep.replace(/[{}]/g,"").split(".")
        let c=e
        for(var i=0;i<rep.length;i++){
          if(typeof c=="object"&&c!==null&&c[String(rep[i]).trim()]!==undefined)c=c[String(rep[i]).trim()];
          else c=undefined;
        }
        return c
      
    })
    /*if(typeof e=="object"&&e!==null)for(const x in e){
      t=t.replaceAll(`{${x}}`,String(e[x])) }*/
    list+=join+t
  })
  return list
}

_app.createBind=(nv,vd)=>{
  Object.defineProperty(window,nv,{
    set(v){
      window["#"+nv]=v
      refresh()
      return true
    },
    get(){
      if(typeof window["#"+nv]=="object")setTimeout(refresh,0)
      return window["#"+nv]
    }
  })
  let refresh=()=>{
    let bound=[]
    //bind all currently visible elements
   ;[...document.querySelectorAll(`[bind="${nv}"]`)]
    .forEach(e=>{e.innerHTML=_app.raw_bind(window["#"+nv],e.getAttribute("template"),e.getAttribute("join")||"",e.getAttribute("bind.preview"));bound.push(e)})
  //handle bound events
  bound.forEach(e=>{
      let value=window["#"+nv]
      //if binds are connected to storages
      if(e.getAttribute("bind.local"))localStorage[e.getAttribute("bind.local")]=JSON.stringify(value)
      if(e.getAttribute("bind.session"))sessionStorage[e.getAttribute("bind.session")]=JSON.stringify(value)
      
      //event binds
      if(e.getAttribute("on.bind"))Function(`if(typeof ${e.getAttribute("on.bind")}==="function"){${e.getAttribute("on.bind")}.apply(arguments[0],[arguments[1]])} `)(e,value)
     
      if(e.getAttribute("on.bind.prevent"))Function(`if(typeof ${e.getAttribute("on.bind.prevent")}==="function"){${e.getAttribute("on.bind.prevent")}.apply(arguments[0],[arguments[1]])} `)(e,value)
      
      //once binds
      if(e.getAttribute("on.bind.once")){
        Function(`if(typeof ${e.getAttribute("on.bind.once")}==="function"){${e.getAttribute("on.bind.once")}.apply(arguments[0],[arguments[1]])} `)(e,value)
        e.removeAttribute("on.bind.once")
      }
      
      //inline
      if(e.getAttribute("on.bind.script"))Function("return async function(e){"+e.getAttribute("on.bind.script")+"}")().apply(e,[value])
    })
  }
  if(vd!==undefined)window[nv]=vd
}
