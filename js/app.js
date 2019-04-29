'use strict'

let grout = 4 // use even numbers
let width = 20
let height = 20
let rows = 10
let cols = 10
const maxTiles = 30 // limit GUI sliders to this
let swatch = ['#222e50', '#007991', '#439a86', '#bcd8c1', '#e9d985']
let drawGlowEffect = true
let patternLocked = false

// from mapeiData.js
let groutName = '114 Anthracite'
let groutColor = mapeiGrouts[groutName]


document.getElementById('grout').value = grout
document.getElementById('rows').value = rows
document.getElementById('cols').value = cols
document.getElementById('width').value = width
document.getElementById('height').value = height

const updateSettings = () => {
  document.getElementById('groutValue').innerText = grout + 'px'
  document.getElementById('rowsValue').innerText = rows
  document.getElementById('colsValue').innerText = cols
  document.getElementById('widthValue').innerText = width + 'px'
  document.getElementById('heightValue').innerText = height + 'px'
}


// call this if number of colors in the swatch changes,
// it erases current pattern as a side-effect
const randomMatrix = (swatchSize) => {
  let grid = [maxTiles]
  for (let i = 0; i < maxTiles; i++) {
    grid[i] = [maxTiles]
    for (let j = 0; j < maxTiles; j++) {
      grid[i][j] = Math.floor(Math.random() * swatchSize)
    }
  }
  return grid
}

let matrix = randomMatrix(swatch.length)

const theInputs = document.getElementById('theInputs')
for (let i = 0; i < swatch.length; i++) {
  const input = document.createElement('input')
  input.type = 'color'
  input.id = `color${i}`
  input.className = 'colorInput'
  input.value = swatch[i]
  input.addEventListener('change', () => {
    swatch[i] = input.value
    input.labels[0].innerText = input.value
    draw()
  })

  const label = document.createElement('label')
  label.setAttribute('for', input.id)
  label.innerText = input.value

  const wrapper = document.createElement('div')
  wrapper.appendChild(label)
  wrapper.appendChild(input)
  theInputs.appendChild(wrapper)
}




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
  // the mosaic changed, update texture preview
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

const hideHelpText = () => {
  document.getElementById('usermanual').style.display = 'none'
}

const toggleGlow = () => {
  drawGlowEffect = !drawGlowEffect
  document.getElementById('toggleStatus').innerHTML = drawGlowEffect ? 'on' : 'off'
  draw()
}

const toggleLock = () => {
  patternLocked = !patternLocked
  document.getElementById('lockStatus').innerHTML = patternLocked ? 'on' : 'off'
}

// this somehow returns nicely formatted color codes, ex. #ffffff
const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

const setSwatch = (val) => {
  switch (val) {
    case 1:
      swatch.push(randomColor())
      const input = document.createElement('input')
      input.type = 'color'
      input.id = `color${swatch.length}`
      input.className = 'colorInput'
      input.value = swatch[swatch.length - 1]
      input.addEventListener('change', () => {
        swatch[swatch.length - 1] = input.value
        input.labels[0].innerText = input.value
        draw()
      })
      const label = document.createElement('label')
      label.setAttribute('for', input.id)
      label.innerText = input.value

      const wrapper = document.createElement('div')
      wrapper.appendChild(label)
      wrapper.appendChild(input)
      theInputs.appendChild(wrapper)

      document.getElementById('subButton').disabled = false
      if (!patternLocked) {
        matrix = randomMatrix(swatch.length)
        draw()
      }
      return null
    case -1:
      if (swatch.length > 1) {
        swatch.pop()
        theInputs.removeChild(theInputs.lastChild)
        if (!patternLocked) {
          matrix = randomMatrix(swatch.length)
          draw()
        }
      }
      if (swatch.length === 1) {
        document.getElementById('subButton').disabled = true
      }
      return null
    default:
      return null
  }
}
