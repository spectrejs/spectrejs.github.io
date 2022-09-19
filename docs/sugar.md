SpectreJS - Syntactic sugar
---

### IDs
```html
<div #myDiv ></div>
<!-- converts to -->
<div id=myDiv ></div>
```

### Styles
```html
<div -color=blue -z-index=--index --size=30px -span.color=blue>hi <span>world</span></div>
<!-- converts to -->
<div style="color:blue;z-index:var(--index);--size:30px" >hi <span style=color:blue >world</span></div>
```

### Classes
```html
<div .bold .btn.alert ></div>
<!-- converts to -->
<div class="bold btn alert" ></div>
```

### Types
```html
<div :submit ></div>
<!-- converts to -->
<div type=submit ></div>
```

---
[continue to events](./events.md)
