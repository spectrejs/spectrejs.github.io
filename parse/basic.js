function getAttr(e){
  return [...e.attributes].map(e=>e.name)
}

export function id(nodes){
  nodes.forEach(e=>{
    getAttr(e).forEach(x=>{
      if(x.startsWith("#")){
        e.removeAttribute(x)
        e.id=x.replace("#","")
        node[e.id]=e.id
      }
    })
    
    
  })
}

export function type(nodes){
  nodes.forEach(e=>{
    getAttr(e).forEach(x=>{
      if(x.startsWith("::")){
        e.removeAttribute(x)
        e.type=x.replace("::","")
      }
    })
    
    
  })
}


export function list(nodes){
  nodes.forEach(e=>{
    getAttr(e).forEach(x=>{
      if(x.startsWith("@list")||x.startsWith("@format")){
        e.setAttribute("template",e.innerHTML)
        e.innerHTML=""
      }
      
    })
  })
}

export function css(nodes){
  nodes.forEach(e=>{
    getAttr(e).forEach(x=>{
      if(x.startsWith("-")){
        e.style[x.replace("-","")]=e.getAttribute(x)
        e.removeAttribute(x)
      }
    })
  })
}

export function classy(nodes){
  nodes.forEach(e => {
        getAttr(e).forEach(x => {
          if (x.startsWith(".")) {
            e.removeAttribute(x)
            x.split(".").forEach(n=>n?e.classList.add(n):"")
          }
        })
        
  })
}
