import { store } from './store.js'

class Settings {
  constructor() {
    const { rows, cols, tileWidth, tileHeight, groutWidth } = store.state

    this.settingsDiv = document.querySelector('.settings')
    this.rowsSlider = document.getElementById('rowsSlider')
    this.colsSlider = document.getElementById('colsSlider')
    this.groutSlider = document.getElementById('groutSlider')
    this.widthSlider = document.getElementById('widthSlider')
    this.heightSlider = document.getElementById('heightSlider')

    this.rowsSlider.value = rows
    this.colsSlider.value = cols
    this.groutSlider.value = groutWidth
    this.widthSlider.value = tileWidth
    this.heightSlider.value = tileHeight

    Array.from(document.getElementsByClassName('slider')).forEach(
      (slider) => slider.addEventListener('input', (event) => {
        store.setState(slider.name, parseInt(slider.value, 10))
        document.getElementById(slider.name).innerText = slider.value
      })
    )

    this.glowButton = document.getElementById('glowButton')
    this.lockButton = document.getElementById('lockButton')
    this.glowStatus = document.getElementById('glowStatus')
    this.lockStatus = document.getElementById('lockStatus')


    this.glowButton.addEventListener('click', () => {
      store.setState('glowEffect', !store.state.glowEffect)
      this.glowStatus.innerText = store.state.glowEffect ? 'on' : 'off'
    })

    this.lockButton.addEventListener('click', () => {
      store.setState('patternLock', !store.state.patternLock, false)
      this.lockStatus.innerText = store.state.patternLock ? 'on' : 'off'
    })

    this.toggleLink = document.getElementById('toggleSettings')
    this.settingsTable = document.getElementById('settingsTable')

    this.toggleLink.addEventListener('click', () => {
      store.setState('settingsVisible', !store.state.settingsVisible, false)
      if (store.state.settingsVisible) {
        this.toggleLink.innerText = 'hide'
        this.settingsTable.style.display = ''
      } else {
        this.toggleLink.innerText = 'show'
        this.settingsTable.style.display = 'none'
      }
    })

  }

  render() {
    Array.from(document.getElementsByClassName('slider')).forEach(
      (slider) => {
        document.getElementById(slider.name).innerText = slider.value
      }
    )
    this.glowStatus.innerText = store.state.glowEffect ? 'on' : 'off'
    this.lockStatus.innerText = store.state.patternLock ? 'on' : 'off'
  }

  update() {
    // this component only triggers updates
  }
}

export const settings = new Settings()
