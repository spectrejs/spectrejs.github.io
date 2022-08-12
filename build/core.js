import { match } from "./reactive.js"



export function buildFront(shard){
  let page=`<!DOCTYPE html><html lang=en ><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="${manifest.color||"#e91e63"}"><link rel="apple-touch-icon" href="${manifest.icon||"/favicon.ico"}"><link rel="manifest" href="data:application/json;base64,${btoa(JSON.stringify(webmanifest))}">`
  page+=`<title>${manifest.title||"Spectre App"}</title>`
  page+=`</head>${shard.body.outerHTML}</html>`
  return page
}

export async function buildBack(shard){
  //indented objects nd arrays
  const subproxy=(key,val)=>{
    let x=new Proxy(val,{
      set(nt,nk,nv){
        if(typeof nv=="object"){
          nt[nk]=subproxy(key,nv)
          return true
        } else {
          nt[nk]=nv
          match(shard.nodes,key,bind[key])
          return true
        }
      }
    })
    
    return x
  }
  
  window.bind=new Proxy({},{
    set(target,key,val){
      
      if(typeof val=="object"){
        target[key]= subproxy(key, val)
        //proxify preset array|object values
        if(target[key] instanceof Array)target[key].forEach((v,i)=>target[key][i]=v)
        else Object.keys(target[key]).forEach(e=>target[key][e]=target[key][e])
        return true
      } else {
        target[key]=val
        match(shard.nodes,key,val)
        return true
      }
    }
  })
 await Promise.all(shard.script.map(e=>import(e)))
 document.body.style.display="block"
}
