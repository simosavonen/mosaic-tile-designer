'use strict'

let grout = 4 // use even numbers
let width = 20
let height = 20
let rows = 10
let cols = 10
let swatch = ['#000000', '#333333', '#666666', '#999999']
let drawGlowEffect = true

// from mapeiData.js
let groutName = '114 Anthracite'
let groutColor = mapeiGrouts[groutName]


document.getElementById('grout').value = grout
document.getElementById('rows').value = rows
document.getElementById('cols').value = cols
document.getElementById('width').value = width
document.getElementById('height').value = height

const updateSettings = () => {
  document.getElementById('groutValue').innerText = grout
  document.getElementById('rowsValue').innerText = rows
  document.getElementById('colsValue').innerText = cols
  document.getElementById('widthValue').innerText = width
  document.getElementById('heightValue').innerText = height
}


// call this if number of colors in the swatch changes,
// it erases current pattern as a side-effect
const randomMatrix = (swatchSize) => {
  let grid = [20]
  for (let i = 0; i < 20; i++) {
    grid[i] = [20]
    for (let j = 0; j < 20; j++) {
      grid[i][j] = Math.floor(Math.random() * swatchSize)
    }
  }
  return grid
}

let matrix = randomMatrix(swatch.length)

const canvas = document.getElementById('mosaic')
const ctx = canvas.getContext('2d')

const updateCanvas = () => {
  canvas.width = cols * (width + grout)
  canvas.height = rows * (height + grout)
}


const groutDiv = document.getElementById('groutDiv')
const groutHeader = document.getElementById('groutHeader')
for (let name in mapeiGrouts) {
  const node = document.createElement('div')
  node.className = 'groutsample'
  node.style.background = mapeiGrouts[name]
  node.addEventListener('click', () => {
    groutColor = mapeiGrouts[name]
    groutName = name
    groutHeader.textContent = `${groutName}: ${groutColor}`
    draw()
  })
  groutDiv.appendChild(node)
}
groutHeader.textContent = `${groutName}: ${groutColor}`


canvas.addEventListener('click', (event) => {
  const mousePos = getMousePos(canvas, event)
  swapColor(mousePos)
  draw()
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

const draw = () => {
  ctx.fillStyle = groutColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {

      const tileX = x * (width + grout) + grout / 2
      const tileY = y * (height + grout) + grout / 2

      ctx.fillStyle = swatch[matrix[x][y]]
      ctx.fillRect(tileX, tileY, width, height)

      if (drawGlowEffect) {
        const leftgrd = ctx.createLinearGradient(tileX, tileY, tileX + width / 5, tileY)
        leftgrd.addColorStop(0, 'rgba(255, 255, 255, 0.2)')
        leftgrd.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = leftgrd
        ctx.fillRect(tileX, tileY, width / 5, height)

        const topgrd = ctx.createLinearGradient(tileX, tileY, tileX, tileY + height / 5)
        topgrd.addColorStop(0, 'rgba(255, 255, 255, 0.2)')
        topgrd.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = topgrd
        ctx.fillRect(tileX, tileY, width, height / 5)
      }

    }
  }
  // the mosaic changed, lets update texture preview
  updateTextureView()
}

const update = () => {
  updateCanvas()
  updateSettings()
  draw()
}

window.addEventListener('load', () => {
  update()
})

const setRows = (value) => {
  rows = parseInt(value, 10)
  update()
}

const setCols = (value) => {
  cols = parseInt(value, 10)
  update()
}

const setGrout = (value) => {
  grout = parseInt(value, 10)
  update()
}

const setWidth = (value) => {
  width = parseInt(value, 10)
  update()
}

const setHeight = (value) => {
  height = parseInt(value, 10)
  update()
}
