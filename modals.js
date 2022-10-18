const __templates={}

//save templates
parser.push(function(el,attr){
  
  //inject icons
  if(el.tagName=="ICON"&&el.children.length===0&&el.innerText){
    attr.import=new URL(`./icons/${el.innerText.trim().replaceAll(" ","-")}.svg`,manifest.src).href
  }
  
     //import external html snippets
     if (attr.import) {
       let open = el.getAttribute("import")||attr.import
       if (open.startsWith("#")) setTimeout(e => {
         if (open.replace("#", "") in __templates) {
           let c = __templates[open.replace("#", "")]
           el.innerHTML = c.html
           if (c.style) el.setAttribute("style", c.style + ";" + (el.getAttribute("style") || ""))
         }
       }, 0)
       else {
         if (sessionStorage[open]) el.innerHTML = sessionStorage[open]
         else fetch(open).then(e => e.ok ? e.text() : "not found")
           .then(e => {
             el.innerHTML = e
             sessionStorage[open] = e
           }).catch(e => el.innerHTML = e)
       }
     }
  
  if((el.tagName=="TEMPLATE"||el.tagName=="TEMP")&&el.id){
    __templates[el.id]={
      style:el.getAttribute("style")||"",
      html:el.innerHTML
    }
    
    el.remove()
  }
  
  if("open" in attr){
    el.onclick=e=>{
      document.modal(el.getAttribute("open")||"",el)
    }
  }
})

//open object
document.modal=function(open="",el=document.body){
  //define modal element
  let mod = document.createElement("modal")
  mod.innerHTML = "<h1 -color=white -margin=auto>...</h1>"
  mod.setAttribute("url-scope", el.closest("[url-scope]") ? el.closest("[url-scope]").getAttribute("url-scope") : location.href)
  mod.setAttribute("onclick", "if(event.composedPath()[0]===this)history.back()")
  mod.setAttribute("style", "position:fixed;z-index:3;top:0;left:0;width:100%;height:100%;background:#00000030;overflow: auto;display:flex;flex-direction:column;align-items:flex-start;align-content:flex-start;justify-content:flex-start;flex:none")
  document.body.appendChild(mod)
  
  if (open.startsWith("#") && open.replace("#", "") in __templates) {
    //if is inline modal
    history.pushState(btoa(Math.random()), null, location.href)
    let data = __templates[open.replace("#", "")]
    mod.innerHTML = data.html || ""
    mod.setAttribute("style", mod.getAttribute("style") + ";" + data.style)
    document.body.appendChild(mod)
  }
  
  
  //if template is external
  if (!open.startsWith("#")) {
    mod.setAttribute("url-scope", open)
    history.pushState(btoa(Math.random()), null, location.href)
  
    if (sessionStorage[open]) mod.innerHTML = sessionStorage[open]
    else fetch(open).then(e => e.ok ? e.text() : undefined)
      .then(e => {
        mod.innerHTML = e
        sessionStorage[open] = e
      }).catch(e => mod.innerHTML = e)
  
  }
  return mod
}

//on back press remove last added modal
window.onpopstate=e=>{
  if(window.onBack)onBack(history.state)
  let el=[...document.querySelectorAll("modal")].pop()
  if(el)el.remove()
}
