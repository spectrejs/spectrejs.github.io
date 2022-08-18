

function special(node,key){
   return [...node.attributes].map(e=>e.name).filter(e=>e.startsWith("@")).filter(e=>node.getAttribute(e)==key).map(e=>e.replace("@",""))
}

const specials={
  text(el,val){
    el.innerText=val
  },
  html(el,val){
    el.innerHTML=val
  },
  on(el,event,val,prev){
    el.addEventListener(event,function(a,b){
      if(prev)a.preventDefault()
      val(a,b)
    })
  },
  style(el,style,val,prev){
    el.style[style]=val
  },
  list(el,list){
    let temp=el.getAttribute("template")||"<div>undefined</div>"
    let html=""
    list.forEach((v,i)=>{
      let mt=temp
      if(mt.includes("{@self}"))mt=mt.replaceAll("{@self}",String(v))
      if(typeof v=="object")mt=template(mt,v)
      html+=mt
    })
    el.innerHTML=html
  },
  
  format(el,obj){
    if(el.getAttribute("template").includes("{@self}"))el.innerHTML=el.getAttribute("template").replace("{@self}",String(obj))
    else el.innerHTML=template(el.getAttribute("template"),obj)
  }
}

  let nargs = /\{([0-9a-zA-Z_]+)\}/g
  function template(string) {
  var args

  if (arguments.length === 2 && typeof arguments[1] === "object") {
    args = arguments[1]
  } else {
    args = new Array(arguments.length - 1)
    for (var i = 1; i < arguments.length; ++i) {
      args[i - 1] = arguments[i]
    }
  }

  if (!args || !args.hasOwnProperty) {
    args = {}
  }

  return string.replace(nargs, function replaceArg(match, i, index) {
    var result

    if (string[index - 1] === "{" &&
      string[index + match.length] === "}") {
      return i
    } else {
      result = args.hasOwnProperty(i) ? args[i] : null
      if (result === null || result === undefined) {
        return ""
      }

      return result
    }
  })
}


return function match(key, val) {
  [...document.body.querySelectorAll("*")].forEach(e => {
    special(e, key).forEach(x => {
      //event specials
      if (x.startsWith("on:")) specials.on(e, x.replace("on:", "").split(".")[0], val, x.split(".")[1])
      //style specials
      if(x.startsWith("style:"))specials.style(e,x.replace("style:",""),val)
      //bound specials
      if (specials[x]) specials[x](e, val)
    })
  })
}
