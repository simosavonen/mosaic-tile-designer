'use strict'

let grout = 8 // use even numbers
let width = 20
let height = 20
let rows = 15
let cols = 10
const swatch = ['#F80', '#FF0', '#8F0']
const mapeiGrouts = {
  "100 White": "#FFFFFF",
  "103 Moon white": "#E0E4DD",
  "110 Manhattan 2000": "#CDC9CE",
  "111 Silver Grey": "#ECEEEF",
  "112 Medium Grey": "#97979B",
  "113 Cement Grey": "#817F7B",
  "114 Anthracite": "#494C53",
  "115 River Grey": "#AFAD9C",
  "116 Musk Grey": "#989D8D",
  "120 Black": "#000000",
  "130 Jasmine": "#F6ECD9",
  "131 Vanilla": "#FCE9D1",
  "132 Beige 2000": "#E8D4B8",
  "133 Sand": "#B1A18D",
  "134 Silk": "#8B7B6B",
  "135 Golden Dust": "#9A7A5D",
  "136 Mud": "#70615A",
  "137 Caribbean": "#CDCAB9",
  "138 Almond": "#DCC2AA",
  "141 Caramel": "#E4A366",
  "142 Brown": "#95695C",
  "143 Terracotta": "#72463B",
  "144 Chocolate": "#653E3D",
  "145 Terra di Siena": "#BA4C34",
  "149 Volcano sand": "#494644",
  "150 Yellow": "#F3C968",
  "152 Liquorice": "#906A55",
  "162 Violet": "#9F85AF",
  "170 Crocus Blue": "#BAC8DE",
  "171 Turquoise": "#127A85",
  "172 Space Blue": "#295898",
  "174 Tornado": "#56615F"
}
let groutColor = mapeiGrouts['100 White']
let groutName = '100 White'

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
updateSettings()

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

const setRows = (value) => {
  rows = parseInt(value, 10)
  updateCanvas()
  updateSettings()
  draw()
}

const setCols = (value) => {
  cols = parseInt(value, 10)
  updateCanvas()
  updateSettings()
  draw()
}

const setGrout = (value) => {
  grout = parseInt(value, 10)
  updateCanvas()
  updateSettings()
  draw()
}

const setWidth = (value) => {
  width = parseInt(value, 10)
  updateCanvas()
  updateSettings()
  draw()
}

const setHeight = (value) => {
  height = parseInt(value, 10)
  updateCanvas()
  updateSettings()
  draw()
}


const canvas = document.getElementById('mosaic')
const ctx = canvas.getContext('2d')

const updateCanvas = () => {
  canvas.width = cols * (width + grout)
  canvas.height = rows * (height + grout)
}
updateCanvas()

const groutDiv = document.getElementById('groutDiv')
const groutHeader = document.getElementById('groutHeader')
for (let name in mapeiGrouts) {
  const node = document.createElement('div')
  node.className = 'groutsample'
  node.style.background = mapeiGrouts[name]
  node.addEventListener('click', () => {
    groutColor = mapeiGrouts[name]
    groutName = name
    groutHeader.textContent = `Grout: ${groutName}: ${groutColor} - Mapei Ultracolor`
    draw()
  })
  groutDiv.appendChild(node)
}
groutHeader.textContent = `Grout: ${groutName}: ${groutColor} - Mapei Ultracolor`


canvas.addEventListener('click', (event) => {
  const mousePos = getMousePos(canvas, event)
  swapColor(mousePos)
  draw()
})

window.addEventListener('load', () => {
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
      ctx.fillStyle = swatch[matrix[x][y]]
      ctx.fillRect(
        x * (width + grout) + grout / 2,
        y * (height + grout) + grout / 2,
        width,
        height
      )
    }
  }

  updateTextureView()
}



