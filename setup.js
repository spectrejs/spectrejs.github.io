//set web manifest
window.webmanifest={
  name:manifest.title||"Spectre App",
  short_name:manifest["short title"]||manifest.title||"Sepectre App",
  start_url:manifest.base||location.origin,
  display:manifest.display||"standalone",
  background_color:manifest.background||"#fff",
  theme_color:manifest.color||"#e91e63",
  description:manifest.desc||"Powered by SpectreJS",
  icons: [{src: manifest.icon || location.origin + "/favicon.ico",sizes: "192x192",type: "image/png"},{src: manifest.icon || location.origin + "/favicon.ico",sizes: "512x512",type: "image/png",purpose: "any maskable"}]
}
