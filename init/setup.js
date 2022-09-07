//setup manifest defaults
manifest.title=manifest.title||"Spectre App"
manifest.accent=manifest.accent||"#e91e63"
manifest.color=manifest.color||"#454545"
manifest.foreground=manifest.foreground||"#fbfbfb"
manifest.background=manifest.background||"#fff"
manifest.shadow=manifest.shadow||"#00000020"
manifest.splash=manifest.splash||`<style>body{background:var(--background);display:flex;align-items:center;justify-content:center;height:100vh}@keyframes spin{to{transform:rotate(359deg)}}</style><svg fill=var(--accent) -transform=rotate(0deg) -animation="spin 800ms linear infinite" .loading width=60 height=60 viewBox="0 0 24.00 24.00"><path d="M12 4V2C6.5 2 2 6.5 2 12h2c0-4.4 3.6-8 8-8z"/></svg>`

manifest.main=manifest.main?manifest.main:(console.warn("You haven't declared an entry script yet, ./index.xhtml will be used by default for now but it may change in the future, set an entry page via the \"main\" method in the app manifest."),"./index.xhtml")
manifest.icon=manifest.icon?manifest.icon:(console.warn("App is missing a favicon, add a reference to it by passing its path to the \"icon\" method in the app manifest."),"https://spectrejs.github.io/favicon.ico")
manifest.manifest=manifest.manifest?manifest.manifest:(console.warn("App is missing a web manifest, add a reference to it by passing its path to the \"manifest\" method in the app manifest. You can use https://spectrejs.github.io/manifest.json as a template."),"")
manifest.worker=manifest.worker?manifest.worker:(console.warn("App is missing a service worker, add a reference to it by passing its path to the \"worker\" method in the app manifest. You can use https://spectrejs.github.io/sw.js as a template."),"")


//default themes
if(manifest.theme=="dark"){
  manifest.color="#fafafa"
  manifest.background="#151515"
  manifest.shadow="#00000070"}

if(manifest.theme=="oled"){
  manifest.color="#fafafa"
  manifest.background="#000000"
  manifest.shadow="#ffffff20"}

//handle back pressed
app.onBack=function(e){
  _app.back=e
  return app
}

//install service worker
if ("serviceWorker" in navigator&& manifest.worker) navigator.serviceWorker.register(manifest.worker).catch(e=>console.log('Failed to install the service worker, you can use the default service worker at https://spectrejs.github.io/sw.js .'))
