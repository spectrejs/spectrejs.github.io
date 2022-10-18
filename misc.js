parser.push(function(el,attr){
  
   //press back on click
   if ("back" in attr) el.onclick = e => history.back()
   //link to external pages
   if (attr.link) el.onclick = e => open(el.getAttribute("link"), el.getAttribute("as") || "_blank")
   

  
})
