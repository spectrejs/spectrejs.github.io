
return function open(el,deep){
  if(el.getAttribute("open"))el.onclick=e=>window.open(el.getAttribute("open"))
  if (deep)[...el.children].map(function(e) { open(e, true) })
}
