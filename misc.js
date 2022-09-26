parser.extend(function(el,attr){
  
  //press back shortcut
  if("back" in attr)el.onclick=e=>history.back()
  
  //lazy load images for performance 
  if(el.tagName=="IMG"||el.tagName=="IFRAME")el.loading="lazy"
  
  //set default alt to
  if(el.tagName=="IMG")el.alt=el.alt||String(String(String(el.src).split("/").pop()).split(".")[0]).replaceAll("-"," ")
  
  //open modal pages
  if ("open" in attr) el.onclick = e => open(attr.open)
  if ("open.nav" in attr) el.onclick = e => window.open(attr["open.nav"])
  if ("open.frame" in attr) el.onclick = e => open(attr["open.frame"], "frame")
  if ("open.solid" in attr) el.onclick = e => open(attr["open.solid"], "solid")
  
})
