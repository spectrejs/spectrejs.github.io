//icons and loading components
parser.extend(function(el,attr){
  if(el.tagName=="ICON"&&el.children.length===0){
    let icon=el.innerText.trim().replaceAll(" ","-")
    el.innerHTML=`<svg fill=currentColor .loading width=16 height=16 viewBox="0 0 24.00 24.00"><path d="M12 4V2C6.5 2 2 6.5 2 12h2c0-4.4 3.6-8 8-8z"/></svg>`
    if(sessionStorage["icon-"+icon])el.innerHTML=sessionStorage["icon-"+icon]
    else fetch(new URL("/ui/icons/"+icon+".svg",manifest.src).href).then(e=>e.text()).then(e=>{el.innerHTML=e;sessionStorage["icon-"+icon]=e}).catch(e=>el.innerHTML=`<svg width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>`)
  }
  
  if(el.tagName=="LOAD"){
    el.innerHTML=`<svg fill=currentColor .loading width=16 height=16 viewBox="0 0 24.00 24.00"><path d="M12 4V2C6.5 2 2 6.5 2 12h2c0-4.4 3.6-8 8-8z"/></svg>`
  }
})