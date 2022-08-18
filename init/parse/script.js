/*
load dynamic scripts
inline + external via fetch + module vai import
*/


return async function script(view){
  view.remove()
  let script="";
  if(view.src){
    Function(`return async (base)=>{
    const request=requestFactory(base)
    const script=scriptFactory(request);
    const scripts=sxFactory(script);
    ${(await request(view.src,{base:location.origin})).text};
    return null
  }`)()(history.state).catch(console.error)
  } else {
    Function(`return async (base)=>{
    const request=requestFactory(base)
    const script=scriptFactory(request);
    const scripts=sxFactory(script);
    ${view.innerHTML};
    return null
  }`)()(history.state).catch(console.error)
  }
}
