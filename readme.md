SpectreJS
---
 A minimalistic reactive framework that enhances web apps with data and event binding, PWA support, dynamically loaded icons and so much more! all under **10kb**.

### Examples
##### The infamous todo app
```html
<ul bind=list bind.default=[] >
  <li>{*}</li>
</ul>
<input :text onenter="bind.push(this.value);this.value=''" placeholder=todo>
```

##### That counter app
```html
<button onclick=bind.count++ >Increase</button>
<p bind=count bind.default=0 >value is: {*}</p>
<button onclick=bind.count-- >Decrease</button>
```

##### Note taking app
```html
<ul bind.local=notes bind.default=[] onitemclick=bind.notes.splice(event.index,1) >
  <li -padding=5px>
    <h3 -margin=0px >{title}</h3>
    <p -margin=0px -color=blue >{desc}</p>
  </li>
</ul>

<button onclick=addNote ><icon>plus</icon>add note</button>
<script>
  function addNote(){
    bind.notes.splice(0,0,{title:prompt("add title"),desc:prompt("add description")})
  }
</script>
```

---
### Installation
Just add spectrejs via a script tag at the top of your page and your good to go.
```html
<html>
  <script src=//spectrejs.github.io/spectre.js ></script>
  <!-- Your code goes here -->
</html>
```
No hussle, no buildsteps, no nothing. If you like, please add a star, and if you don't, please also add a star so I can know you don't!


---
### Docs
- [Setting up](./docs/setup.md)
- [Adding sugar](./docs/sugar.md)
- [Handling events](./docs/events.md)
- [Bootstrap icons](./docs/icons.md)
- [Binding data](./docs/bind.md)
- [Creating modals](./docs/modals.md)
- [More](./docs/more.md)

Learn more at https://spectrejs.github.io

---
### Author
Faizel Garoeb at <dealdreygaroeb@gmail.com>. Under the [MIT](./LICENSE) license.
