document.open()
const app={}
//set spectre manifest
window.manifest=JSON.parse(document.currentScript.innerHTML||"{}")
manifest.src=document.currentScript.src
manifest.theme=manifest.theme||"system"

//delay load complete
;(window.loadDelay=()=>{
  let scri=document.createElement("script")
  scri.src="data:text/javascript;base64,"+btoa("")
  scri.onload=e=>{scri.remove();loadDelay()}
  document.head.appendChild(scri)})()

//generate asset fetcher
function requestFactory(base=location.href){
  return async function request(path,opt={}){
    let module=await fetch(new URL(path,opt.base||base).href).catch(()=>null)
  if(module===null)return await request(path,opt)
  let status=module.status
  module=await module.arrayBuffer().catch(()=>null)
  if(module===null)return await request(path,opt)
  const blob = new Blob([module])
  const text = await blob.text().catch(e => "")
  let json;
  try { json = JSON.parse(text) } catch (e) { json = {} }
  return { status, blob, text, json, url:new URL(path,opt.base||base).href }
  }
}
//Generates a module importer
function scriptFactory(request){
  return async function script(path,opt={}){
    const {text, url}=await request(path,opt)
  return await Function(`return async (base)=>{
    const request=requestFactory(base)
    const script=scriptFactory(request);
    const scripts=sxFactory(script);
    ${text};
    return null
  }`)()(url).catch(console.error)
}}

//for multiple modules
function sxFactory(cs){ return async function scripts(){ let dn=[...arguments].map(e=>(e.split("/").pop()||"").split(".")[0]); let mods=await Promise.all([...arguments].map(e=>cs(e))); return Object.assign({},...mods.map((v,i)=>{return {[typeof v=="function"&&v.name?v.name:dn[i]]:v}})) }}


const request=requestFactory(document.currentScript.src)
const script=scriptFactory(request)
const scripts=sxFactory(script)

scripts("/init/setup.js","/init/bind.js","/init/match.js","/init/load.js","/init/mutants.js","/ui/sui.js")
.then(async e=>{
  //shadow app defaults
  window._app=e
  /*save states for back navigation*/_app.state=[]
  /*immediate view while pages load*/_app.onload=`<style>body{background:var(--background);display:flex;align-items:center;justify-content:center;height:100vh}@keyframes spin{to{transform:rotate(359deg)}}</style><svg fill=var(--color) -transform=rotate(0deg) -animation="spin 800ms linear infinite" .loading width=60 height=60 viewBox="0 0 24.00 24.00"><path d="M12 4V2C6.5 2 2 6.5 2 12h2c0-4.4 3.6-8 8-8z"/></svg>`
  app.load=_app.load
  
 document.write(`<!DOCTYPE html>
 <html lang=en>
 <head>
 <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
 <meta name="theme-color" content="${manifest.color||"#e91e63"}">
 <link rel="apple-touch-icon" href="${manifest.icon||"/favicon.ico"}">
 <link rel="manifest" href="data:application/json;base64,${btoa(JSON.stringify(webmanifest))}">
 <title>${manifest.title||"Spectre App"}</title>
 <style>
 body{
   --color:${manifest.color||"#e91e63"};
   --background:${manifest.background||"#fff"};
   --shadow:${manifest.shadow||"#00000020"};
   --text:${manifest["text"]||"#454545"}
 }
 ${manifest.theme=="system"?"@media (prefers-color-scheme: dark) {body{--background:#151515;--text:#fafafa;--shadow:#00000050}}":""}</style>
 </head>
 </html> `)
 
 //parse inline scripts on document ready
 window.onload=async ()=>{/*handle on back press*/window.onpopstate=()=>{document.body.innerText="";(_app.state.pop()||[]).map(e=>document.body.append(e))};/*spy on mutations*/_app.tmnt(document.body);/*load entry file*/_app.load(manifest.main||"index.shard",{flags:"stateless"})}
  loadDelay=()=>{}
  document.close()
  
})
