import { store } from './store.js'
import { colorSwatch } from './colorswatch.js'

class Favorites {
  constructor() {
    this.favoritesDiv = document.querySelector('.favoritesList')
    this.saveForm = document.getElementById('saveFavorite')
    this.title = document.getElementById('favoriteName')

    this.saveForm.addEventListener('submit', (event) => {
      event.preventDefault()
      store.saveToFavorites(this.title.value)
      this.title.value = ''
      this.update()
    })
  }

  render() {
    const titles = Object.keys(store.favorites)
    const colorArrays = Object.values(store.favorites)

    for (let i = 0; i < titles.length; i++) {
      const wrapper = document.createElement('div')
      const colorsDiv = document.createElement('div')
      const header = document.createElement('span')
      wrapper.className = 'favoriteWrapper'
      header.innerText = titles[i]
      header.setAttribute('style', 'display: block; width: 100%; margin-bottom: 2px;')

      this.coloredBoxes(colorsDiv, colorArrays[i])

      const deleteButton = document.createElement('button')
      deleteButton.innerText = 'remove'
      deleteButton.className = 'favoriteDelete'
      deleteButton.addEventListener('click', (event) => {
        event.stopPropagation()
        store.deleteFromFavorites(titles[i])
        this.update()
      })

      wrapper.addEventListener('click', () => {
        store.loadFromFavorites(titles[i])
        colorSwatch.update()
      })

      wrapper.appendChild(header)
      wrapper.appendChild(deleteButton)
      wrapper.appendChild(colorsDiv)
      this.favoritesDiv.appendChild(wrapper)
    }
  }

  update() {
    while (this.favoritesDiv.firstChild) {
      this.favoritesDiv.removeChild(this.favoritesDiv.firstChild)
    }
    this.render()
  }

  coloredBoxes(container, colorArray) {
    const width = Math.floor(200 / colorArray.length)
    for (let i = 0; i < colorArray.length; i++) {
      const box = document.createElement('div')
      box.setAttribute('style', `width: ${width}px; height: 21px; background: ${colorArray[i]}; float: left;`)
      box.setAttribute('title', colorArray[i])
      container.appendChild(box)
    }
  }
}

export const favorites = new Favorites()