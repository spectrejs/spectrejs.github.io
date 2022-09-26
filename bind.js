//binds js to ui using proxy
const bind=new Proxy({},{
  set(t,prop,v,r){
    const proxy=obj=>{
      Object.keys(obj).map(e=>typeof obj[e]=="object"&&obj[e]!==null?obj[e]=proxy(obj[e]):"")
      return new Proxy(obj,{
        set(t,p,v,r){
          v = typeof v == "object" && v !== null ? proxy(v) : v
          Reflect.set(t, p, v, r)
          __refresh(prop)
          return true
        }
      })
    }
    
    v=typeof v=="object"&&v!==null?proxy(v):v
    Reflect.set(t,prop,v,r)
    __refresh(prop)
    return true
  }
})

//reflects changes to ui when data changes
const __refresh=function(prop){
  let bound=[...document.querySelectorAll(`[bind="${prop}"],[bind\\.local="${prop}"],[bind\\.session="${prop}"]`)]
  bound.forEach(e=>{
    //format template into dom
    e.innerHTML=__raw_bind(bind[prop],e.getAttribute("template"),e.getAttribute("bind.join"),e.getAttribute("bind.preview"))
    
    //save to storages
    if(e.getAttribute("bind.local"))localStorage[prop]=JSON.stringify(bind[prop])
    else if(e.getAttribute("bind.session"))sessionStorage[prop]=JSON.stringify(bind[prop])
    
    if(e.getAttribute("onbind")){
      let val=e.getAttribute("onbind").trim()
      if(val in window)window[val].apply(e,[x])
      else Function(`return async function(value){${val}}`)().apply(e,[bind[prop]])
    }
    
    })
  
  
}

//create binds
parser.extend(function(el,attr){
  if("bind" in attr||"bind.local" in attr||"bind.session" in attr){
    let def=attr["bind.default"]
    let cbind=attr["bind.local"]||attr["bind.session"]||attr.bind
    
    //create a template
    if(!("template" in attr)){
      el.setAttribute("template",el.innerHTML)
      el.innerHTML=""
    }
    
    //bind from storages
    if("bind.local" in attr&&attr["bind.local"] in localStorage)def=localStorage[attr["bind.local"]]
    if("bind.session" in attr&&attr["bind.session"] in sessionStorage)def=sessionStorage[attr["bind.sessiom"]]
    if("bind.cookie" in attr&&attr["bind.cookie"] in cookies)def=cookies[attr["bind.local"]]
    
    //parse json if is
    try{def=JSON.parse(def)}catch(e){}
    
    //refresh bind
    if(cbind in bind)bind[cbind]=bind[cbind]
    else bind[cbind]=def
    
    //bind from an external source
    if("bind.url" in attr)fetch(new URL(attr["bind.url"],el.closest("[url-scope]")?el.closest("[url-scope]").getAttribute("url-scope"):location.href)).then(e=>e.text())
    .then(e=>{
      try{e=JSON.parse(e)}catch(e){}
      bind[cbind]=e
    }).catch(e=>{})

  }
})

const __raw_bind=(data,temp="",join="",preview="")=>{
  if(data===undefined)return ""
  //wrap non-arrays into an array
  if(typeof data=="object"){
    if(data===null||!(data instanceof Array))data=[data]
  } else data=[data]
  
  //handle previews
  if(preview=="first")data=[data[0]]
  if(preview=="last")data=[data.pop()]
  if(preview=="random")data=[data[Math.floor(Math.random() * data.length)]]
  if(typeof (preview-0)=="number")[data[preview-0]]

  return data.map(e=>String(temp).replaceAll("{*}",String(e)).replace(/{.*?}/g,function(rep){
    let x=rep.replace(/[{}]/g,"").trim()
    try{x=Function(`return arguments[0].${x}`)(e)}catch(e){x=undefined}
    return x===undefined?rep:x
  })).join("")
}
