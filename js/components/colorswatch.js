class ColorSwatch {

  constructor() {
    console.log('color swatch created')
  }

  render() {
    console.log('color swatch rendered')
  }
}

export const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

export const colorSwatch = new ColorSwatch()
