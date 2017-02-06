import im from 'imagemagick';
import inquirer from 'inquirer';
import fontManager from 'font-manager';

const fontMap = fontManager.getAvailableFontsSync()
  .map((font) => {
    return {
      name: font.postscriptName,
      path: font.path
    }
  });

const createImageMagickParams = (params) => {
  const {
    outputFileName,
    outputFileType,
    font,
    imageSize,
    embedText,
    textColor,
    backgroundColor
  } = params;
  return {
    background: backgroundColor,
    fill: textColor,
    size: imageSize,
    gravity: 'center',
    label: embedText,
    output: `${outputFileName}.${outputFileType}`,
    font
  };
};

const emptyValidator = (name) => {
  if (!name) return 'Empty input!';
  return true;
};

const imageSizeValidator = (size) => {
  if (!size) return 'Empty input!';
  const sizes = size.split('x').map((s) => parseInt(s));
  const width = sizes[0];
  const height = sizes[1];
  if (!Number.isInteger(width) || !Number.isInteger(height)) return 'Input [width(Integer)]x[height(Integer)].';
  return true;
}

/**
 * type: create image with strings
 *
 */
const createImageQuestions = [
  {
    type: 'input',
    name: 'outputFileName',
    message: 'Input new image file name',
    validate: emptyValidator
  },
  {
    type: 'input',
    name: 'imageSize',
    message: 'Input image size',
    default: '128x128',
    validate: imageSizeValidator
  },
  {
    type: 'list',
    name: 'outputFileType',
    message: 'Select image file type',
    choices: ['jpg', 'png']
  },
  {
    type: 'input',
    name: 'embedText',
    message: 'Input string that embed in image',
    validate: emptyValidator
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Input text color code for image',
    default: '#000000'
  },
  {
    type: 'input',
    name: 'backgroundColor',
    message: 'Input background color code for image',
    default: '#ffffff'
  },
  {
    type: 'input',
    name: 'font',
    message: 'Input font name for text',
    default: 'Osaka'
  }
];

inquirer.prompt(createImageQuestions)
  .then((answer) => createImageMagickParams(answer))
  .then((answerObj) => {
    let params = [];
    let output = '';
    Object.keys(answerObj).forEach((key) => {
      if (key === 'label') {
        params.push(`label:${answerObj[key]}`);
      } else if(key === 'output') {
        output = answerObj[key];
      } else {
        params.push(`-${key}`);
        params.push(answerObj[key]);
      }
    });
    if (!output) {
      console.log('Error: no output file name...');
    } else {
      params.push(output);
      im.convert(params, (err, stdout) => {
        if (err) {
          console.log(err);
        } else {
          console.log('ok_woman');
        }
      });
    }
  });
