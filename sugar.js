//adds syntactic sugar
parser.push(function(el,attr){
  
  //set scoped style holder or access if already exist
  let id=el.getAttribute("_sid")||btoa(Math.random())
  let style=document.querySelector(`[for="${id}"]`)||document.createElement("style")
   style.innerHTML=""
  
  
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
    
    //selectors eg. :hover ::after
    if(prop.startsWith(":")){
      el.setAttribute("_sid",id)
      style.innerHTML+=`[_sid="${id}"]${prop}{${val}}\n`
    }
    
    
  }
  
  //advance style query system selects children, selectors are scoped to the element
  if("style" in attr){
    let s=attr.style.split("&").filter(e=>e).map(e=>[...e.split("=")])
    let ss=s.filter(e=>e[0]&&!e[1])[0]
    if(ss)el.setAttribute("style",ss)
    //create styling for children
    s=s.filter(e=>e[0]&&e[1])
    if(s.length){
      el.setAttribute("_sid",id)
      style.innerHTML+=s.map(e=>`[_sid="${id}"] ${e[0].replaceAll(",",`,[_sid="${id}"] `)}{${e[1]}}`).join("")
  
    }
  }
  
  //add style if it has value (useless comments i know)
  if(style.innerHTML){
    document.head.appendChild(style)
    style.setAttribute("for",id)
  }
})
