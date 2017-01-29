import im from 'imagemagick';
import inquirer from 'inquirer';

im.convert(['-size', '128x128', 'xc:#ff0000', 'test.jpg'], (err, stdout) => {
  if (err) {
    console.log(err);
  } else {
    console.log(stdout);
  }
});


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
  }
];

inquirer.prompt(createImageQuestions)
  .then((answer) => console.log(answer));
