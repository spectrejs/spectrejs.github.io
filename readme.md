SpectreJS
---
A **Tiny** and **Powerful** front-end JavaScript framework for building amazing web apps fast!

##### Example:
```html
 <button @on:click=increase>+</button>
 <p @text=counter></p>
 <button @on:click=decrease>-</button>
 
 <script>
   bind.counter=0
   bind.increase=()=>bind.counter++
   bind.decrease=()=>bind.counter--
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
bind.todolist=[]
bind.submit=function(e){
  bind.todolist.push(node.todo.value)
  node.todo.value=""
}
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
Faizel Dealdrey Garoebe<br/>email - <dealdreygaroeb@gmail.com><br/>happy coding!
