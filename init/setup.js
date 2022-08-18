//setup web manifest
window.webmanifest={
  name:manifest.title||"Spectre App",
  short_name:manifest["short title"]||manifest.title||"Spectre App",
  start_url:manifest.base||location.origin,
  display:manifest.display||"standalone",
  background_color:manifest.background||"#fff",
  theme_color:manifest.color||"#e91e63",
  description:manifest.desc||"Powered by SpectreJS",
  icons: [{src: manifest.icon || location.origin + "/favicon.ico",sizes: "192x192",type: "image/png"},{src: manifest.icon || location.origin + "/favicon.ico",sizes: "512x512",type: "image/png",purpose: "any maskable"}]
}

//default themes
if(manifest.theme=="dark"){
  manifest.text="#fafafa"
  manifest.background="#151515"
  manifest.shadow="#00000070"}

if(manifest.theme=="oled"){
  manifest.text="#fafafa"
  manifest.background="#000000"
  manifest.shadow="#ffffff20"}

//install service worker
if ("serviceWorker" in navigator) navigator.serviceWorker.register(manifest["service worker"] || "/sw.js").catch(e=>console.log('No service worker detected, you can use the default service worker at https://spectrejs.github.io/sw.js .'))
