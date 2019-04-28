'use strict'

const grout = 6 // use even numbers
const width = 20
const height = 20
const rows = 10
const cols = 10
const swatch = ['#F80', '#FF0', '#8F0']

const randomMatrix = (rows, cols, swatchSize) => {
  const matrix = new Array(cols)
  for (let i = 0; i < cols; i++) {
    matrix[i] = new Array(rows).fill().map(
      () => Math.floor(Math.random() * swatchSize)
    )
  }
  return matrix
}

const matrix = randomMatrix(rows, cols, swatch.length)

const canvas = document.getElementById('mosaic')
canvas.width = cols * (width + grout)
canvas.height = rows * (height + grout)
const ctx = canvas.getContext('2d')



canvas.addEventListener('click', (event) => {
  const mousePos = getMousePos(canvas, event)
  swapColor(mousePos)
  draw()
  updateTextureView()
})

const getMousePos = (canvas, event) => {
  const rect = canvas.getBoundingClientRect()
  return {
    x: Math.floor(event.clientX - rect.left),
    y: Math.floor(event.clientY - rect.top)
  }
}

const swapColor = (mousePos) => {
  const x = Math.floor(mousePos.x / (width + grout))
  const y = Math.floor(mousePos.y / (height + grout))
  if (matrix[x][y] === swatch.length - 1) {
    matrix[x][y] = 0
  }
  else {
    matrix[x][y] += 1
  }
}

const updateTextureView = () => {
  const textureDiv = document.getElementById('texture')
  const url = canvas.toDataURL()
  textureDiv.style.background = `url(${url}) repeat`
  textureDiv.style.width = `${canvas.width * 3}px`
  textureDiv.style.height = `${canvas.height * 3}px`
}

window.addEventListener('load', updateTextureView)

const elems = document.querySelectorAll('.color-input');
for (let i = 0; i < elems.length; i++) {
  const elem = elems[i];
  const hueb = new Huebee(elem, {
    // options
  });
}


// canvas is animated 60fps
const draw = () => {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      ctx.fillStyle = swatch[matrix[x][y]]

      ctx.fillRect(
        x * (width + grout) + grout / 2,
        y * (height + grout) + grout / 2,
        width,
        height
      )

    }
  }
  window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)

