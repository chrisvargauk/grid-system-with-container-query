# Grid System with Container Query
Create Media query based on available space in your UI structure, not based on viewport with.
Use this media query to define layout for only a UI Element or for the whole Grid System.
##### Why?
Media Query is just not enough to create reusable UI Elements when you have different available spaces 
depending on what your view Looks Like. 

### Usage
Define the breakpoints when you create a new Grid System.
```javascript
import GridSystem from 'grid-system-with-container-query';

const gridSystem = new GridSystem({
  default: {
    'col-4-4': 100,
    'col-3-4': 75,
    'col-2-4': 50,
    'col-1-4': 25,
  },

  600: {
    'col-4-4': 100,
    'col-3-4': 100,
    'col-2-4': 50,
    'col-1-4': 50,
  },

  400: {
    'col-4-4': 100,
    'col-3-4': 100,
    'col-2-4': 100,
    'col-1-4': 100,
  },
});
```
Then use the defined breakpoints in your HTML accordingly.
```html
<div class="grid">
  <div class="col-2-4">...</div>
  <div class="col-2-4">...</div>
  <div class="col-4-4">...</div>
</div>
```
### Containers
You can add the class "cont" to any UI Element to get relevant breakpoint set on the UI Element itself.

Add class "cont" to any DOM Element
```html
<div class="cont">...</div>
```
That dome element will have correct breakpoint attribute set whenever the view gets resized.
```html
<div class="cont" breakpoint="default"></div>
or
<div class="cont" breakpoint="400"></div>
```

### ES6, CJS, AMD, UMD
dist/GridSystem.js is built with UMD, therefore you are free to chose what module definition you prefer to use in 
your own project.

# Contribute
https://github.com/chrisvargauk/grid-system-with-container-query