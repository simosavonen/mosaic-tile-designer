import { mapeiGrouts } from './mapeiData.js'
import { store } from './store.js'

class GroutPalette {

  constructor() {
    this.groutDiv = document.querySelector('.groutPalette')
    this.groutHeader = document.querySelector('.groutHeader')
  }

  render() {
    for (let name in mapeiGrouts) {
      const sampleDiv = document.createElement('div')
      sampleDiv.className = 'groutSample'
      sampleDiv.style.background = mapeiGrouts[name]
      sampleDiv.addEventListener('click', () => {
        store.setState('groutName', name)
        store.setState('groutColor', mapeiGrouts[name])
      })
      this.groutDiv.appendChild(sampleDiv)
    }
  }

}

export const groutPalette = new GroutPalette()