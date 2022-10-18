```html
<el 

.class
.binded.class
-style-name=style-value
--css-variable=variable-value
:psuedo-selector="css:value"
#id-and-bind-id
style="css:value&selector=css:value  --- selectors are scoped"

onevent="handlerName or inline async script (event)"
onitemclick="handler when item in list clicked (event.root,event.target,event.index,event.value)"
onmount="handler when element mounted to dom"
onenter="when an inputs enter key is pressed"
clear="clears input on enter key pressed"
back="onclick history.back"
link="url to open"
as="open url url as (_blank)"

default="default value for bind"
onbind="handler when bound"
preview="if bind is an array, pick a single value(first|last|random|index)"
join="intermediary value to join list binds"
store="set get data from a storage paradigm (local|session|cookie|params)"
fetch="fetch url and bind to data"

open="popup modal data from url or template (#template-id)"
import="import html from external source or template (#template-id)"
after13="event after 13ms"
every1000="event every 1000ms"



>
  {*} //bind the value itself
  {name.first} //bind object vals
  {emoji.2} //array value
  
</el>

```
