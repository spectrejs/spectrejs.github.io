//binds elements to global variables
parser.push(function(el,attr){
  let id=Object.keys(attr).filter(e=>e.startsWith("#"))[0]
  if(id&&el.tagName!=="TEMPLATE"){
    //cache id
    id=id.replace("#","")
    
    //declare bound
    el.setAttribute("bind",id)
    
    //set template
    if(!("template" in attr))el.setAttribute("template",el.innerHTML)
    
    //parse and catch default value 
    let def="default" in attr?attr.default:undefined
    def="store" in attr?__storage.get(attr.store,id,def):def
    //parse json
    try{def=JSON.parse(def)}catch(e){}
    //if no value is set then create a shortcut
    if(def===undefined)def=el
    
    
    
    //the id is the name of the bind
    if("#"+id in window){
      //just resets the element refrence on new bind
      if(typeof window[id]=="object"&&window[id]!==null&&window[id] instanceof Element)window["#"+id]=el
      __refresh(id);
    }
    else try{
      Object.defineProperty(window,id,{
        set(value){
          let prev=JSON.stringify(window["#"+id])
          window["#"+id]=value
          //if data changed refresh
          setTimeout(()=>{if(prev!==JSON.stringify(value))__refresh(id)},0)
          return true
        },
        get(){
          let prev=JSON.stringify(window["#"+id])
           //if data changed refresh
          setTimeout(()=>{if(prev!==JSON.stringify(window["#"+id]))__refresh(id)},0)
          //when bind data queried
          return window["#"+id]
          
        }
      })
      
      //set default
      window[id]=def
      
    }catch(e){if(e.message.includes("redefine"))console.warn(id+" has already been defined in your javascript, use another id.");else console.error(e)}
    
    //fetch data from external sources
    if ("fetch" in attr) fetch(new URL(attr.fetch, el.closest("[url-scope]") ? el.closest("[url-scope]").getAttribute("url-scope") : location.href)).then(e => e.ok?e.text():undefined)
      .then(e => {
        try { e = JSON.parse(e) } catch (e) {}
        if(e!==undefined)window[id] = e
      }).catch(e => {})
  }
  
})

//on bind populate new values
const __refresh=id=>{
  //skip on init empty values
  if(window[id]===undefined)return true
  if(typeof window[id]=="object"&&window[id]!==null&&window[id] instanceof Element)return true
  
  //list all paintable elements
  let bound=[...document.querySelectorAll(`[bind="${id}"]`)]
  for(let i=0;i<bound.length;i++){
    
    //if data was already painted then skip
    if(bound[i].getAttribute("cache")===JSON.stringify(window[id]));
    else {
      
      //repaint data
      bound[i].innerHTML=__raw_bind(window[id],bound[i].getAttribute("template"),bound[i].getAttribute("join"),bound[i].getAttribute("preview"))
      //cache painted data
      bound[i].setAttribute("cache",JSON.stringify(window[id]))
      //store changes
      __storage.set(bound[i].getAttribute("store"),id,JSON.stringify(window[id]))
      //trigger onbind event
      if (bound[i].getAttribute("onbind")) {
        let val = bound[i].getAttribute("onbind").trim()
        //eventhandler
        __builder(val).apply(bound[i], [window[id]])
      }
    }
  }
}


//
const __raw_bind=(data,temp="",join="",preview="")=>{
  if(data===undefined||temp===undefined)return ""
  //wrap non-arrays into an array
  if(typeof data=="object"){
    if(data===null||!(data instanceof Array))data=[data]
  } else data=[data]
  
  //handle previews
  if(preview=="first")data=[data[0]]
  if(preview=="last")data=[data.pop()]
  if(preview=="random")data=[data[Math.floor(Math.random() * data.length)]]
  if(typeof (preview-0)=="number")[data[preview-0]]

  return data.map(e=>String(temp).replaceAll("{*}",typeof e!=="object"?String(e):"{*}").replace(/{.*?}/g,function(rep){
    let x=rep.replace(/[{}]/g,"").trim()
    try{x=Function(`return arguments[0].${x}`)(e)}catch(e){x=undefined}
    return x===undefined?rep:x
  })).join(join||"")
}


//set or retrieve data from storages
const __storage={
  get(store,id,def){
    let val=undefined
    if(store=="local")val=localStorage[id]
    if(store=="session")val=sessionStorage[id]
    if(store=="params")val=location.params[id]
    return val!==undefined?val:def
  },
  set(store,id,val){
    if(store=="local")localStorage[id]=val
    if(store=="session")sessionStorage[id]=val
    if(store=="params")location.params[id]=val
  }
}
