const defaults = {
  'groutName': '100 White',
  'groutColor': '#FFFFFF',
  'groutWidth': 4,
  'tileWidth': 20,
  'tileHeight': 20,
  'rows': 10,
  'cols': 10,
  'glowEffect': true,
  'patternLock': false,
}

class Store {
  constructor() {
    this.swatch = JSON.parse(localStorage.getItem('swatch'))
    this.matrix = JSON.parse(localStorage.getItem('matrix'))
    this.state = JSON.parse(localStorage.getItem('state'))

    if (!this.swatch) {
      this.swatch = ['#222e50', '#007991', '#439a86', '#bcd8c1', '#e9d985']
      localStorage.setItem('swatch', JSON.stringify(this.swatch))
    }

    if (!this.matrix) {
      // Populates a 30x30 array with zeros.
      // ES6 Array.from(object, mapFunction)
      this.matrix = Array.from({ length: 30 }, () => Array.from({ length: 30 }, () => 0))
      this.randomizeMatrix()
    }

    if (!this.state) {
      this.state = defaults
      localStorage.setItem('state', JSON.stringify(this.state))
    }
  }

  // Fills the matrix with random swatch[] indexes
  randomizeMatrix() {
    for (let x = 0; x < this.matrix.length; x++) {
      for (let y = 0; y < this.matrix[0].length; y++) {
        const max = this.swatch.length
        const swatchIndex = Math.floor(Math.random() * max)
        this.matrix[x][y] = swatchIndex
      }
    }
    localStorage.setItem('matrix', JSON.stringify(this.matrix))
  }

  swapColor(x, y) {
    let index = this.matrix[x][y]
    this.matrix[x][y] = (index < this.swatch.length) ? index++ : 0
    localStorage.setItem('matrix', JSON.stringify(this.matrix))
  }

  setState(key, val) {
    this.state[key] = val
    localStorage.setItem('state', JSON.stringify(this.state))
  }

  getState(key) {
    return this.state[key]
  }
}

export const store = new Store()
