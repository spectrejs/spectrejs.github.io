/*spy on appended children*/new MutationObserver(e=>e.forEach(e=>[...e.addedNodes].filter(e=>e.nodeName!=="#text").filter(e=>e.nodeName!=="#comment").map(mutate).map(e=>e.removeAttribute("_parsed")))).observe(document.documentElement,{childList:true,subtree:true})



//runtime mutations based on passed attributes
function mutate(el){
  //check if an element is already parsed (!)
  if(el.getAttribute("_parsed"))return el
  else el.setAttribute("_parsed",".")
  
  /*merges all attributes into one object*/let attr=Object.assign({},...[...(el.attributes||[])].map(e=>{return {[e.name]:e.value}}))
  
  for(const prop in attr){
  /* IDs, from #id to id=id */
  if(prop.startsWith("#")){
    el.id=prop.replace("#","")
    el.removeAttribute(prop)
  }
  
  /* Styles, from -color=blue to style=color:blue */
  if(prop.startsWith("--")){
    el.style.setProperty(prop,attr[prop])
    el.removeAttribute(prop)}
    
  if(prop.startsWith("-")){
    if(prop.includes(".")){
      //inline child selectors (beta)
      let collect=prop.replace("-","").split(".")
      let style=collect.pop()
      let selector=collect.join(".")
      ;[...el.querySelectorAll(selector||"*")].map(e=>e.style[style]=attr[prop])
    } else el.style[prop.replace("-","")]=attr[prop].startsWith("--")?`var(${attr[prop]})`:attr[prop]
    el.removeAttribute(prop)}
  
  /* Classes, from .blue to class=blue or .red.long to class="red long" */
  if(prop.startsWith(".")){
    el.classList.add(...prop.replace(".","").split("."))
    el.removeAttribute(prop)
  }
  
  /* Types, from ::submit to type=submit */
  if(prop.startsWith(":")){
    if("type" in el)el.type=prop.replace(":","")
    else el.setAttribute("type",prop.replace(":",""))
    el.removeAttribute(prop)
  }
  
  /*Events, from on:click to [eventListener] */
  if(prop.startsWith("on.")){
    let event = prop.replace("on.","").split(".")[0]
    let type = prop.split(".")[2]
    el["on"+event]=e=>{
      if(type=="prevent")e.preventDefault()
      
      if(type=="script"){
        Function("return async function(e){"+attr[prop]+"}")().apply(el,[e])
      } else {
      Function(`if(typeof ${attr[prop]}==="function"){${attr[prop]}.apply(arguments[0],[arguments[1]])} `)(el,e)
      if(type=="once") el["on"+event]=e=>{}}
      
    }
  }
  
  
  
  
  /* set bind default value */
  if(attr["bind.params"]!==undefined&&app.params[attr["bind.params"]]!==undefined)attr["bind.default"]=app.params[attr["bind.params"]]
  if(attr["bind.local"]!==undefined&&localStorage[attr["bind.local"]]!==undefined)attr["bind.default"]=localStorage[attr["bind.local"]]
  if(attr["bind.session"]!==undefined&&sessionStorage[attr["bind.session"]]!==undefined)attr["bind.default"]=sessionStorage[attr["bind.session"]]

  
  /*href & src full scope support via modals*/
  if(prop=="href"||prop=="src"||prop.startsWith("open")||prop.endsWith(".url")){
    let c=el.closest("[url-scope]")
    if(c)c=c.getAttribute("url-scope")
    else c=location.href
    if(prop.startsWith("open")||prop.endsWith(".url"))el.setAttribute(prop,new URL(attr[prop],c).href)
    el[prop]=new URL(el.getAttribute(prop),c).href
  }
  
  /* Open modal pages */
  if(prop=="open")el.onclick=e=>app.open(attr[prop])
  if(prop=="open.nav")el.onclick=e=>window.open(attr[prop])
  if(prop=="open.frame")el.onclick=e=>app.open(attr[prop],"frame")
  if(prop=="open.solid")el.onclick=e=>app.open(attr[prop],"solid")
  
  /*backup*/
  if(prop=="back")el.onclick=e=>history.back()
  
  
  /*Custom events itemclick and enter*/
  if(prop.startsWith("on.itemclick"))el.onclick=e=>{
    if(e.composedPath()[0]!==el){
      /* god knows i dont trust this code but it works so... eish */
      let sh={}
    let path=e.composedPath()
    let root={}
    while(root!==el){root=path.pop()}
    root=path.pop()
    let target=path[0]||root
    let index=-1
    ;[...el.children].forEach((e,i)=>index=e===root?i:index)
    let bindData=window["#"+attr.bind]
    let bind={}
    if(typeof bindData=="object"&&bindData!==null&&bindData instanceof Array)bind=bindData[index]
    let ent={root,target,index,bind,bindData}
    if(prop.endsWith(".script"))Function(`return async function(e){${attr[prop]}}`)().apply(el,[ent])
    else Function(`if(typeof ${attr[prop]}==="function"){${attr[prop]}.apply(arguments[0],[arguments[1]])} `)(el,ent)
    }
  }
  
  //handle keyboard enter
  if(prop.startsWith("on.enter"))el.onkeyup=e=>{
    if (e.keyCode == 13){
      let type = prop.split(".")[2]
      
      if(type=="script"){
        Function("return async function(e){"+attr[prop]+"}")().apply(el,[e])
      } else {
      Function(`if(typeof ${attr[prop]}==="function"){${attr[prop]}.apply(arguments[0],[arguments[1]])} `)(el,e)
      if(type=="once") el.onkeyup=e=>{}}
    }
  }
  
  }
  
  //specials
  
  //create bind
  if(attr.bind){
    if (!attr.template) el.setAttribute("template", el.innerHTML)
    el.innerHTML = ""
    bind(attr.bind)}
  
  //bind default
  if(attr["bind.default"]!==undefined&&attr.bind){
    let prop="bind.default"
    try{attr[prop]=JSON.parse(attr[prop])}catch(e){}
    if(window[attr.bind]===undefined)window[attr.bind]=attr[prop]
  }
  
  //bind url 
  if(attr["bind.url"]){
    fetch(el.getAttribute("bind.url"))
    .then(e=>e.ok?e.text():"").then(e=>{
      let t=e||attr["bind.default"]
      try{t=JSON.parse(t)}catch(e){}
      window[attr.bind]=t
    }).catch(e=>{})
  }
  
  
  //Async tags
  if(el.tagName=="SCRIPT"){
      el.remove()
      setTimeout(e=>document.head.appendChild(el),0) }
  
  //inject loading icon
  if(el.tagName=="LOAD")el.innerHTML=`<svg fill=currentColor .loading width=16 height=16 viewBox="0 0 24.00 24.00"><path d="M12 4V2C6.5 2 2 6.5 2 12h2c0-4.4 3.6-8 8-8z"/></svg>`
  
  if(el.tagName=="IMG"||el.tagName=="IFRAME")el.loading="lazy"
  if(el.tagName=="IMG")el.alt=el.alt||el.src
  
  //inject svg icon
  if(el.tagName=="ICON"&&!el.children[0]){
    let icon=el.innerText.replaceAll(" ","-")
    el.innerHTML=`<svg fill=currentColor .loading width=16 height=16 viewBox="0 0 24.00 24.00"><path d="M12 4V2C6.5 2 2 6.5 2 12h2c0-4.4 3.6-8 8-8z"/></svg>`
    if(sessionStorage["icon-"+icon])el.innerHTML=sessionStorage["icon-"+icon]
    else fetch(new URL("./ui/icons/"+icon+".svg",manifest.src).href).then(e=>e.text()).then(e=>{el.innerHTML=e;sessionStorage["icon-"+icon]=e}).catch(e=>el.innerHTML=`<svg width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>`)
  }
  
  //adding custom parsers 
  _app.parser.forEach(e=>e(el,attr))
  //parsing deep nested kids
  ;[...(el.children||[])].forEach(mutate)
  return el
}


