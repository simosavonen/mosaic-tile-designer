class Texture {

  constructor() {
    this.textureDiv = document.querySelector('.texture')
    this.mosaic = document.querySelector('.mosaic')
  }

  render() {
    this.update()
  }

  update() {
    const url = this.mosaic.toDataURL()
    this.textureDiv.style.background = `url(${url}) repeat`
    this.textureDiv.style.width = `${this.mosaic.width * 3}px`
    this.textureDiv.style.height = `${this.mosaic.height * 3}px`
  }
}

export const texture = new Texture()
