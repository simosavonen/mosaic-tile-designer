class Store {
  constructor() {
    console.log('store initialized')

    this.swatch = ['#222e50', '#007991', '#439a86', '#bcd8c1', '#e9d985']

    this.matrixSize = 30 // mosaics sold are up to 26x26
    this.matrix = []
    for (let i = 0; i < this.matrixSize; i++) {
      this.matrix.push([])
      for (let j = 0; j < this.matrixSize; j++) {
        this.matrix[i].push(Math.floor(Math.random() * this.swatch.length))
      }
    }
  }

  resetMatrix = (swatchSize) => {
    for (let i = 0; i < this.matrixSize; i++) {
      for (let j = 0; j < this.matrixSize; j++) {
        this.matrix[i][j] = Math.floor(Math.random() * swatchSize)
      }
    }
  }
}



export const store = new Store()
