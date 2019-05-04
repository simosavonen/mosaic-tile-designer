import { mapeiGrouts } from '../data/MAPEI_Ultracolor.js'
import { store } from './store.js'

class GroutPalette {
  constructor() {
    this.groutDiv = document.querySelector('.groutPalette')
    this.groutHeader = document.querySelector('.groutHeader')
    this.update()
  }

  render() {
    for (let name in mapeiGrouts) {
      const sampleDiv = document.createElement('div')
      sampleDiv.className = 'groutSample'
      sampleDiv.style.background = mapeiGrouts[name]
      sampleDiv.addEventListener('click', () => {
        store.setState('groutName', name, false)
        store.setState('groutColor', mapeiGrouts[name])
      })
      this.groutDiv.appendChild(sampleDiv)
    }
    // fix the floating divs overflowing outside parent div
    const clearDiv = document.createElement('div')
    clearDiv.style.clear = 'both'
    this.groutDiv.appendChild(clearDiv)
  }

  update() {
    const { groutName, groutColor } = store.state
    this.groutHeader.innerHTML = `Grout Palette by MAPEI Ultracolor<br />
    ${groutName}: ${groutColor}`
  }
}

export const groutPalette = new GroutPalette()
