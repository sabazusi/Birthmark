import im from 'imagemagick';
import inquirer from 'inquirer';

/**
im.convert(['-size', '128x128', 'xc:#ff0000', 'test.jpg'], (err, stdout) => {
  if (err) {
    console.log(err);
  } else {
    console.log(stdout);
  }
});
*/

createImageMagickParams = (params) => {
  const {
    outputFileName,
    size,
    text,
    textColor,
    backgroundColor
  } = params;
  return [
    '-size',
    size,
    `xc:${backgroundColor}`,
    outputFileName
  ];
};

const emptyValidator = (name) => {
  if (!name) return 'Empty input!';
  return true;
};

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
    "default": '#000000'
  },
  {
    type: 'input',
    name: 'backgroundColor',
    message: 'Input background color code for image',
    "default": '#ffffff'
  }
];

inquirer.prompt(createImageQuestions)
  .then((answer) => console.log(answer));

