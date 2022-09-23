



_app.raw_bind=(data,temp,join="",preview)=>{
  if(data===undefined)return ""
  //wrap non-arrays into an array
  if(typeof data=="object"){
    if(data===null||!(data instanceof Array))data=[data]
  } else data=[data]
  
  //handle previews
  if(preview=="first")data=[data[0]]
  if(preview=="last")data=[data.pop()]
  if(preview=="random")data=[data[Math.floor(Math.random() * data.length)]]

  return data.map(e=>String(temp).replaceAll("{*}",String(e)).replace(/{.*?}/g,function(rep){
    let x=rep.replace(/[{}]/g,"").trim()
    try{x=Function(`return arguments[0].${x}`)(e)}catch(e){x=undefined}
    return x===undefined?rep:x
  })).join("")
}

function bind(b,vv){
  function refresh(){
  let bound=[]
    //bind all currently visible elements
   ;[...document.querySelectorAll(`[bind="${b}"]`)]
    .forEach(e=>{e.innerHTML=_app.raw_bind(window[b],e.getAttribute("template"),e.getAttribute("join")||"",e.getAttribute("bind.preview"));bound.push(e)})
  //handle bound events
    bound.forEach(e=>{
      let value=window[b]
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
  function sub(v){
  v = new Proxy(v, {
    set(t, p, v, r) {
      if (typeof v == "object" && v !== null) v = sub(v)
      Reflect.set(t, p, v, r)
      if (!(typeof v == "object" && v !== null))refresh()
      return true
    }
  })
  let x = Object.assign({}, v)
  Object.keys(v).forEach(e => delete v[e])
  Object.assign(v, x)
  return v
  }
  try{
    Object.defineProperty(window,b,{
      set(value){
        window["#"+b]=typeof value=="object"&&value!==null?sub(value):value
        refresh()
        return true
      },
      get(){
        return window["#"+b]
      }
    })
  }catch(e){}
  if(vv!==undefined) window[b]=vv
  else window[b]=window[b]
}

