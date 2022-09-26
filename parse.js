//global parser for new html elements
const parser=[]
parser.extend=function(e){
  this.push(e)
  return this
}

//detect when a new element is added to the dom
new MutationObserver(e=>e.forEach(e=>[...e.addedNodes].filter(e=>e.nodeName!=="#text").filter(e=>e.nodeName!=="#comment").map(function mutate(e){
  //e is the current parsed element
  //makes sure an element is not parsed twice.
  if(e.getAttribute("_parsed"))return e
  else e.setAttribute("_parsed",".")
  
  //merges all attributes into one object
  let attr=Object.assign({},...[...(e.attributes||[])].map(e=>{return {[e.name]:e.value}}))
  
  //fix relative urls
  for(const p in attr){
    if(p=="src"||p=="href"||p.endsWith(".url")||p.startsWith("open")){
      let base=e.closest("[url-scope]")?e.closest("[url-scope]").getAttribute("url-scope"):location.href
      attr[p]=new URL(attr[p],base).href
      e.setAttribute(p,attr[p])
    }
  }
  
  //loops through parsers
  parser.forEach(func=>func(e,attr))
  //mutate children
  ;[...(e.children||[])].filter(e=>e.nodeName!=="#text").filter(e=>e.nodeName!=="#comment").map(mutate).map(e=>e.removeAttribute("_parsed"))
  return e
}).map(e=>e.removeAttribute("_parsed")))).observe(document.documentElement,{childList:true,subtree:true})

