SpectreJS - Setup
---
Add a script tag to the top of your document.
```html
<html>
  <meta charset="UTF-8">
  <script src=//spectrejs.github.io/spectre.js ></script>
  <body>
    <!-- your site html -->
  </body>
</html>
```

Attributes of the script tag acts as manifest entries, these define the app's general behaviour.

### Manifest methods
Method | Default | Description
--- | --- | ---
title | Spectre App | Sets the site and webmanifest title
desc | Powered by SpectreJS | Sets the webmanifest description
entry | / | Sets the webmanifest start url
icon | /favicon.ico | Sets the favicon and webmanifest icon
accent | #e91e63 | Sets the app theme color and css var --color
theme | system | Sets the background, text and shadow of the app (light, dark, oled, system)
color | #454545 | Sets the app text color and css var --text
foreground | #fbfbfb | Sets the app foreground color and css var --foreground
background | #fff | Sets the app background color and css var --background
shadow | #00000020 | Sets the app shadow color and css var --shadow
worker | none | Sets the path to the service worker

### Usage
```html
<script src=//spectrejs.github.io/spectre.js
  title="Some title"
  desc="Some desc"
  entry="/"
  ... ></script>
```
You can access the manifest object via the `manifest` variable.

---
[continue to syntactic sugar](./sugar.md)
