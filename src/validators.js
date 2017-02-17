import fonts from './fonts';

export const empty = (name) => {
  if (!name) return 'Empty input!';
  return true;
};

export const imageSize = (size) => {
  if (!size) return 'Empty input!';
  const sizes = size.split('x').map((s) => parseInt(s));
  const width = sizes[0];
  const height = sizes[1];
  if (!Number.isInteger(width) || !Number.isInteger(height)) return 'Input [width(Integer)]x[height(Integer)].';
  return true;
}

export const font = (fontName) => {
  const targetFont = fonts.availables.find(f => f.name === fontName);
  if (!targetFont) return 'Invalid font name';
  return true;
}
