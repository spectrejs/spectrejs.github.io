app.modal=function(html,url=location.href){
  let el=document.createElement("modal")
  el.setAttribute("style","position:fixed;z-index:3;top:0;left:0;width:100%;height:100%;background:var(--shadow);overflow: auto;display:flex;flex-direction:column;align-items:flex-start;align-content:flex-start;justify-content:flex-start;flex:none")
  el.setAttribute("url-scope",url)
  el.setAttribute("on.click.script","if(e.composedPath()[0]===this)history.back()")
 el.innerHTML=html||""
 //evaluate modal scripta
 ;[...el.querySelectorAll("script")].forEach(e=>{
   e.remove()
   if(e.src)import(e.src)
   else {
     let ns=document.createElement("script")
     ns.innerHTML=e.innerHTML
     document.head.appendChild(ns)
   }
 })
  document.documentElement.appendChild(el)
 history.pushState(btoa(Math.random()),null,location.href)
 return el
}

app.open=async function(url,opts=""){
  url=new URL(url,location.href).href
  let page=app.modal("<load -margin=auto >",url)
  if(opts.includes("solid"))page.style.background="var(--background)"
  if(opts.includes("frame")){
    page.innerHTML=`<iframe src="${url}" -width=100% -height=100% -border=0 >`
    } else {
    let data=await fetch(url).catch(e=>null)
    if(data===null||!data.ok)page.innerHTML="Failed to load"
    else page.innerHTML=await data.text().catch(e=>"Failed to load")}
  return page }

window.onpopstate=e=>{
  if(window.onBack)onBack(history.state)
  let el=[...document.querySelectorAll("modal")].pop()
  if(el)el.remove()
}


