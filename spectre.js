document.open()
const app={}
//set spectre manifest
window.manifest=JSON.parse(document.currentScript.innerHTML||"{}")
manifest.src=document.currentScript.src
manifest.theme=manifest.theme||"system"

//delay load complete
;(window.loadDelay=()=>{
  let scri=document.createElement("script")
  scri.src=""
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
function sxFactory(cs){ return async function scripts(){ let dn=[...arguments].filter(e=>e).map(e=>(e.split("/").pop()||"").split(".")[0]); let mods=await Promise.all([...arguments].filter(e=>e).map(e=>cs(e))); return Object.assign({},...mods.map((v,i)=>{return {[typeof v=="function"&&v.name?v.name:dn[i]]:v}})) }}


const request=requestFactory(document.currentScript.src)
const script=scriptFactory(request)
const scripts=sxFactory(script)

scripts(...[location.origin.startsWith("http://localhost:")?"/eruda.min.js":""],"/init/setup.js","/init/load.js","/init/mutants.js","/ui/sui.js","/init/format.js","/init/select.js")
.then(async e=>{
  
  //shadow app defaults
  window._app=e
  _app.format={}
  _app.edited={}
  _app.events={}
  /*save states for back navigation*/_app.state=[]
  app.load=_app.load
  
 document.write(`<!DOCTYPE html>
 <html lang=en>
 <head>
 <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
 <meta name="theme-color" content="${manifest.accent}">
 <link rel="apple-touch-icon" href="${manifest.icon}">
 
 <link rel="manifest" href="${manifest.manifest}">
 <title>${manifest.title}</title>
 <style>
 body{
   --accent:${manifest.accent};
   --background:${manifest.background};
   --shadow:${manifest.shadow};
   --color:${manifest.color}
 }
 ${manifest.theme=="system"?"@media (prefers-color-scheme: dark) {body{--background:#151515;--foreground:#252525;--color:#fafafa;--shadow:#00000050}}":""}</style>
 <script>if(window.eruda)eruda.init()</script>
 </head>
 </html> `)
 
 //parse inline scripts on document ready
 window.onload=async ()=>{/*handle on back press*/window.onpopstate=()=>{document.body.innerText="";(_app.state.pop()||[]).map(e=>document.body.append(e)); app.refreshFormat();if(_app.back)_app.back(history.state)};/*spy on mutations*/_app.tmnt(document.body);/*load entry file*/_app.load(manifest.main,{flags:"stateless"})}
  loadDelay=()=>{}
  


  document.close()
  
})
