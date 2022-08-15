return function parse(shard,defer){
  let body=document.createElement("body")
  body.innerHTML=shard
  let list=[...body.querySelectorAll("*")]
  
  //lvl 1 parsing
  this.utils.id(list).type(list).css(list).classy(list)
  //lvl 2 parsing
  let templates=this.utils.list(list)
  let scriptSrc=this.utils.scriptSrc(list)
  let script=this.utils.script(list)
  let styleSrc=this.utils.styleSrc(list)
  let style=this.utils.style(list)
  
  return {body, list, scriptSrc, script, styleSrc, style, templates}
}
