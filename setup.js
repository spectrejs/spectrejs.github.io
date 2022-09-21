//splash screen to hide layout shifts from client
let __splash=document.createElement("splash-screen")
Object.assign(__splash.style,{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",background:"var(--background",zIndex:999})
document.documentElement.appendChild(__splash)
let __loop=setInterval(()=>document.readyState=="complete"?(__splash.remove(),clearInterval(__loop)):"",100)

//initialize app functions
window.app={
  parser(func){_app.parser.push(func);return app},
  params:Object.fromEntries(new URLSearchParams(location.search)),//extend live parser cc
}
window._app={
  parser:[],//extend dom parser
}

//manifest defaults
window.manifest=Object.assign({accent:"#e91e63",theme:"system",title:"Spectre App",desc:"Powered by SpectreJS",icon:"/favicon.ico",color:"#454545",foreground:"#fbfbfb",background:"#fff",shadow:"#00000020",entry:location.origin,ui:""},...[...(document.currentScript.attributes||[])].map(e=>{return {[e.name]:e.value}}))
manifest.src=document.currentScript.src
manifest.icon=new URL(manifest.icon,location.origin).href

//themes
if(manifest.theme=="dark")Object.assign(manifest,{color:"#fcfcfc",background:"#151515",foreground:"#252525",shadow:"#000000aa"})
if(manifest.theme=="oled")Object.assign(manifest,{color:"#fcfcfc",background:"#000",foreground:"#151515",shadow:"#ffffff25"})

//best practices
document.documentElement.lang="en"
if(!document.head.querySelector("meta[charset]"))console.warn("Add a charset to your head element, e.g <meta charset=\"UTF-8\">")
let header=document.createElement("head")
header.innerHTML=`<meta name=viewport content=width=device-width,initial-scale=1><title>${manifest.title}</title><meta name=theme-color content="${manifest.accent}"><link rel=apple-touch-icon href="${manifest.icon}"><link rel=icon type=image/png href="${manifest.icon}"><link rel=manifest href="data:application/manifest+json,${
  encodeURIComponent(JSON.stringify({"name":manifest.title,"short_name":manifest.title,"start_url":manifest.entry,"display":"standalone","background_color":manifest.background,"theme_color":manifest.accent,"description":manifest.desc,"icons":[{"src":manifest.icon,"sizes":"192x192","type":"image/png"},{"src":manifest.icon,"sizes":"512x512","type":"image/png","purpose":"any maskable"}]}))
  
}">${`<style current-theme>html{--accent:${manifest.accent};--color:${manifest.color};--background:${manifest.background};--foreground:${manifest.foreground};--shadow:${manifest.shadow};background:var(--background);color:var(--color)}</style>`}${manifest.theme=="system"?"<style dark-mode>@media (prefers-color-scheme: dark) {html{--background:#151515;--foreground:#252525;--color:#fcfcfc;--shadow:#000000aa}}</style>":""}${/*load stylesheet*/["core",...manifest.ui.split(" ")].filter(e=>e).map(e=>`<link rel=stylesheet href="${new URL("./ui/"+e+".css",manifest.src).href}">`).join("")}`
;[...header.children].forEach(e=>document.head.appendChild(e))


//service worker script is placed here idk why
if (navigator.serviceWorker&&manifest.worker) {
  navigator.serviceWorker.register(manifest.worker)
  .catch(console.error) } else console.warn("Add a service worker by setting its path to the \"worker\" attribute on the spectrejs script tag. You can get one at https://spectrejs.github.io/sw.js")
