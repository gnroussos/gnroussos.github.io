#Optimizations 

### index.html

* cleanup Css, minify & inline
* load print css when needed
* load asynchronously js doesn't alter DOM
* load web fonts with asynchronously js

### pizza.html

* resize & compress images (after observing css style layout & timeline the pizzaria image was resized to the displayed size)
* less than 200 moving pizzas are created since only some are shown (~30)
* in update function all variables are calculated outside of loop
* the scrolling x position seems to be repeated so it's calculated once & stored 
* getElementsByClassName is used wherever possible in the code instead of queryall
* moving pizzas are stored in a global item array outside of update function which is called frequently
* use of CSS will-change property for positioning moving pizzas
