let __splash=document.createElement("splash-screen");Object.assign(__splash.style,{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",background:"var(--background",zIndex:999}),document.documentElement.appendChild(__splash);let __loop=setInterval((()=>"complete"==document.readyState?(__splash.remove(),clearInterval(__loop)):""),100);window.app={on:(e,t)=>t?(_app.events[e]=t,app):_app.events[e],off:e=>(delete _app.events[e],app),id:e=>document.getElementById(e),back:e=>(e?_app.back=e:history.back(),app),parser:e=>(_app.parser.push(e),app),params:Object.fromEntries(new URLSearchParams(location.search)),refresh(e){for(const t in _app.bind)e?t==e&&app.bind(t,_app.bind[t]):app.bind(t,_app.bind[t]);return app}},window._app={events:{},bind:{},parser:[],back(){},build:1.2},window.manifest=Object.assign({accent:"#e91e63",theme:"system",title:"Spectre App",desc:"Powered by SpectreJS",icon:"/favicon.ico",color:"#454545",foreground:"#fbfbfb",background:"#fff",shadow:"#00000020",entry:location.origin,ui:""},...[...document.currentScript.attributes||[]].map((e=>({[e.name]:e.value})))),manifest.src=document.currentScript.src,manifest.icon=new URL(manifest.icon,location.origin).href,"dark"==manifest.theme&&Object.assign(manifest,{color:"#fcfcfc",background:"#151515",foreground:"#252525",shadow:"#00000060"}),"oled"==manifest.theme&&Object.assign(manifest,{color:"#fcfcfc",background:"#000",foreground:"#151515",shadow:"#ffffff25"}),document.documentElement.lang="en",document.head.querySelector("meta[charset]")||console.warn('Add a charset to your head element, e.g <meta charset="UTF-8">');let header=document.createElement("head");header.innerHTML=`<meta name=viewport content=width=device-width,initial-scale=1><title>${manifest.title}</title><meta name=theme-color content="${manifest.accent}"><link rel=apple-touch-icon href="${manifest.icon}"><link rel=icon type=image/png href="${manifest.icon}"><link rel=manifest href="data:application/manifest+json,${encodeURIComponent(JSON.stringify({name:manifest.title,short_name:manifest.title,start_url:manifest.entry,display:"standalone",background_color:manifest.background,theme_color:manifest.accent,description:manifest.desc,icons:[{src:manifest.icon,sizes:"192x192",type:"image/png"},{src:manifest.icon,sizes:"512x512",type:"image/png",purpose:"any maskable"}]}))}"><style current-theme>html{--accent:${manifest.accent};--color:${manifest.color};--background:${manifest.background};--foreground:${manifest.foreground};--shadow:${manifest.shadow};background:var(--background);color:var(--color)}</style>${"system"==manifest.theme?"<style dark-mode>@media (prefers-color-scheme: dark) {html{--background:#151515;--foreground:#252525;--color:#fcfcfc;--shadow:#00000060}}</style>":""}${[manifest.ui?"core":void 0,...manifest.ui.split(" ")].filter((e=>e)).map((e=>`<link rel=stylesheet href="${new URL("./ui/"+e+".css",manifest.src).href}">`)).join("")}`,[...header.children].forEach((e=>document.head.appendChild(e))),navigator.serviceWorker&&manifest.worker?navigator.serviceWorker.register(manifest.worker).catch(console.error):console.warn('Add a service worker by setting its path to the "worker" attribute on the spectrejs script tag. You can get one at https://spectrejs.github.io/sw.js'),app.bind=function(e,t){if(void 0===t)return _app.bind[e];{_app.bind[e]=t;let n=[];[...document.querySelectorAll(`[bind="${e}"]`)].forEach((e=>{e.innerHTML=raw_bind(t,e.getAttribute("template"),e.getAttribute("join")||""),n.push(e)})),n.forEach((e=>{e.getAttribute("bind.local")&&(localStorage[e.getAttribute("bind.local")]=JSON.stringify(t)),e.getAttribute("bind.session")&&(sessionStorage[e.getAttribute("bind.session")]=JSON.stringify(t)),e.getAttribute("on.bind")&&(app.on(e.getAttribute("on.bind"))||function(){}).apply(e,[t]),e.getAttribute("on.bind.prevent")&&(app.on(e.getAttribute("on.bind.prevent"))||function(){}).apply(e,[t]),e.getAttribute("on.bind.once")&&((app.on(e.getAttribute("on.bind.once"))||function(){}).apply(e,[t]),e.removeAttribute("on.bind.once")),e.getAttribute("on.bind.script")&&Function("return async function(e){"+e.getAttribute("on.bind.script")+"}")().apply(e,[t])}))}return app},app.edit=function(e,t,...n){let a=app.bind(e);if("object"==typeof a&&null!==a)a.constructor===Array?"filter"==t||"map"==t?a=a[t](...n):a[t](...n):a[t]=n[0];else switch(t){case"++":case"increase":a++;break;case"--":case"decrease":a--;break;case"+":a+=n[0];break;case"-":a-=n[0];break;case"*":a*=n[0];break;case"/":a/=n[0];break;case"%":a%=n[0];break;default:a=String(a)[t](...n)}return app.bind(e,a),app};const raw_bind=(e,t,n="")=>{"object"==typeof e&&null!==e&&e instanceof Array||(e=[e]);let a="";return e.forEach((e=>{let i=t.replaceAll("{*}",String(e));if("object"==typeof e&&null!==e)for(const t in e)i=i.replaceAll(`{${t}}`,String(e[t]));a+=n+i})),a};async function mutate(e){if(e.getAttribute("_parsed"))return e;e.setAttribute("_parsed",".");let t=Object.assign({},...[...e.attributes||[]].map((e=>({[e.name]:e.value}))));for(const n in t){if(n.startsWith("#")&&(e.id=n.replace("#",""),e.removeAttribute(n)),n.startsWith("--")&&(e.style.setProperty(n,t[n]),e.removeAttribute(n)),n.startsWith("-")&&(e.style[n.replace("-","")]=t[n].startsWith("--")?`var(${t[n]})`:t[n],e.removeAttribute(n)),n.startsWith(".")&&(e.classList.add(...n.replace(".","").split(".")),e.removeAttribute(n)),n.startsWith(":")&&("type"in e?e.type=n.replace(":",""):e.setAttribute("type",n.replace(":","")),e.removeAttribute(n)),n.startsWith("on.")){let a=n.replace("on.","").split(".")[0],i=n.split(".")[2];e["on"+a]=r=>{"prevent"==i&&r.preventDefault(),"script"==i?Function("return async function(e){"+t[n]+"}")().apply(e,[r]):(_app.events[e.getAttribute(n)]&&_app.events[e.getAttribute(n)].apply(e,[r]),"once"==i&&(e["on"+a]=e=>{}))}}if(e.getAttribute("template")||"bind"!=n||(e.setAttribute("template",e.innerHTML),e.innerHTML="",app.refresh(t[n])),void 0!==t["bind.params"]&&void 0!==app.params[t["bind.params"]]&&(t["bind.default"]=app.params[t["bind.params"]]),void 0!==t["bind.local"]&&void 0!==localStorage[t["bind.local"]]&&(t["bind.default"]=localStorage[t["bind.local"]]),void 0!==t["bind.session"]&&void 0!==sessionStorage[t["bind.session"]]&&(t["bind.default"]=sessionStorage[t["bind.session"]]),"href"==n||"src"==n||n.startsWith("open")||n.endsWith(".url")){let a=e.closest("[url-scope]");a=a?a.getAttribute("url-scope"):location.href,(n.startsWith("open")||n.endsWith(".url"))&&e.setAttribute(n,new URL(t[n],a).href),e[n]=new URL(e.getAttribute(n),a).href}"open"==n&&(e.onclick=e=>app.open(t[n])),"open.nav"==n&&(e.onclick=e=>window.open(t[n])),"open.frame"==n&&(e.onclick=e=>app.open(t[n],"frame")),"open.solid"==n&&(e.onclick=e=>app.open(t[n],"solid")),"back"==n&&(e.onclick=e=>app.back()),n.startsWith("select")&&(e.onclick=a=>{if(a.composedPath()[0]!==e){let i=a.composedPath(),r={};for(;r!==e;)r=i.pop();r=i.pop();let o=i[0]||r,s=-1;[...e.children].forEach(((e,t)=>s=e===r?t:s));let c=app.bind(t.bind),l={};"object"==typeof c&&null!==c&&c instanceof Array&&(l=c[s]);let p={root:r,target:o,index:s,bind:l,bindData:c};n.endsWith("script")?Function(`return async function(e){${t[n]}}`)().apply(e,[p]):(app.event(t[n])||function(){}).apply(e,[p])}})}if(void 0!==t["bind.default"]){let e=t.bind,n="bind.default";try{t[n]=JSON.parse(t[n])}catch(e){}void 0===app.bind(e)&&app.bind(e,t[n])}if(t["bind.url"]&&fetch(e.getAttribute("bind.url")).then((e=>e.ok?e.text():"")).then((e=>{let n=e;try{n=JSON.parse(n)}catch(e){}app.bind(t.bind,n)})).catch((e=>{})),"LOAD"==e.tagName&&(e.innerHTML='<svg fill=currentColor .loading width=16 height=16 viewBox="0 0 24.00 24.00"><path d="M12 4V2C6.5 2 2 6.5 2 12h2c0-4.4 3.6-8 8-8z"/></svg>'),"IMG"!=e.tagName&&"IFRAME"!=e.tagName||(e.loading="lazy"),"ICON"==e.tagName&&!e.children[0]){let t=e.innerText.replaceAll(" ","-");e.innerHTML='<svg fill=currentColor .loading width=16 height=16 viewBox="0 0 24.00 24.00"><path d="M12 4V2C6.5 2 2 6.5 2 12h2c0-4.4 3.6-8 8-8z"/></svg>';let n=await fetch(new URL("./ui/icons/"+t+".svg",manifest.src).href).catch((e=>"x"));"x"!==n&&n.ok?e.innerHTML=await n.text().catch((e=>'<svg width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>')):e.innerHTML='<svg width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>'}return _app.parser.forEach((n=>n(e,t))),[...e.children||[]].forEach(mutate),e}app.modal=function(e,t=location.href){let n=document.createElement("modal");return n.setAttribute("style","position:fixed;z-index:3;top:0;left:0;width:100%;height:100%;background:#00000025;overflow: auto;display:flex;flex-direction:column;align-items:flex-start;align-content:flex-start;justify-content:flex-start;flex:none"),n.setAttribute("url-scope",t),n.innerHTML=e||"",document.documentElement.appendChild(n),history.pushState(btoa(Math.random()),null,location.href),n},app.open=async function(e,t=""){e=new URL(e,location.href).href;let n=app.modal("<load -margin=auto >",e);if(t.includes("solid")&&(n.style.background="var(--background)"),t.includes("frame"))n.innerHTML=`<iframe src="${e}" -width=100% -height=100% -border=0 >`;else{let t=await fetch(e).catch((e=>null));null!==t&&t.ok?n.innerHTML=await t.text().catch((e=>"Failed to load")):n.innerHTML="Failed to load"}return n},window.onpopstate=e=>{_app.back(e);let t=[...document.querySelectorAll("modal")].pop();t&&t.remove()},new MutationObserver((e=>e.forEach((e=>[...e.addedNodes].filter((e=>"#text"!==e.nodeName)).filter((e=>"#comment"!==e.nodeName)).map(mutate).map((async e=>(await e).removeAttribute("_parsed"))))))).observe(document.documentElement,{childList:!0,subtree:!0});