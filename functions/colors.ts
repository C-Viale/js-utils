/** Generates a random Hexadecimal color  */
export function randomHEXColor() {
  const hex = (Math.random() * 0xfffff * 1000000).toString(16);
  return `#${hex.slice(0, 6)}`;
}

/** Generates a random HSL color  */
export function randomHSLColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 100);
  const light = Math.floor(Math.random() * 100);

  return `hsl(${hue}, ${saturation}%, ${light}%)`;
}

/** Generates a random RGB color  */
export function randomRGBColor() {
  const red = Math.floor(Math.random() * 255),
    green = Math.floor(Math.random() * 255),
    blue = Math.floor(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
}
