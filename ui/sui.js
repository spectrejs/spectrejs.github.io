return async function sui(view){
  let style=""
  let ae=["bar","button","flex","icon","img","text"]
  let ce=["default"]
  let body=document.createElement("body")
  body.innerHTML=view
  
  //check what to include
  ae.forEach(e=>body.querySelector(e)||body.querySelector("."+e)?ce.push(e):"")
  //get styles
  style=(await Promise.all(ce.map(e=>request(`./${e}.css`,{cache:"session"})))).map(e=>e.text).join("")
  
  return `<style>${style}</style>`
}
