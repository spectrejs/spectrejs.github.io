/*

<icon>alarm</icon>
<icon size=28px >add</icon>

imports an svg icon to dom

*/


return function icon(el,deep){
  if(el.tagName.toLowerCase()=="icon"&&el.childNodes[0]&&el.childNodes[0].nodeName=="#text"){
   let icon=el.innerText
   el.innerHTML=`<svg fill=currentColor .loading width=16 height=16 viewBox="0 0 24.00 24.00"><path d="M12 4V2C6.5 2 2 6.5 2 12h2c0-4.4 3.6-8 8-8z"/></svg>`
   request(`../../ui/icons/${icon}.svg`).then(e=>el.innerHTML=e.text)
  }
  if(deep)[...el.children].map(function(e){icon(e,true)})
}
