return {
  front(shard){
  let page=`<!DOCTYPE html><html lang=en style="--color:${manifest.color||"#e91e63"};--background:${manifest.background||"#fff"};--shadow:${manifest.shadow||"#00000020"};--text:${manifest["text"]||"#454545"}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="${manifest.color||"#e91e63"}"><link rel="apple-touch-icon" href="${manifest.icon||"/favicon.ico"}"><link rel="manifest" href="data:application/json;base64,${btoa(JSON.stringify(webmanifest))}">${shard.scriptSrc.map(e=>`<script src="${e}"></script>`).join("")}${shard.styleSrc.map(e=>`<link rel="stylesheet" href="${e}">`).join("")}<style>${shard.style.join("\n")}</style>`
  page+=`<title>${manifest.title||"Spectre App"}</title>`
  page+=`</head>${shard.body.outerHTML}</html>`
  return page
  },
  
  async back(shard){
        //indented objects nd arrays
        const subproxy = (key, val) => {
          let x = new Proxy(val, {
            set(nt, nk, nv) {
              if (typeof nv == "object") {
                nt[nk] = subproxy(key, nv)
                return true
              } else {
                nt[nk] = nv
                _app.match(key, bind[key])
                return true
              }
            }
          })
    
          return x
        }
    
        app.bind = new Proxy({}, {
          set(target, key, val) {
    
            if (typeof val == "object") {
              target[key] = subproxy(key, val)
              //proxify preset array|object values
              if (target[key] instanceof Array) target[key].forEach((v, i) => target[key][i] = v)
              else Object.keys(target[key]).forEach(e => target[key][e] = target[key][e])
              return true
            } else {
              target[key] = val
              _app.match(key, val)
              return true
            }
          }
        })
  await Function(`return async (base)=>{
    const script=scriptFactory(base);
    const scripts=sxFactory(script);
    ${shard.script.join("\n")}
    }`)()(location.href).catch(console.error)
    
  }}
