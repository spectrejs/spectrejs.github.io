return async function loading(el,deep){
  if(el.tagName.toLowerCase()=="load")el.innerHTML=`<svg fill=currentColor .loading width=16 height=16 viewBox="0 0 24.00 24.00"><path d="M12 4V2C6.5 2 2 6.5 2 12h2c0-4.4 3.6-8 8-8z"/></svg>`
  if(deep)[...el.children].map(function(e){loading(e,true)})
}
