import { store } from './store.js'

class Canvas {
  constructor() {
    this.mosaic = document.querySelector('.mosaic')
    this.ctx = this.mosaic.getContext('2d')

    this.mosaic.addEventListener('click', (event) => {
      const clickPos = this.getClickPositionOnMosaic(event)
      store.swapColor(clickPos)
    })
  }

  render() {
    this.update()
  }

  update() {
    const { tileWidth, tileHeight, groutWidth, cols, rows, groutColor } = store.state

    this.mosaic.width = cols * (tileWidth + groutWidth)
    this.mosaic.height = rows * (tileHeight + groutWidth)

    // grout
    this.ctx.fillStyle = groutColor
    this.ctx.fillRect(0, 0, this.mosaic.width, this.mosaic.height)

    // mosaic tiles
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const tileX = x * (tileWidth + groutWidth) + groutWidth / 2
        const tileY = y * (tileHeight + groutWidth) + groutWidth / 2

        const index = store.matrix[x][y]
        this.ctx.fillStyle = store.swatch[index]

        this.ctx.fillRect(tileX, tileY, tileWidth, tileHeight)

        // glow effect
        if (store.state.glowEffect) {
          const leftgrd = this.ctx.createLinearGradient(tileX, tileY, tileX + tileWidth / 5, tileY)
          leftgrd.addColorStop(0, 'rgba(255, 255, 255, 0.2)')
          leftgrd.addColorStop(1, 'rgba(255, 255, 255, 0)')
          this.ctx.fillStyle = leftgrd
          this.ctx.fillRect(tileX, tileY, tileWidth / 5, tileHeight)

          const topgrd = this.ctx.createLinearGradient(tileX, tileY, tileX, tileY + tileHeight / 5)
          topgrd.addColorStop(0, 'rgba(255, 255, 255, 0.2)')
          topgrd.addColorStop(1, 'rgba(255, 255, 255, 0)')
          this.ctx.fillStyle = topgrd
          this.ctx.fillRect(tileX, tileY, tileWidth, tileHeight / 5)
        }
      }
    }


  }


  getClickPositionOnMosaic(event) {
    const rect = this.mosaic.getBoundingClientRect()
    return {
      x: Math.floor(event.clientX - rect.left),
      y: Math.floor(event.clientY - rect.top)
    }
  }

}

export const canvas = new Canvas()
