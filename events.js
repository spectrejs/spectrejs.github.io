parser.extend(function(el,attr){
  for(const prop in attr){
    let val=attr[prop].trim()
    
    if(prop.startsWith("on")){
      let [event, extend]=prop.split(".")
      el[event]=x=>{
        if(extend=="prevent")x.preventDefault()
        if(val in window)window[val].apply(el,[x])
        else Function(`return async function(event){${val}}`)().apply(el,[x])
        if(extend=="once")el[event]=e=>{/*removed*/}
      }
      
      //custom events
      if(event=="onenter")el.onkeyup=x=>{
        if(extend=="prevent")x.preventDefault()
        if(x.keyCode==13){
          x.value=el.value
          if(val in window)window[val].apply(el,[x])
          else Function(`return async function(event){${val}}`)().apply(el,[x])
          if(extend=="once")el[event]=e=>{/*removed*/}
        }
      }
      
      if(event=="onitemclick")el.onclick=x=>{
        if(x.composedPath()[0]!==el){
          x.root=x.composedPath()[x.composedPath().indexOf(el)-1]
          if(x.root){
            x.bound=el.getAttribute("bind.local")||el.getAttribute("bind.session")||el.getAttribute("bind")
            x.index=[...el.children].indexOf(x.root)
            if(x.bound&&bind[x.bound]!==undefined&&typeof bind[x.bound]=="object"&&bind[x.bound]!==null&&bind[x.bound] instanceof Array)x.bind=bind[x.bound][x.index]
          }
          //when item is selected in a list
          if (val in window) window[val].apply(el, [x])
          else Function(`return async function(event){${val}}`)().apply(el, [x])
          
          
          
        }
        
      }
      
    }
  }
  
})
