import { store } from './store.js'

class ColorSwatch {

  constructor() {
    this.swatchDiv = document.querySelector('.colorSwatch')
    this.colorsDiv = document.querySelector('.colors')
    this.addButton = document.querySelector('.addButton')
    this.darkenButton = document.querySelector('.darkenButton')
    this.lightenButton = document.querySelector('.lightenButton')
    this.hueShiftButton = document.querySelector('.hueShiftButton')
    this.subButton = document.querySelector('.subButton')
    this.addButton.addEventListener('click', () => this.addToSwatch())
    this.darkenButton.addEventListener('click', () => this.tuneSwatch('darken'))
    this.lightenButton.addEventListener('click', () => this.tuneSwatch('lighten'))
    this.hueShiftButton.addEventListener('click', () => this.tuneSwatch('hueShift'))
    this.subButton.addEventListener('click', () => this.removeFromSwatch())
  }

  render() {
    this.update()
  }

  update() {
    // empty the container and repopulate
    // Heavy operation that caused sluggish performance if called
    // on every store.notify(). 
    while (this.colorsDiv.firstChild) {
      this.colorsDiv.removeChild(this.colorsDiv.firstChild)
    }
    for (let i = 0; i < store.swatch.length; i++) {
      this.createColorPicker(store.swatch[i], i)
    }
  }

  createColorPicker(initialColor, swatchIndex) {
    const input = document.createElement('input')
    input.className = 'color-input'
    input.setAttribute('value', initialColor)
    this.colorsDiv.appendChild(input)

    const hueb = new Huebee(input, {
      notation: 'hex',
      saturations: 3,
      hues: 25,
      shades: 9,
    })
    hueb.on('change', () => {
      input.value = input.value.toUpperCase()
      store.setColorInSwatch(input.value, swatchIndex)
    })
  }

  addToSwatch() {
    const lastColor = this.colorsDiv.lastChild.value
    this.createColorPicker(lastColor, this.colorsDiv.children.length)
    store.addColorToSwatch(lastColor)
    this.subButton.disabled = false
  }

  tuneSwatch(action) {
    const base = store.swatch[store.swatch.length - 1]
    let newColor = base

    switch (action) {
      case 'darken':
        newColor = tinycolor(base).darken(10).toHexString().toUpperCase()
        break
      case 'lighten':
        newColor = tinycolor(base).lighten(10).toHexString().toUpperCase()
        break
      case 'hueShift':
        newColor = tinycolor(base).spin(25).toHexString().toUpperCase()
        break
      default:
        break
    }

    const input = this.colorsDiv.lastChild
    input.value = newColor
    store.setColorInSwatch(newColor, store.swatch.length - 1)
    input.style.background = newColor
    input.style.color = tinycolor(newColor).isDark() ? '#FFFFFF' : '#000000'
  }

  removeFromSwatch() {
    if (this.colorsDiv.children.length > 1) {
      this.colorsDiv.removeChild(this.colorsDiv.lastChild)
      store.removeColorFromSwatch()
    }
    if (this.colorsDiv.children.length < 2) {
      this.subButton.disabled = true
    }
  }

}

export const colorSwatch = new ColorSwatch()
