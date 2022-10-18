//set params as object incase no support
try{location.params=Object.fromEntries(new URLSearchParams(location.search))}catch(e){location.params={}}

//manifest defaults
const manifest=Object.assign({accent:"#e91e63",title:"Spectre App",description:"Powered by SpectreJS",icon:"/favicon.ico","start-url":location.origin},...[...(document.currentScript.attributes||[])].map(e=>{return {[e.name]:e.value}}))
manifest.src=document.currentScript.src

//check manifest bindslocal and rewrite values if a bind is found.
for(const prop in manifest){
  let value=manifest[prop]
  if(prop.startsWith("params-")&&value in location.params){
    manifest[prop.replace("params-","")]=location.params[value]
    delete manifest[prop]
  }
  
  if(prop.startsWith("local-")&&value in localStorage){
    manifest[prop.replace("local-","")]=localStorage[value]
    delete manifest[prop]
  }
  
  if(prop.endsWith("session-")&&value in sessionStorage){
    manifest[prop.replace("session-","")]=sessionStorage[value]
    delete manifest[prop]
  }
}

//set full path of icon
manifest.icon=new URL(manifest.icon,location.origin).href


//if html source in manifest
if("source" in manifest){
  fetch(new URL(manifest.source,location.href).href)
  .then(e=>e.text())
  .then(e=>{
    //add new html if document is ready
    if("body" in document)document.body.innerHTML=e
    else document.addEventListener('readystatechange', (event) => { if (event.target.readyState=="complete")document.body.innerHTML=e })
  }).catch(e=>{
    //if fetch failed let client know
  })
}

//best practices
document.title=manifest.title
document.documentElement.lang="en"
if(!document.head.querySelector("meta[charset]"))console.warn("Add a charset to your head element, e.g <meta charset=\"UTF-8\">")
let header=document.createElement("head")
header.innerHTML=`<meta name=viewport content=width=device-width,initial-scale=1><meta name=theme-color content="${manifest["theme-color"]||manifest.accent}"><link rel=apple-touch-icon href="${manifest.icon}"><link rel=icon type=image/png href="${manifest.icon}"><link rel=manifest href="data:application/manifest+json,${
  encodeURIComponent(JSON.stringify({"name":manifest.name||manifest.title,"short_name":manifest["short-name"]||manifest.title,"start_url":manifest["start-url"],"display":manifest.display||"standalone","background_color":manifest["background-color"]||"white","theme_color":manifest["theme-color"]||manifest.accent,"description":manifest.description,"icons":[{"src":manifest.icon,"sizes":"192x192","type":"image/png"},{"src":manifest.icon,"sizes":"512x512","type":"image/png","purpose":"any maskable"}]}))
}"><style>icon{display:flex;justify-content:center;align-items:center}icon>svg{width:100%;height:100%}</style>`
;[...header.children].forEach(e=>document.head.appendChild(e))


//service worker script is placed here idk why
if (navigator.serviceWorker&&manifest.worker) {
  navigator.serviceWorker.register(manifest.worker)
  .catch(console.error) } else console.warn("Add a service worker by setting its path to the \"worker\" attribute on the spectrejs script tag. You can get one at https://spectrejs.github.io/sw.js")
