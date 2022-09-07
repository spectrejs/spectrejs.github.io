//loads scripts
/*const scriptLoader=function(view){
  
  
}*/


return async function load(url,opt={}){
  let state=new URL(url,history.state||location.href).href+"#"+btoa(Math.random()*100000000)
  opt.flags=opt.flags||""
  if(!opt.flags.includes("stateless")){
    _app.state.push([...document.body.children])
    history.pushState(state,null,location.href)
  } else {
    _app.state.pop()
    _app.state.push([...document.body.children])
    history.replaceState(state,null,location.href)
  }
  
  
  //reset body with loading screen
  document.body.innerHTML=opt.onload||manifest.splash
  let view=(await request(state)).text
  //add styling
  let style=await _app.sui(view)
  //reset and populate body if state is active
  if(state==history.state){
    document.body.innerHTML=(style+view)
    //reformat
    app.refreshFormat()
    
    
  }
}
