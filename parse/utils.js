const getAttr=e=>[...e.attributes].map(e=>e.name)

return {
  id(nodes){
  nodes.forEach(e=>{
    getAttr(e).forEach(x=>{
      if(x.startsWith("#")){
        e.removeAttribute(x)
        e.id=x.replace("#","")
      }
    })
  })
  return this
},

type(nodes){
  nodes.forEach(e=>{
    getAttr(e).forEach(x=>{
      if(x.startsWith("::")){
        e.removeAttribute(x)
        e.type=x.replace("::","")
      }
    })
    
    
  })
  return this
},

list(nodes){
  let temps=[]
  nodes.forEach(e=>{
    getAttr(e).forEach(x=>{
      if(x.startsWith("@list")||x.startsWith("@format")){
        e.setAttribute("template",e.innerHTML)
        temps.push(e.innerHTML)
        e.innerHTML=""
      }
      
    })
  })
  return temps
},

css(nodes){
  nodes.forEach(e=>{
    getAttr(e).forEach(x=>{
      if(x.startsWith("-")){
        e.style[x.replace("-","")]=e.getAttribute(x)
        e.removeAttribute(x)
      }
    })
  })
  return this
},

classy(nodes){
  nodes.forEach(e => {
        getAttr(e).forEach(x => {
          if (x.startsWith(".")) {
            e.removeAttribute(x)
            x.split(".").forEach(n=>n?e.classList.add(n):"")
          }
        })
        
  })
  return this
},

scriptSrc(nodes){
  return nodes.filter(e=>e.tagName.toLowerCase()=="script"&&e.src).map(e=>{e.remove();return e.src})},
script(nodes){
  return nodes.filter(e=>e.tagName.toLowerCase()=="script"&&!e.src).map(e=>{e.remove();return e.innerHTML})
},

styleSrc(nodes){
  return nodes.filter(e=>e.tagName.toLowerCase()=="link"&&e.rel=="stylesheet").map(e=>{e.remove();return e.href})},
style(nodes){
  return nodes.filter(e=>e.tagName.toLowerCase()=="style").map(e=>{e.remove();return e.innerHTML})
},

node(){
  window.node=Object.assign({},...[...document.querySelectorAll("[id]")].map(e=>{return {[e.id]:e}}))
}


}
