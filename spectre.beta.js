try{location.params=Object.fromEntries(new URLSearchParams(location.search))}catch(e){location.params={}}const manifest=Object.assign({accent:"#e91e63",title:"Spectre App",description:"Powered by SpectreJS",icon:"/favicon.ico","start-url":location.origin},...[...document.currentScript.attributes||[]].map((e=>({[e.name]:e.value}))));manifest.src=document.currentScript.src;for(const e in manifest){let t=manifest[e];e.startsWith("params-")&&t in location.params&&(manifest[e.replace("params-","")]=location.params[t],delete manifest[e]),e.startsWith("local-")&&t in localStorage&&(manifest[e.replace("local-","")]=localStorage[t],delete manifest[e]),e.endsWith("session-")&&t in sessionStorage&&(manifest[e.replace("session-","")]=sessionStorage[t],delete manifest[e])}manifest.icon=new URL(manifest.icon,location.origin).href,"source"in manifest&&fetch(new URL(manifest.source,location.href).href).then((e=>e.text())).then((e=>{"body"in document?document.body.innerHTML=e:document.addEventListener("readystatechange",(t=>{"complete"==t.target.readyState&&(document.body.innerHTML=e)}))})).catch((e=>{})),document.title=manifest.title,document.documentElement.lang="en",document.head.querySelector("meta[charset]")||console.warn('Add a charset to your head element, e.g <meta charset="UTF-8">');let header=document.createElement("head");header.innerHTML=`<meta name=viewport content=width=device-width,initial-scale=1><meta name=theme-color content="${manifest["theme-color"]||manifest.accent}"><link rel=apple-touch-icon href="${manifest.icon}"><link rel=icon type=image/png href="${manifest.icon}"><link rel=manifest href="data:application/manifest+json,${encodeURIComponent(JSON.stringify({name:manifest.name||manifest.title,short_name:manifest["short-name"]||manifest.title,start_url:manifest["start-url"],display:manifest.display||"standalone",background_color:manifest["background-color"]||"white",theme_color:manifest["theme-color"]||manifest.accent,description:manifest.description,icons:[{src:manifest.icon,sizes:"192x192",type:"image/png"},{src:manifest.icon,sizes:"512x512",type:"image/png",purpose:"any maskable"}]}))}"><style>icon{display:flex;justify-content:center;align-items:center}icon>svg{width:100%;height:100%}</style>`,[...header.children].forEach((e=>document.head.appendChild(e))),navigator.serviceWorker&&manifest.worker?navigator.serviceWorker.register(manifest.worker).catch(console.error):console.warn('Add a service worker by setting its path to the "worker" attribute on the spectrejs script tag. You can get one at https://spectrejs.github.io/sw.js');const parser=[];new MutationObserver((e=>{e.forEach((e=>[...e.addedNodes].filter((e=>"#text"!==e.nodeName)).filter((e=>"#comment"!==e.nodeName)).map((function e(t){if(t.getAttribute("_parsed"))return t;t.setAttribute("_parsed",".");let n=Object.assign({},...[...t.attributes||[]].map((e=>({[e.name]:e.value}))));for(const e in n)if(("src"==e||"href"==e||"link"==e||"import"==e||"open"==e)&&!n[e].startsWith("#")){n[e].startsWith("lib:")&&(n[e]=n[e].replace("lib:",new URL("./lib/",manifest.src).href)+".js");try{let i=t.closest("[url-scope]")?t.closest("[url-scope]").getAttribute("url-scope"):location.href;n[e]=new URL(n[e],i).href}catch(t){}t.setAttribute(e,n[e])}return"IMG"!=t.tagName&&"IFRAME"!=t.tagName||(t.loading="lazy",t.alt=t.alt||String(String(String(t.src).split("/").pop()).split(".")[0]).replaceAll("-"," ")),parser.forEach((e=>e(t,n))),[...t.children||[]].filter((e=>"#text"!==e.nodeName)).filter((e=>"#comment"!==e.nodeName)).map(e),t})))),document.querySelectorAll("[_parsed]").forEach((e=>e.removeAttribute("_parsed")))})).observe(document.documentElement,{childList:!0,subtree:!0}),parser.push((function(e,t){let n=Object.keys(t).filter((e=>e.startsWith("#")))[0];if(n&&"TEMPLATE"!==e.tagName){n=n.replace("#",""),e.setAttribute("bind",n),"template"in t||e.setAttribute("template",e.innerHTML);let i="default"in t?t.default:void 0;i="store"in t?__storage.get(t.store,n,i):i;try{i=JSON.parse(i)}catch(e){}if(void 0===i&&(i=e),"#"+n in window)"object"==typeof window[n]&&null!==window[n]&&window[n]instanceof Element&&(window["#"+n]=e),__refresh(n);else try{Object.defineProperty(window,n,{set(e){let t=JSON.stringify(window["#"+n]);return window["#"+n]=e,setTimeout((()=>{t!==JSON.stringify(e)&&__refresh(n)}),0),!0},get(){let e=JSON.stringify(window["#"+n]);return setTimeout((()=>{e!==JSON.stringify(window["#"+n])&&__refresh(n)}),0),window["#"+n]}}),window[n]=i}catch(e){e.message.includes("redefine")?console.warn(n+" has already been defined in your javascript, use another id."):console.error(e)}"fetch"in t&&fetch(new URL(t.fetch,e.closest("[url-scope]")?e.closest("[url-scope]").getAttribute("url-scope"):location.href)).then((e=>e.ok?e.text():void 0)).then((e=>{try{e=JSON.parse(e)}catch(e){}void 0!==e&&(window[n]=e)})).catch((e=>{}))}}));const __refresh=e=>{if(void 0===window[e])return!0;if("object"==typeof window[e]&&null!==window[e]&&window[e]instanceof Element)return!0;let t=[...document.querySelectorAll(`[bind="${e}"]`)];for(let n=0;n<t.length;n++)if(t[n].getAttribute("cache")===JSON.stringify(window[e]));else if(t[n].innerHTML=__raw_bind(window[e],t[n].getAttribute("template"),t[n].getAttribute("join"),t[n].getAttribute("preview")),t[n].setAttribute("cache",JSON.stringify(window[e])),__storage.set(t[n].getAttribute("store"),e,JSON.stringify(window[e])),t[n].getAttribute("onbind")){let i=t[n].getAttribute("onbind").trim();__builder(i).apply(t[n],[window[e]])}},__raw_bind=(e,t="",n="",i="")=>void 0===e||void 0===t?"":("object"==typeof e&&null!==e&&e instanceof Array||(e=[e]),"first"==i&&(e=[e[0]]),"last"==i&&(e=[e.pop()]),"random"==i&&(e=[e[Math.floor(Math.random()*e.length)]]),"number"==typeof(i-0)&&e[i-0],e.map((e=>String(t).replaceAll("{*}","object"!=typeof e?String(e):"{*}").replace(/{.*?}/g,(function(t){let n=t.replace(/[{}]/g,"").trim();try{n=Function(`return arguments[0].${n}`)(e)}catch(e){n=void 0}return void 0===n?t:n})))).join(n||"")),__storage={get(e,t,n){let i;return"local"==e&&(i=localStorage[t]),"session"==e&&(i=sessionStorage[t]),"params"==e&&(i=location.params[t]),void 0!==i?i:n},set(e,t,n){"local"==e&&(localStorage[t]=n),"session"==e&&(sessionStorage[t]=n),"params"==e&&(location.params[t]=n)}};parser.push((function(e,t){let n=e.getAttribute("_sid")||btoa(Math.random()),i=document.querySelector(`[for="${n}"]`)||document.createElement("style");i.innerHTML="";for(const r in t){let o=t[r].trim();r.startsWith("#")&&(e.id=r.replace("#",""),e.removeAttribute(r)),r.startsWith(".")&&(e.classList.add(...r.split(".").filter((e=>e))),e.removeAttribute(r)),r.startsWith("--")&&(e.style.setProperty(r,o),e.removeAttribute(r)),r.startsWith("-")&&(e.style[r.replace("-","")]=o.startsWith("--")?`var(${o})`:o,e.removeAttribute(r)),r.startsWith(":")&&(e.setAttribute("_sid",n),i.innerHTML+=`[_sid="${n}"]${r}{${o}}\n`)}if("style"in t){let r=t.style.split("&").filter((e=>e)).map((e=>[...e.split("=")])),o=r.filter((e=>e[0]&&!e[1]))[0];o&&e.setAttribute("style",o),r=r.filter((e=>e[0]&&e[1])),r.length&&(e.setAttribute("_sid",n),i.innerHTML+=r.map((e=>`[_sid="${n}"] ${e[0].replaceAll(",",`,[_sid="${n}"] `)}{${e[1]}}`)).join(""))}i.innerHTML&&(document.head.appendChild(i),i.setAttribute("for",n))})),parser.push((function(e,t){for(const n in t){let i=t[n].trim(),[r,o]=n.split(".").map((e=>String(e)));if(r.startsWith("after")&&setTimeout((t=>__builder(i).apply(e,[{}])),(r.replace("after","")||"1")-0),r.startsWith("every")){let t=setInterval((n=>__builder(i).apply(e,[{clear(){clearInterval(t)}}])),(r.replace("every","")||"1000")-0)}r.startsWith("on")&&(e[r]=t=>{"prevent"==o&&t.preventDefault(),__builder(i).apply(e,[t]),"once"==o&&(e[r]=e=>{})}),"onenter"==r&&(e.onkeyup=t=>{"prevent"==o&&t.preventDefault(),13==t.keyCode&&(__builder(i).apply(e,[t]),e.hasAttribute("clear")&&(e.value=""),"once"==o&&(e[r]=e=>{}))}),"onmount"==r&&__builder(i).apply(e),"onitemclick"==r&&(e.onclick=t=>{"prevent"==o&&t.preventDefault(),"once"==o&&(e[r]=e=>{}),t.composedPath()[0]!==e&&(t.root=t.composedPath()[t.composedPath().indexOf(e)-1],t.index=[...e.children].indexOf(t.root),t.value=window[e.id],t.value&&"object"==typeof t.value&&t.value instanceof Array&&(t.value=t.value[t.index]),__builder(i).apply(e,[t]))})}}));const __builder=e=>e in window?window[e]:Function(`return async function(event){${e}}`)(),__templates={};parser.push((function(e,t){if("ICON"==e.tagName&&0===e.children.length&&e.innerText&&(t.import=new URL(`./icons/${e.innerText.trim().replaceAll(" ","-")}.svg`,manifest.src).href),t.import){let n=e.getAttribute("import")||t.import;n.startsWith("#")?setTimeout((t=>{if(n.replace("#","")in __templates){let t=__templates[n.replace("#","")];e.innerHTML=t.html,t.style&&e.setAttribute("style",t.style+";"+(e.getAttribute("style")||""))}}),0):sessionStorage[n]?e.innerHTML=sessionStorage[n]:fetch(n).then((e=>e.ok?e.text():"not found")).then((t=>{e.innerHTML=t,sessionStorage[n]=t})).catch((t=>e.innerHTML=t))}"TEMPLATE"!=e.tagName&&"TEMP"!=e.tagName||!e.id||(__templates[e.id]={style:e.getAttribute("style")||"",html:e.innerHTML},e.remove()),"open"in t&&(e.onclick=t=>{document.modal(e.getAttribute("open")||"",e)})})),document.modal=function(e="",t=document.body){let n=document.createElement("modal");if(n.innerHTML="<h1 -color=white -margin=auto>...</h1>",n.setAttribute("url-scope",t.closest("[url-scope]")?t.closest("[url-scope]").getAttribute("url-scope"):location.href),n.setAttribute("onclick","if(event.composedPath()[0]===this)history.back()"),n.setAttribute("style","position:fixed;z-index:3;top:0;left:0;width:100%;height:100%;background:#00000030;overflow: auto;display:flex;flex-direction:column;align-items:flex-start;align-content:flex-start;justify-content:flex-start;flex:none"),document.body.appendChild(n),e.startsWith("#")&&e.replace("#","")in __templates){history.pushState(btoa(Math.random()),null,location.href);let t=__templates[e.replace("#","")];n.innerHTML=t.html||"",n.setAttribute("style",n.getAttribute("style")+";"+t.style),document.body.appendChild(n)}return e.startsWith("#")||(n.setAttribute("url-scope",e),history.pushState(btoa(Math.random()),null,location.href),sessionStorage[e]?n.innerHTML=sessionStorage[e]:fetch(e).then((e=>e.ok?e.text():void 0)).then((t=>{n.innerHTML=t,sessionStorage[e]=t})).catch((e=>n.innerHTML=e))),n},window.onpopstate=e=>{window.onBack&&onBack(history.state);let t=[...document.querySelectorAll("modal")].pop();t&&t.remove()},parser.push((function(e,t){"back"in t&&(e.onclick=e=>history.back()),t.link&&(e.onclick=t=>open(e.getAttribute("link"),e.getAttribute("as")||"_blank"))}));