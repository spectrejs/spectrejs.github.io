export default function script(nodes){
  let scripts=[]
  nodes.forEach(e=>{
    if(e.tagName.toLowerCase()=="script"){
      scripts.push("data:text/javascript;base64,"+btoa(e.innerHTML))
      e.remove()
    }
  })
  return scripts
}
