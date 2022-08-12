<ul @list=list>
  <li>{@self}</li>
</ul>

<form @on:submit.prevent=submit>
  <input ::text #todo>
  <input ::submit value="add todo">
</form>

<script>
  
bind.list=[]

bind.submit=function(e){
  bind.sponsor.name=node.todo.value
  node.todo.value=""
}


</script>

<card .sponsors @format=sponsor>
  
  <p>{name}</p>
</card>



<button @on:click=increase .button.primary -background=blue>+</button>
<p @text=counter -color=green ></p>
<button @on:click=decrease -background=red>-</button>

<script>
  bind.counter = 0
  bind.increase = () => bind.counter++
  bind.decrease = () => bind.counter--
  
  bind.sponsor={
    avatar:"/favicon.ico",
    name:"joshua"
  }
</script>
