import im from 'imagemagick';
import path from 'path';

const construcParams = (params) => {
  const {
    font,
    outputFileName,
    outputFileType,
    imageSize,
    embedText,
    textColor,
    backgroundColor
  } = params;
  const fontPath = font ? {font: font.path} : {};
  return Object.assign({}, fontPath, {
    background: backgroundColor,
    fill: textColor,
    size: imageSize,
    gravity: 'center',
    label: embedText,
    output: `${outputFileName}.${outputFileType}`
  });
};

const createImage = (input) => {
  const answer = construcParams(input);
  let params = [];
  let output = '';
  Object.keys(answer).forEach((key) => {
    if (key === 'label') {
      params.push(`label:${answer[key]}`);
    } else if(key === 'output') {
      output = answer[key];
    } else {
      params.push(`-${key}`);
      params.push(answer[key]);
    }
  });
  if (!output) {
    console.log('Error: no output file name...');
  } else {
    params.push(output);
    return new Promise((resolve, reject) => {
      im.convert(params, (err, stdout) => {
        if (err) {
          console.log(`Error: ${err.toString()}`);
          reject();
        } else {
          console.log(`Created! -> ${answer['output']}`);
          resolve(path.resolve(answer['output']));
        }
      });
    });
  }
};

export default createImage;
