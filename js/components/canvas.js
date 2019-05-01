import { store } from './store.js'

class Canvas {
  constructor() {
    this.mosaic = document.querySelector('.mosaic')
    this.ctx = this.mosaic.getContext('2d')
  }

  render() {
    this.update()
  }

  update() {
    this.mosaic.width = store.state.cols *
      (store.state.tileWidth + store.state.groutWidth)
    this.mosaic.height = store.state.rows *
      (store.state.tileHeight + store.state.groutWidth)
    this.draw()
  }

  draw() {
    this.ctx.fillStyle = store.state.groutColor
    this.ctx.fillRect(0, 0, this.mosaic.width, this.mosaic.height)

    const width = store.state.tileWidth
    const height = store.state.tileHeight
    const grout = store.state.groutWidth

    for (let x = 0; x < store.state.cols; x++) {
      for (let y = 0; y < store.state.rows; y++) {
        const tileX = x * (width + grout) + grout / 2
        const tileY = y * (height + grout) + grout / 2

        const index = store.matrix[x][y]
        this.ctx.fillStyle = store.swatch[index]

        this.ctx.fillRect(tileX, tileY, width, height)
      }
    }
  }

}

export const canvas = new Canvas()
