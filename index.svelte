<bar .shadow #bar >
  <text>Test app</text>
</bar>
<flex flow=row><button>normal</button>
<button .silent >silent</button>
<button .outline >outline</button></flex>
<button .fab -position=fixed -bottom=20px -right=20px>+</button>
<flex >
  <text>
    <span .text -font-weight=bold @text=lorem>Lorem Ipsum</span> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
  </text>
</flex>

<template #temp>
  
</template>
<script>
  app.bind.lorem="lipsum"
</script>

<script src=scr.js ></script>
