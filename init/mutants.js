const utils =await scripts("./parse/id.js","./parse/css.js","./parse/class.js","./parse/type.js","./parse/load.js","./parse/icon.js","./parse/template.js","./parse/events.js","./parse/sublinks.js","./parse/script.js","./parse/open.js","./parse/loading.js")
//convert attributes to object
window._getAttr=(e={})=>Object.assign({},...[...(e.attributes||[])].map(e=>{return {[e.name]:e.value}}))

return function tmnt(view){
  
  var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    //node shorthand
    if(mutation.type=="childList"){
      let el=[...mutation.addedNodes].filter(e=>e.nodeName!=="#text")
      .forEach(e=>{
        //manage newly added parents recursively
        //create templates
        utils.template(e,true)
        //fix dynamic links 
        utils.sub(e,true)
        //create events
        utils.events(e,true)
        
        //parse ids
        utils.id(e,true)
        //parse css
        utils.css(e,true)
        //parse classes
        utils.clss(e,true)
        //parse types
        utils.type(e,true)
        
        
        //load icons into dom
        utils.icon(e,true)
        //load pages into dom (auto prefetched)
        utils.load(e,true)
        //create loading icons
        utils.loading(e,true)
        //create resource links
        utils.open(e,true)
        //parse scripts after mutants
        utils.scr(e,true)

      })
    } else {
      
    }
  });
});

mutationObserver.observe(document.documentElement, {
  attributes: true,
  childList: true,
  subtree: true,
});

}
