'use strict';

var _imagemagick = require('imagemagick');

var _imagemagick2 = _interopRequireDefault(_imagemagick);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
im.convert(['-size', '128x128', 'xc:#ff0000', 'test.jpg'], (err, stdout) => {
  if (err) {
    console.log(err);
  } else {
    console.log(stdout);
  }
});
*/

createImageMagickProps = function createImageMagickProps() {};

var emptyValidator = function emptyValidator(name) {
  if (!name) return 'Empty input!';
  return true;
};

/**
 * type: create image with strings
 *
 */
var createImageQuestions = [{
  type: 'input',
  name: 'outputFileName',
  message: 'Input new image file name',
  validate: emptyValidator
}, {
  type: 'list',
  name: 'outputFileType',
  message: 'Select image file type',
  choices: ['jpg', 'png']
}, {
  type: 'input',
  name: 'embedText',
  message: 'Input string that embed in image',
  validate: emptyValidator
}, {
  type: 'input',
  name: 'textColor',
  message: 'Input text color code for image',
  "default": '#000000'
}, {
  type: 'input',
  name: 'backgroundColor',
  message: 'Input background color code for image',
  "default": '#ffffff'
}];

_inquirer2.default.prompt(createImageQuestions).then(function (answer) {
  return console.log(answer);
});