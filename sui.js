/*
SPECTRE UI
md inspired
© 2022

*/
let ae=["flex","text","button","image","bar"]
return async function sui(shard){
  let ce=["default"]
  ae.forEach(e=>shard.body.querySelector(e)||shard.body.querySelector("."+e)?ce.push(e):"")
  let re=await Promise.all(ce.map(e=>script(`./ui/${e}.css`,{as:"text"})))
  return re
}
