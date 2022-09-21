



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
    let t=String(temp).replaceAll("{*}",String(e))
    .replace(/{.*?}/gi,function(rep){
      rep=rep.replace(/[{}]/g,"").split(".")
        let c=e
        for(var i=0;i<rep.length;i++){
          if(typeof c=="object"&&c!==null&&c[String(rep[i]).trim()]!==undefined)c=c[String(rep[i]).trim()];
          else c=undefined;
        }
        return c
      
    })
    list+=join+t
  })
  return list
}

const bind=(nv,vd)=>{
    try{Object.defineProperty(window,nv,{
    set(v){
      window["#"+nv]=v
      if(window["#"+nv]===undefined||window["#"+nv]===null);else refresh()
      return true
    },
    get(){
      if(typeof window["#"+nv]==="object")setTimeout(refresh,0)
      return window["#"+nv]
    }
  })}catch(e){}
  let refresh=()=>{
    let bound=[]
    //bind all currently visible elements
   ;[...document.querySelectorAll(`[bind="${nv}"]`)]
    .forEach(e=>{e.innerHTML=_app.raw_bind(window["#"+nv],e.getAttribute("template"),e.getAttribute("join")||"",e.getAttribute("bind.preview"));bound.push(e)})
  //handle bound events
    bound.forEach(e=>{
      let value=window["#"+nv]
      let attr=Object.assign({},...[...(e.attributes||[])].map(e=>{return {[e.name]:e.value}}))
      
      //if binds are connected to storages
      if(attr["bind.local"])localStorage[attr["bind.local"]]=JSON.stringify(value)
      if(attr["bind.session"])sessionStorage[attr["bind.session"]]=JSON.stringify(value)
      
      //event binds
      if(attr["on.bind"])Function(`if(typeof ${attr["on.bind"]}==="function"){${attr["on.bind"]}.apply(arguments[0],[arguments[1]])} `)(e,value)
     
      if(attr["on.bind.prevent"])Function(`if(typeof ${atttr["on.bind.prevent"]}==="function"){${attr["on.bind.prevent"]}.apply(arguments[0],[arguments[1]])} `)(e,value)
      
      //once binds
      if(attr["on.bind.once"]){
        Function(`if(typeof ${attr["on.bind.once"]}==="function"){${attr["on.bind.once"]}.apply(arguments[0],[arguments[1]])} `)(e,value)
        e.removeAttribute("on.bind.once")
      }
      
      //inline
      if(attr["on.bind.script"])Function("return async function(e){"+attr["on.bind.script"]+"}")().apply(e,[value])
    })
  }
  
  if(vd!==undefined)window[nv]=vd||window[nv];
}
