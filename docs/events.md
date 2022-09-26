SpectreJS - Events
---
Events bind a global variable or function to the element, the functions `this` scope is set as the element.
```html

<!--simple usage-->
<div onclick=handler >hellos</div>
<script>
  function handler(){
    alert(this.innerText)
  }
</script>

<!--inline usage-->
<div onclick="alert(this.innerText)">hellos</div>
<!--inline event object-->
<div onclick="console.log(event)">hellos</div>

<!--prevent default actions-->
<div onclick.prevent=handler >hellos</div>

<!--execute only once-->
<div onclick.once=handler >hellos</div>

```
Note the `prevent` and `once` submethods cannot be combined.

---
[continue to icons](./icons.md)
