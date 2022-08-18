SpectreJS
---
A **Tiny** and **Powerful** front-end JavaScript framework for building amazing web apps fast!

##### Example:
```html
  <button @on:click=increase>add</button>
  <p @format=counter>current value: {@self}</p>
  <button @on:click=decrease>minus</button>
 
 
 <script>
   app.bind.counter=0
   app.bind.increase=()=>app.bind.counter++
   app.bind.decrease=()=>app.bind.counter--
 </script>
```

##### Todo list:
```html
<ul @list=todolist>
  <li>{@self}</li>
</ul>

<form @on:submit.prevent=submit>
  <input ::text #todo>
  <input ::submit value="add todo">
</form>

<script>
app.bind.todolist=[]
app.bind.submit=function(e){
  app.bind.todolist.push(app.node.todo.value)
  app.node.todo.value=""
}
</script>
```

---
### Features
- Declarative af
- Auto PWA enhanced
- Inbuilt page pre-fetch
- 50+ custom components
- 2/w data binding
- Responsive design

and so much more under `30kb`, **interested?**

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
<p @format=greet> hello {planet}! Im {name}</p>
<script>
  bind.greet={
    planet:"earth",
    name:"Faizle"
  }
</script>
```

Learn more [here](https://spectrejs.github.io).

---
### Author
Faizel Dealdrey Garoeb<br/>email - <dealdreygaroeb@gmail.com><br/>happy coding!
