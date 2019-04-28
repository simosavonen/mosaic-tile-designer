'use strict'

const grout = 6 // use even numbers
let groutColor = '#FFFFFF'
const width = 20
const height = 20
const rows = 10
const cols = 10
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

const select = document.getElementById('grout')
for (let name in mapeiGrouts) {
  select.options[select.options.length] = new Option(name, mapeiGrouts[name])
}

select.addEventListener('change', () => {
  groutColor = select.value
  draw()
  updateTextureView()
})

canvas.addEventListener('click', (event) => {
  const mousePos = getMousePos(canvas, event)
  swapColor(mousePos)
  draw()
  updateTextureView()
})

window.addEventListener('load', () => {
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



const elems = document.querySelectorAll('.color-input');
for (let i = 0; i < elems.length; i++) {
  const elem = elems[i];
  const hueb = new Huebee(elem, {
    // options
  });
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
}



