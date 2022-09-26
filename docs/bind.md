SpectreJS - Binding
---
When an element is bound, all changes to that bind reflects to the UI, no matter the data type.

```html
<!--simple bind-->
<p bind=text>{*}</p>
<script>
  bind.text="Hello Joe"
</script>

<!--binding objects-->
<p bind=user >{name.first} {name.last} is {age} years old.</p>
<script>
  bind.user={
    name:{
      first:"Daniel",
      last:"Werne"
    },
    age:30
  }
</script>

<!--binding lists-->
<ul bind=todo >
  <li>{*}</li>
</ul>
<script>
  bind.todo=["Buy milk","Walk fluffy","Pay netflix"]
</script>
```

##### Default values
If bind data has not yet been set, the element will be emptied. To set a default value, pass it to the `bind.default` attribute. Values are parsed as json.
```html
<p bind=name bind.default="joe">hello {*}</p>
```

##### Bind to storage
Binding data using `bind.local` or `bind.session` automatically saves and retrieves the data from the respective storages. Values are parsed as json.
```html
<p bind.local=note >{*}</p>
<input placeholder="add note" onenter="bind.note=this.value" >
```
There are currently four supported storage types.
attr | desc
--- | ---
`bind.local` | localStorage
`bind.session` | sessionStorage
`bind.params` | URL Parameter
`bind.cookie` | cookies

##### On bind
To detect when an element is bound or when the binds value changes, pass an `onbind` event to the element.
```html
<p bind.local=note onbind=alert(event) >{*}</p>
<input placeholder="add note" onenter="bind.note=this.value" >
```

##### Preview
When binding to an array, one item can be picked out to reflect to the ui. Options are `first`, `last`, `random` or a number value to get the specific position.
```html
<p bind=quotes bind.preview=random >{*}</p>
<script>
  bind.quotes=["Love is love","Happiness is a journey","Other sappy quotes"]
</script>
```



---
[continue to modals](./modals.md)
