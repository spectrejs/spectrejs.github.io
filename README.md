SpectreJS v1.0.0
---
A tiny Super-powered reactive frontend JS framework for building amazing web apps, fast! (yeah, thats a mouthful ).

### Examples
##### Counter
```html
<script src=//spectrejs.github.io/spectre.js ></script>
<p bind=count >counter value: {*}</p>
<button on.click=increase>increase count</button>
<script>
  var count = 0
  function increase(){
    count++
  }
</script>
```

##### Todo list
```html
<script src=//spectrejs.github.io/spectre.js ></script>
<ul bind=todo>
  <li>{*}</li>
</ul>

<input on.enter=submit placeholder="add todo">
<script>
  var todo=[]
  function submit(){
    todo.push(this.value)
    this.value=""
  }
</script>
```
With features like event and data binding, natural feeling syntax, 0 build steps and easy installation all under **10kb**, interested?

---
### Docs
- [Setting up](./docs/setup.md)
- [Adding sugar](./docs/sugar.md)
- [Handling events](./docs/events.md)
- [Binding data](./docs/bind.md)
- [Creating modals](./docs/modals.md)
- [More](./docs/more.md)

Learn more at https://spectrejs.github.io

---
### Author
Faizel Garoeb at <dealdreygaroeb@gmail.com>. Under the [MIT](./LICENSE) license.