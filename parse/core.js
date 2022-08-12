import { id, type, list as listc, css, classy } from "./basic.js"
import scripts from "./script.js"


export  function parse(code){
  //list all elements
  let body=document.createElement("body")
  body.style.display="none"
  body.innerHTML=code
  let list=[...body.querySelectorAll("*")]
  
  //parse ids
  id(list)
  //parse types
  type(list)
  //parse classes
  classy(list)
  //parse util styles
  css(list)  
  //add templates to list
  listc(list)
  //build module object
  let script=scripts(list)
  return {script,body,nodes:list}
}


export function idnode(){
  window.node=Object.assign({},...[...document.querySelectorAll("[id]")].map(e=>{return {[e.id]:e}}))
}
