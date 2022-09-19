SpectreJS - Events
---
Events bind a global variable or function to the element, the functions `this` scope is set as the element.
```html

<!--simple usage-->
<div on.click=handler >hellos</div>
<script>
  function handler(){
    alert(this.innerText)
  }
</script>

<!--inline usage-->
<div on.click.script="alert(this.innerText)">hellos</div>
<!--inline event object-->
<div on.click.script="console.log(e)">hellos</div>

<!--prevent default actions-->
<div on.click.prevent=handler >hellos</div>

<!--execute only once-->
<div on.click.once=handler >hellos</div>

```
Note the `prevent`, `once` and `script` submethods cannot be combined.

---
[continue to binding](./bind.md)
