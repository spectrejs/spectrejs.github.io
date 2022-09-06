return async function scr(el,deep){
  if(el.tagName.toLowerCase()=="script"){
    el.remove()
    if(el.src)script(el.src)
    else Function(`return async (base)=>{
    const request=requestFactory(base)
    const script=scriptFactory(request);
    const scripts=sxFactory(script);
    ${el.innerHTML};
    return null
  }`)()(history.state).catch(console.error)
  }
  if(deep)[...el.children].map(function(e){scr(e,true)})
}
