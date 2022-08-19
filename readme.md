SpectreJS
---
An amazingly **Tiny** and **Powerful** front-end JavaScript framework for building dynamic web apps fast!

##### Counter app:
```html
  <button on:click=increase>add</button>
  <p format=counter>current value: {@self}</p>
  <button on:click=decrease>minus</button>
 
 
 <script>
   app.format.counter=0
   app.on("increase",()=>app.format.counter++)
   app.on("decrease",()=>app.format.counter--)
 </script>
```

##### Todo list:
```html
<ul list=todolist>
  <li>{*}</li>
</ul>

<form on:submit.prevent=submit>
  <input ::text #todo>
  <input ::submit value="add todo">
</form>

<script>
app.list.todolist=[]
app.on("submit",()=>{
  app.list.todolist.push(app.id("todo").value)
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
##### entry.html:
```html
<p bind:text=text></p>
<script>
  app.bind.text="hello spectre!"
</script>
```

Learn more [here](https://spectrejs.github.io).

---
### Author
Faizel Dealdrey Garoeb<br/>email - <dealdreygaroeb@gmail.com><br/>happy coding!
