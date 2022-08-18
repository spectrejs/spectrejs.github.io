

let ae=["flex","text","button","img","bar"]
return async function sui(shard){
  //to match from templates
  let tmp = document.createElement("div")
  tmp.innerHTML = shard.templates.join("")
  
  let ce=["default"]
  ae.forEach(e=>shard.body.querySelector(e)||shard.body.querySelector("."+e)||tmp.querySelector(e)||tmp.querySelector("."+e)?ce.push(e):"")
  let re=await Promise.all(ce.map(e=>script(`./ui/${e}.css`,{as:"text"})))
  return re
}
