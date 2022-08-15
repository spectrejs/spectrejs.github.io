function _query(el,queer){
  
  let match=el
  //match tag name
  if(queer.tag)match=match.filter(e=>e.tagName.toLowerCase()==queer.tag.toLowerCase())
  //match id
  if(queer.id)match=match.filter(e=>e.id==queer.id)
  //match type
  if (queer.type) match = match.filter(e => e.type == queer.type)
  //match classes
  if(queer.class)match=match.filter(e=>!queer.class.split(" ").map(x=>e.className.includes(x)).includes(false))
  
  return match
  
}

Element.prototype.queryAll=function(queer={}){
  return _query([...this.querySelectorAll("*")],queer)
}

Element.prototype.query=function(queer){
  return this.queryAll(queer)[0]
}
export default {}
