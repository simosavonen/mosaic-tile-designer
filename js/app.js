'use strict'

// these imports create singleton instances
import { groutPalette } from './components/groutpalette.js'
import { settings } from './components/settings.js'
import { colorSwatch } from './components/colorswatch.js'
import { favorites } from './components/favorites.js'
import { canvas } from './components/canvas.js'
import { texture } from './components/texture.js'
import { store } from './components/store.js'

class MosaicDesigner {

  constructor() {
    groutPalette.render()
    settings.render()
    colorSwatch.render()
    favorites.render()
    canvas.render()
    texture.render()

    // the order matters, add canvas before texture
    store.addObserver(canvas)
    store.addObserver(texture)
    store.addObserver(groutPalette)
  }
}

window.addEventListener('load', () => new MosaicDesigner())
