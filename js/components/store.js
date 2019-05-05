const defaults = {
  'groutName': '114 Anthracite',
  'groutColor': '#494C53',
  'groutWidth': 4,
  'tileWidth': 20,
  'tileHeight': 20,
  'rows': 10,
  'cols': 10,
  'glowEffect': true,
  'patternLock': false,
  'settingsVisible': true,
}

class Store {
  constructor() {
    this.state = JSON.parse(localStorage.getItem('state'))
    this.swatch = JSON.parse(localStorage.getItem('swatch'))
    this.matrix = JSON.parse(localStorage.getItem('matrix'))
    this.favorites = JSON.parse(localStorage.getItem('favorites'))

    this.observers = []

    if (!this.state) {
      this.state = defaults
      localStorage.setItem('state', JSON.stringify(this.state))
    }

    if (!this.swatch) {
      this.swatch = ['#222E50', '#007991', '#439A86', '#BCD8C1', '#E9D985']
      localStorage.setItem('swatch', JSON.stringify(this.swatch))
    }

    if (!this.matrix) {
      // populates a 30x30 array with zeros
      // ES6 Array.from(object, mapFunction)
      this.matrix = Array.from({ length: 30 }, () => Array.from({ length: 30 }, () => 0))
      this.randomizeMatrix()
    }

    if (!this.favorites) {
      this.favorites = {
        "Marine Laboratory": ['#222E50', '#007991', '#439A86', '#BCD8C1', '#E9D985'],
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    }

  }

  // fills the matrix with random swatch[] indexes
  randomizeMatrix() {
    for (let x = 0; x < this.matrix.length; x++) {
      for (let y = 0; y < this.matrix[0].length; y++) {
        const max = this.swatch.length
        this.matrix[x][y] = Math.floor(Math.random() * max)
      }
    }
    localStorage.setItem('matrix', JSON.stringify(this.matrix))
    this.notify()
  }

  swapColor(clickPos) {
    const x = Math.floor(clickPos.x / (this.state.tileWidth + this.state.groutWidth))
    const y = Math.floor(clickPos.y / (this.state.tileHeight + this.state.groutWidth))
    let index = this.matrix[x][y]
    if (this.matrix[x][y] === this.swatch.length - 1) {
      this.matrix[x][y] = 0
    } else {
      this.matrix[x][y] += 1
    }
    localStorage.setItem('matrix', JSON.stringify(this.matrix))
    this.notify()
  }

  setColorInSwatch(color, index) {
    this.swatch[index] = color
    localStorage.setItem('swatch', JSON.stringify(this.swatch))
    this.notify()
  }

  addColorToSwatch(color) {
    this.swatch.push(color)
    localStorage.setItem('swatch', JSON.stringify(this.swatch))
    if (!this.state.patternLock) {
      this.randomizeMatrix()
    }
  }

  removeColorFromSwatch() {
    if (this.swatch.length > 1) {
      this.swatch.pop()
      localStorage.setItem('swatch', JSON.stringify(this.swatch))
      if (!this.state.patternLock) {
        this.randomizeMatrix()
      }
    }
  }

  saveToFavorites(title) {
    // remember to copy array values, dont just save a reference to the same array
    this.favorites[title] = [...this.swatch]
    localStorage.setItem('favorites', JSON.stringify(this.favorites))
  }

  deleteFromFavorites(title) {
    delete this.favorites[title]
    localStorage.setItem('favorites', JSON.stringify(this.favorites))
  }

  loadFromFavorites(title) {
    this.swatch = [...this.favorites[title]]
    localStorage.setItem('swatch', JSON.stringify(this.swatch))
    if (!this.state.patternLock) {
      this.randomizeMatrix()
    }
  }

  setState(key, val, shouldNotify = true) {
    this.state[key] = val
    localStorage.setItem('state', JSON.stringify(this.state))
    shouldNotify ? this.notify() : null
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  notify() {
    this.observers.forEach((observer) => observer.update())
  }
}

export const store = new Store()
