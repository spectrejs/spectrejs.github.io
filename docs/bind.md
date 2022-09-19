SpectreJS - Binding
---
When you set a global variable name to the `bind` attribute of an element, its value gets parsed in. It then automatically reacts to changes in the value of the variable and rerenders.
```html
<!--simple usage-->
<p bind=name>hello {*}</p>
<p bind=user>{name.first} {name.last} is {age} years old.</p>
<script>
  var name = "John"
  var user = {
    name:{
      first:"Daniel",
      last:"Werne"
    }
    age:32
  }
</script>

<!--advanced usage-->
<div bind=avatars ><img src={cover}><p>{name}</p></div>
<script>
  var avatars=[
    {
      cover:"/photo.png",
      name:"Aang"
    },
    ...
    ]
</script>
```

### On bind
```html
<!--event handler on bind-->
<p bind=v on.bind=handler(value)>...</p>
```

### Default value
```html
<!--set default value-->
<p bind=v bind.default=value>...</p>
```

### External resource
```html
<!--fetch data then bind-->
<p bind=v bind.url=url >...</p>
```

if the variable is not defined or no default is set then the element will be emptied.

---
[continue to modals](./modals.md)
