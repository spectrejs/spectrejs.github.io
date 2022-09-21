SpectreJS - Cheatsheet
---

```html
<script src=.../spectre.js
  accent=color
  theme=light|dark|system(default)
  title="Spectre App"
  desc="Powered by SpectreJS"
  icon=/favicon.ico
  color=#454545
  foreground=#fcfcfc
  background=#fff
  shadow=#00000020
  entry=location.origin
  ui="button bar flex text"
  worker="/path/to/service-worker"
  ></script>

<element 
#id 
-style=value -style=--css-variable
--css-variable=value 
-css-selector.style=value

.class .binded.class 
:type 

on.event=handler
on.event.prevent=handler
on.event.once=handler
on.event.script="inline async script (arg e)"

custom events
on.itemclick=listItems
on.bind=onBind
on.enter=keyboardEnter
back="onclick backs"

bind=variableName
bind.default=defaultValue
bind.local=localStorageKey
bind.session=sessionStorageKey
bind.params=urlParameterKey
bind.url=pathToBindable
bind.preview=pickFromArray(first|last|random)

template="html to be formatted"

open=app.open(url)
open.nav=window.open(url)
open.frame=app.open(url,frame)
open.solid=app.open(url,solid)

/>

<load></load>

<icon>bootstrap icon name (fetched & injected)</icon>

<script :module >
  
  app.open("url")
  app.open("url","frame")
  app.modal("html","url-scope")
  
  function onBack(){
    //app on back press
  }
  
  app.parser(function customParser(element){})
  app.params={URLParameters}
  
  //create bind using "bind" function
</script>
```
