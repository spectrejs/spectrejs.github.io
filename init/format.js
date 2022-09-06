/**
 * parses data into html elements
 * can make custom elements and listw
 * */
app.format=function(prop,val){
  if(val!==undefined){
    if(val!==null){val
       _app.format[prop]=val
      
      //handle direct writes html
      ;[...document.querySelectorAll(`[format="${prop}"]`)].forEach(e=>{
        //handle empty temps
        if(!e.getAttribute("template"))e.setAttribute("template",e.innerHTML)
        
        let temp=e.getAttribute("template")
        if(typeof val=="object"){
          //handle arrays (lists)
          if(val instanceof Array){
            let list=""
            val.forEach(x=>{
             let n=temp
             if(typeof x=="object"&&x!==null)Object.keys(x).forEach(y=>n=n.replaceAll(`{${y}}`,x[y]))
             list+=n.replaceAll("{*}",x)
            })
            e.innerHTML=list
          } else {
            //handle objects
            Object.entries(val).forEach(e=> temp=temp.replaceAll(`{${e[0]}}`,e[1]))
            e.innerHTML=temp
          }
        } else e.innerHTML=e.getAttribute("template").replaceAll("{*}",val)
       
      })
      
      if(_app.edited[prop])_app.edited[prop](val)
    } else {
      //null tbd
    }
  } else return _app.format[prop]
  return app
}



app.edit=function(target,method,...args){
  if(typeof _app.format[target]=="object"&&_app.format[target]!==null){
    if(_app.format[target] instanceof Array){
      let n=_app.format[target][method](...args)
     if(method=="filter"||method=="map"){_app.format[target]=n}
    } else _app.format[target][method]=args[0]
    app.format(target,_app.format[target])
  } else {
    switch(method){
      case "++":
      case "increase":
        _app.format[target]++
        break;
      case "--":
      case "decrease":
        _app.format[target]--
        break;
      case "+":
        _app.format[target]+=args[0]
        break;
      case "-":
        _app.format[target] -= args[0]
        break;
      case "*":
        _app.format[target]=_app.format[target]*args[0]
        break;
      case "/":
        _app.format[target]=_app.format[target]/args[0]
        break;
      case "%":
        _app.format[target]=_app.format[target]%args[0]
        break;
      
      default:
      _app.format[target]=String(_app.format[target])[method](...args)
    }
    app.format(target,_app.format[target])
  }
  return app
}



/**
 * launches callback on data edited/formated
 * to spy on list changes etc
 * */
 app.onFormat=function(method,handler){
   _app.edited[method]=handler
   return app
 }
 

app.refreshFormat=function(){
  Object.keys(_app.format).forEach(e=>{
    app.format(e,app.format(e))
  })
}
