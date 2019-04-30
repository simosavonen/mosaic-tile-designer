'use strict'

import { groutPalette } from './components/groutpalette.js'
import { settings } from './components/settings.js'
import { colorSwatch } from './components/colorswatch.js'
import { canvas } from './components/canvas.js'
import { store } from './components/store.js'

export const globalVariable = 'global variable'

class MosaicDesigner {

  constructor() {
    console.log('main app created')

    groutPalette.render()
    settings.render()
    colorSwatch.render()
    canvas.render()

  }
}

window.addEventListener('load', () => new MosaicDesigner())