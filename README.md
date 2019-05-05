# Mosaic Tile Designer

Javascript programming exercise for University of Turku _continuing education_ course Fullstack 2019. 

Design mosaic tile textures for use in 3D modeling software. The app lets you edit the grid to fix any repeating patterns on the edges of the texture. You can adjust the grout color and thickness, number of rows and columns, grid cell width and height. You define a color swatch and assign the colors to the mosaic grid either manually or at random.

To save a texture.png file, right click the smaller mosaic grid canvas and choose 'Save Image As...'

A demo is running at http://substantial-yoke.surge.sh

## Design principle
Chose to use only vanilla Javascript, to see the difference to popular frameworks like React. The first version ended up being a long single app.js file which some might call spaghetti code.

After a full rewrite, the application now follows the ES6 modular design style where you define a class and export an instance of it:

```javascript
class Settings { ... }
export const settings = new Settings()
```
When we import the class, the singleton instance is created.  

```javascript
import { settings } from './components/settings.js'
class MosaicDesigner { 
  constructor() { settings.render() }
}
```
If we then `import { settings }` again in another file, it will point to the same instance.

## Classes and UML diagram
The app separates a model in file **store.js** which handles the state. Every data structure is saved and loaded from the browser's localStorage, so users will see familiar data when returning.

Each section of the website is implemented by a _component.js_ file, some of which register as _observers_ for the model component, store.js. When the application state is changed, store.js tells the observers to update their views. The one exception to this is a direct link between favorites.js and colorswatch.js, where when loading a saved color swatch, favorites.js calls colorSwatch.update(). This is to avoid updating colorSwatch panel at every minor state change update. 

![UML diagram](https://gitlab.utu.fi/sipesa/mosaic-tile-designer/raw/modular/img/MosaicTileDesignerUML.svg)

The components responsible for a GUI panel implement a method `render()` where code to draw the initial view should go. However, some components redraw themselves fully when `update()` is called. Such components ended up with a simple `render() { this.update() }` implementation.

The application uses two JS libraries
- **Huebee** http://huebee.buzz/ for picking a color, since the HTML5 `input type="color"` is not fully supported on many browsers, also the GUI looks different on each browser that does support it.
- **TinyColor** https://github.com/bgrins/TinyColor for easier color manipulation. ColorSwatch has buttons that let users add a lighter, darker or hue shifted color to the swatch.




- Branch **master** contains an early proof-of-concept single file spaghetti version.
- Branch **modular** has the proper version with the app divided into multiple files.