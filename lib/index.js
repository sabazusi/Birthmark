'use strict';

var _imagemagick = require('imagemagick');

var _imagemagick2 = _interopRequireDefault(_imagemagick);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_imagemagick2.default.convert(['-size', '128x128', 'xc:#ff0000', 'test.jpg'], function (err, stdout) {
  if (err) {
    console.log(err);
  } else {
    console.log(stdout);
  }
});

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
}];

_inquirer2.default.prompt(createImageQuestions).then(function (answer) {
  return console.log(answer);
});