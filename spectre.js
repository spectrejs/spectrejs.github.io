window.node={};
window.bind;

//set spectre manifest
window.manifest=JSON.parse(document.currentScript.innerHTML||"{}")

//set web manifest
window.webmanifest={
  name:manifest.title||"Spectre App",
  short_name:manifest["short title"]||manifest.title||"Sepectre App",
  start_url:manifest.base||location.origin,
  display:manifest.display||"standalone",
  background_color:manifest.background||"#fff",
  theme_color:manifest.color||"#e91e63",
  description:manifest.description||"Powered by SpectreJS",
  icons: [
    {
      src: manifest.icon || location.origin + "/favicon.ico",
      sizes: "192x192",
      type: "image/png"
        },
    {
      src: manifest.icon || location.origin + "/favicon.ico",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable"
        }
        ]
}

;(function scr(){
  let scri=document.createElement("script")
  scri.src="data:text/javascript;base64,"+btoa("")
  scri.onload=scr
  document.head.appendChild(scri)
})()

Promise.all(["/parse/core.js","/build/core.js"].map(e=>import(e)))
.then(async e=>{
 window._app=Object.assign({},...e)
 //get entry shard - build entry
 let shard=await fetch(manifest.main||"./index.shard").catch(e=>location.reload())
 shard=await shard.text().catch(e=>location.reload())
 shard=_app.parse(shard)
 
  document.write(await _app.buildFront(shard))
  /*bind ids to the node object*/_app.idnode()
  shard.nodes=[...document.body.querySelectorAll("*")]
  _app.scripts=await _app.buildBack(shard)
  document.close()
  scr=e=>{}
  if ("serviceWorker" in navigator) navigator.serviceWorker.register(manifest["service worker"] || "/sw.js").catch(console.error)

}).catch(e=>location.reload())

