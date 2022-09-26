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

.class .binded.class 
:type 

onevent=handler
onevent.prevent=handler
onevent.once=handler

custom events
onitemclick=listItems
onbind=onBind
onenter=keyboardEnter
back="onclick backs"

bind=variableName
bind.default=defaultValue
bind.local=localStorageKey
bind.session=sessionStorageKey
bind.params=urlParameterKey
bind.url=pathToBindable
bind.preview=pickFromArray(first|last|random)

template="html to be formatted"

open=open(url)
open.nav=window.open(url)
open.frame=open(url,frame)
open.solid=open(url,solid)

/>

<load></load>

<icon>bootstrap icon name (fetched & injected)</icon>

<script :module >
  
  open("url")
  open("url","frame")
  modal("html","url-scope")
  
  function onBack(){
    //app on back press
  }
  
  //add custom parsing
  parser.extend(function customParser(element,attributes){})
  //url parameters
  app.params={URLParameters}
  //app manifest
  console.log(manifest)
  
  //access binds
  bind.handler=value
  
</script>
```

build to sjs
```bash
cd /sdcard/Android/data/io.spck/files/spectrejs.github.io && terser init.js parse.js bind.js sugar.js events.js icons.js misc.js modals.js -o spectre.js -c -m
```
