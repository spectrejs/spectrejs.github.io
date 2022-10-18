//handle events
parser.push(function(el,attr){
  for(const prop in attr){
    let val=attr[prop].trim()
    let [event, extend]=prop.split(".").map(e=>String(e))
    
    //timer events
    if(event.startsWith("after"))setTimeout(x=>__builder(val).apply(el,[{}]),(event.replace("after","")||"1")-0)
    if(event.startsWith("every")){
      let timer=setInterval(x=>__builder(val).apply(el,[{clear(){clearInterval(timer)}}]),(event.replace("every","")||"1000")-0)}
    
    
    if(event.startsWith("on"))el[event]=x=>{
        if(extend=="prevent")x.preventDefault()
        __builder(val).apply(el,[x])
        if(extend=="once")el[event]=e=>{/*removed*/}
      }
      
      //on enter pressed for inputs
      if(event=="onenter")el.onkeyup=x=>{
        if(extend=="prevent")x.preventDefault()
        if(x.keyCode==13){
          __builder(val).apply(el,[x])
          if(el.hasAttribute("clear"))el.value=""
          if(extend=="once")el[event]=e=>{/*removed*/}
        }
      }
      
      //on element mounted
      if(event=="onmount")__builder(val).apply(el)
      
      //on item selected in list, useful to handle dynamically added lists
      if(event=="onitemclick")el.onclick=x=>{
      if (extend == "prevent") x.preventDefault()
      if (extend == "once") el[event] = e => {}
      if (x.composedPath()[0] !== el) {
        x.root = x.composedPath()[x.composedPath().indexOf(el) - 1]
        x.index=[...el.children].indexOf(x.root)
        x.value=window[el.id]
        if(x.value&&typeof x.value=="object"&&x.value instanceof Array)x.value=x.value[x.index]
        //when item is selected in a list
        __builder(val).apply(el,[x])
    }}
    
      
    
  }})

const __builder=e=>{
  if(e in window)return window[e]
  else return Function(`return async function(event){${e}}`)()
}

