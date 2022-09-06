SpectreJS
---
An amazingly **Tiny** and **Powerful** front-end JavaScript framework for building dynamic web apps fast!

##### Counter app:
```html
  <button on:click=increase>add</button>
  <p format=count>current value: {*}</p>
  <button on:click=decrease>minus</button>
 
 
 <script>
   app.format("count",0)
   app.on("increase",()=>app.edit("count","++"))
   app.on("decrease",()=>app.edit("count","--"))
 </script>
```

##### Todo list:
```html
<ul format=list>
  <li>{*}</li>
</ul>

<form on:submit.prevent=submit>
  <input ::text #todo>
  <input ::submit value="add todo">
</form>

<script>
app.format("list",[])
app.on("submit",()=>{
  app.edit("list","push",app.id("todo").value)
  app.id("todo").value=""
})
</script>
```

---
### Installation

Add Spectre to your `index.html`, then add a reference to your entry file via the main method.
###### index.html:
```html
<html>
  <script src="https://spectrejs.github.io/spectre.js" >
    {
      "main":"/entry.html"
    }
  </script>
</html>
```

Then add your code or one of the examples above to the `entry.html` file, thats about it!


Learn more [here](https://spectrejs.github.io).

---
### Author
Faizel Dealdrey Garoeb<br/>email - <dealdreygaroeb@gmail.com><br/>happy coding!
