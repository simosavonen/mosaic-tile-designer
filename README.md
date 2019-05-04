# Mosaic Tile Designer

Javascript programming exercise for University of Turku. It follows the ES6 modular design style
where you define classes and export an instance of it:

```javascript
// file: components/settings.js

class Settings { ... }

export const settings = new Settings()
```
When we import it, the singleton instance is created. 

```javascript
// file: app.js

import { settings } from './components/settings.js'

class MosaicDesigner { 
  constructor() {
    settings.render()
  }  
}

```

The app separates a model in file **store.js** which handles saving the state into the browser localStorage. Everything is saved there, so users will see familiar data when returning.

Each section of the website is implemented by a separate component.js file, some of which register as _observers_ for the model component, store.js. When the application state is updated, store.js tells the observers to update their views.

- Branch master contains an early proof-of-concept single file version of the app.
- Branch **modular** has the proper version with the app divided into multiple files.
