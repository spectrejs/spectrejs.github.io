//adds syntactic sugar
parser.extend(function(el,attr){
  for(const prop in attr){
    let val=attr[prop].trim()
    
    //set id
    if(prop.startsWith("#")){
      el.id=prop.replace("#","")
      el.removeAttribute(prop)
    }
    
    
    //set class
    if(prop.startsWith(".")){
      el.classList.add(...prop.split(".").filter(e=>e))
      el.removeAttribute(prop)
    }
    
    //set css variable
    if(prop.startsWith("--")){
      el.style.setProperty(prop,val)
      el.removeAttribute(prop)
    }
    
    //set css
    if(prop.startsWith("-")){
      el.style[prop.replace("-","")]=val.startsWith("--")?`var(${val})`:val
      el.removeAttribute(prop)
    }
    
    //set type
    if(prop.startsWith(":")){
      if("type" in el)el.type=prop.replace(":","")
      else el.setAttribute("type",prop.replace(":",""))
      el.removeAttribute(prop)
    }
    
    
  }
})
