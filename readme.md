SpectreJS v1.0.2
---
A **Tiny** and **Powerful** framework designed to enhance web apps and automate PWA support. Packed with features like reactive data binding, dynamically loaded icons and so much more all under **10kb** unzipped.

### Examples
##### Counter
```html
<button onclick=count++ ><icon>plus</icon></button>
<p #count default=0 >value is: {*}</p>
<button onclick=count-- ><icon>minus</icon></button>
```
##### Todo list
```html
<ul #list store=local default=[]>
  <li>{*}</li>
</ul>
<input onenter=list.splice(0,0,this.value) clear >
```
##### RSS Feed
```html
<div import=//hackernews.com/rss >loading...</div>
```
##### Some sugar
```html
<element
  #id
  .class .two.classes
  -css-name=value --css-variable=value
  :css-pseudo-selector="css:value;css:value"
  style="css:value; & selector=css:value;css:value (inline selectors are scoped to the element)" />
  ```
complete cheatsheet [here.](./docs/silver.md)


---
### Installation
Just add SpectreJS via a script tag at the top of your page. 
```html
<html>
  <script src=//spectrejs.github.io/spectre.js ></script>
  <!--your code goes here-->
</html>
```

---
### Docs
- [Setup](./docs/setup.md)
- [Syntax](./docs/syntax.md)
- [Events](./docs/events.md)
- [Binds](./docs/binds.md)
- [Icons](./docs/icons.md)
- [More](./docs/more.md)

Playground at https://spectrejs.github.io/playground

---
Made with ❤️ by [Faizel Garoeb](...), under the [MIT](./license) license.
