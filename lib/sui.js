//import base css files
;["core",...(document.currentScript.getAttribute("ui")||"").split(" ").filter(e=>e)].map(e=>{
  let link=document.createElement("link")
  link.rel="stylesheet"
  link.href=new URL(`./lib/ui/${e}.css`,manifest.src).href
  document.head.appendChild(link)
})



const sui={
  current:"system",
  //themes
  light:{
    background:"#ffffff",
    foreground:"#fcfcfc",
    color:"#454545",
    shadow:"#00000025"
  },
  dark: {
    background: "#151515",
    foreground: "#252525",
    color: "#fcfcfc",
    shadow:"#00000025"
  },
  oled: {
    background: "#000000",
    foreground: "#151515",
    color: "#fcfcfc",
    shadow:"#ffffff25"
  },
  
  //theme changer
  theme(theme="system",accent=manifest.accent){
    sui.current=theme
    document.documentElement.style.setProperty("--accent",accent)
    if(theme=="system"){
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
       document.documentElement.style.setProperty("--background", sui.dark.background)
       document.documentElement.style.setProperty("--foreground", sui.dark.foreground)
       document.documentElement.style.setProperty("--color", sui.dark.color)
       document.documentElement.style.setProperty("--shadow", sui.dark.shadow)
     } else {
       document.documentElement.style.setProperty("--background", sui.light.background)
       document.documentElement.style.setProperty("--foreground", sui.light.foreground)
       document.documentElement.style.setProperty("--color", sui.light.color)
       document.documentElement.style.setProperty("--shadow", sui.light.shadow)
     }
    }else{
      document.documentElement.style.setProperty("--background",sui[theme].background)
      document.documentElement.style.setProperty("--foreground",sui[theme].foreground)
      document.documentElement.style.setProperty("--color",sui[theme].color)
      document.documentElement.style.setProperty("--shadow",sui[theme].shadow)
    }
  }
}

//set theme on startup 
sui.theme(document.currentScript.getAttribute("theme")||"system",document.currentScript.getAttribute("accent")||manifest.accent)

//detect changes in darkmode
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      if(sui.current=="system"){if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
       document.documentElement.style.setProperty("--background", sui.dark.background)
       document.documentElement.style.setProperty("--foreground", sui.dark.foreground)
       document.documentElement.style.setProperty("--color", sui.dark.color)
       document.documentElement.style.setProperty("--shadow", sui.dark.shadow)
     } else {
       document.documentElement.style.setProperty("--background", sui.light.background)
       document.documentElement.style.setProperty("--foreground", sui.light.foreground)
       document.documentElement.style.setProperty("--color", sui.light.color)
       document.documentElement.style.setProperty("--shadow", sui.light.shadow)
     }}
     });

parser.push(function(el,attr){
  if(el.tagName=="LOAD")el.innerHTML=`<svg fill=currentColor viewBox="0 0 24.00 24.00"><path d="M12 4V2C6.5 2 2 6.5 2 12h2c0-4.4 3.6-8 8-8z"/></svg>`
})

//add splash screen
let splash=document.createElement("splash")
Object.assign(splash.style,{zIndex:999,position:"fixed",display:"flex",top:0,left:0,background:"var(--background)",width:"100%",height:"100%"})
splash.innerHTML=`<load -margin=auto></load>`
document.documentElement.appendChild(splash)
document.addEventListener("readystatechange",e=>document.readyState=="complete"?splash.remove():"")