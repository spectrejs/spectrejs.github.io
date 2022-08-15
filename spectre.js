document.open()
const app={}
//set spectre manifest
window.manifest=JSON.parse(document.currentScript.innerHTML||"{}")
manifest.src=document.currentScript.src

//delay load complete
function loadDelay(){
  let scri=document.createElement("script")
  scri.src="data:text/javascript;base64,"+btoa("")
  scri.onload=e=>{scri.remove();loadDelay()}
  document.head.appendChild(scri)}
loadDelay()

//Generates a module importer
function scriptFactory(base=location.href){
  return async function script(path,opt={}){
  let module=await fetch(new URL(path,base).href).catch(()=>null)
  /*fetch failed retry*/if(module===null)return await script(path,base)
  module=await module.text().catch(()=>null)
  /*fetch failed retry*/if(module===null)return await script(path,base)
  if(opt.as!=="text")module=await Function(`return async (base)=>{
    const script=scriptFactory(base);
    const scripts=sxFactory(script);
    ${module}
    return null
  }`)()(new URL(path,base).href).catch(console.error)
  return module
}}

//for multiple modules
function sxFactory(cs){ return async function scripts(/*paths*/){ let dn=[...arguments].map(e=>(e.split("/").pop()||"").split(".")[0]); let mods=await Promise.all([...arguments].map(e=>cs(e))); return Object.assign({},...mods.map((v,i)=>{return {[typeof v=="function"&&v.name?v.name:dn[i]]:v}})) }}


const script=scriptFactory(document.currentScript.src)
const scripts=sxFactory(script)

scripts("/setup.js","/parse/parse.js","/parse/utils.js","/build/build.js","/build/reactive.js","/sui.js")
.then(async e=>{
  window._app=e
 //get entry shard - build entry
 let shard=await fetch(manifest.main||"/index.shard").catch(e=>location.reload())
 shard=await shard.text().catch(e=>location.reload())
 shard=e.parse(shard)
 shard.style=[...shard.style,...await e.sui(shard)]
 document.write(e.build.front(shard))
 /*parse inline scripts on document ready*/window.onload=async ()=>{e.utils.node();e.build.back(shard)}
  loadDelay=()=>{}
  document.close()
  
  if ("serviceWorker" in navigator) navigator.serviceWorker.register(manifest["service worker"] || "/sw.js").catch(e=>console.log('No service worker detected, you can use the default service worker at https://spectrejs.github.io/sw.js .'))
})
