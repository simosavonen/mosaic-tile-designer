import { store } from './store.js'

class Favorites {
  constructor() {
    this.favoritesDiv = document.querySelector('.favorites')
  }

  render() {
    const titles = Object.keys(store.favorites)
    const colorArrays = Object.values(store.favorites)
    for (let i = 0; i < titles.length; i++) {
      const wrapper = document.createElement('div')
      const colors = document.createElement('div')
      wrapper.innerText = titles[i]
      colors.innerText = colorArrays[i]
      wrapper.appendChild(colors)
      this.favoritesDiv.appendChild(wrapper)
    }


  }



  update() {

  }
}

export const favorites = new Favorites()