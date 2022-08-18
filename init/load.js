
return async function load(url,opt={}){
  let state=new URL(url,location.origin).href+"#"+btoa(Math.random()*100000000)
  opt.flags=opt.flags||""
  if(!opt.flags.includes("stateless")){
    _app.state.push([...document.body.children])
    history.pushState(state,null,location.href)
  } else history.replaceState(location.href,null,location.href)
  
  //reset body with loading screen
  document.body.innerHTML=opt.onload||_app.onload
  let view=(await request(url,{base:location.origin})).text
  //add styling
  let style=await _app.sui(view)
  //reset and populate body
  if(opt.flags.includes("stateless")||state==history.state)document.body.innerHTML=(style+view)

}
