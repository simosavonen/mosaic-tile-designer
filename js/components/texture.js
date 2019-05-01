class Texture {

  constructor() {
    this.textureDiv = document.querySelector('.texture')
    this.canvas = document.querySelector('.mosaic')
  }

  render() {
    this.update()
  }

  update() {
    const url = this.canvas.toDataURL()
    this.textureDiv.style.background = `url(${url}) repeat`
    this.textureDiv.style.width = `${this.canvas.width * 3}px`
    this.textureDiv.style.height = `${this.canvas.height * 3}px`
  }
}

export const texture = new Texture()
