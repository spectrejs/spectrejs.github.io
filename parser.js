//global parser for new html elements
const parser=[]

//detect when a new element is added to the dom
new MutationObserver(e=>{e.forEach(e=>[...e.addedNodes].filter(e=>e.nodeName!=="#text").filter(e=>e.nodeName!=="#comment").map(function mutate(e){
  //e is the current parsed element
  //makes sure an element is not parsed twice.
  if(e.getAttribute("_parsed"))return e
  else e.setAttribute("_parsed",".")
  //merges all attributes into one object
  let attr=Object.assign({},...[...(e.attributes||[])].map(e=>{return {[e.name]:e.value}}))
  
  //fix relative urls in modal scopes
  for(const p in attr){
    if((p=="src"||p=="href"||p=="link"||p=="import"||p=="open")&&!attr[p].startsWith("#")){
      if(attr[p].startsWith("lib:"))attr[p]=attr[p].replace("lib:",new URL("./lib/",manifest.src).href)+".js"
      try{let base=e.closest("[url-scope]")?e.closest("[url-scope]").getAttribute("url-scope"):location.href
      attr[p]=new URL(attr[p],base).href}catch(e){}
      e.setAttribute(p,attr[p])
    }
  }
  
  //lazy load images for performance 
  if(e.tagName=="IMG"||e.tagName=="IFRAME"){
    e.loading="lazy"
    e.alt=e.alt||String(String(String(e.src).split("/").pop()).split(".")[0]).replaceAll("-"," ")}
 
  
  //loops through parsers
  parser.forEach(func=>func(e,attr))
  //mutate children
  ;[...(e.children||[])].filter(e=>e.nodeName!=="#text").filter(e=>e.nodeName!=="#comment").map(mutate)
  return e
}))
  //placed outside so that the parser goes through an element only once, dont remove
  document.querySelectorAll("[_parsed]").forEach(e=>e.removeAttribute("_parsed"))
  
}).observe(document.documentElement,{childList:true,subtree:true})

