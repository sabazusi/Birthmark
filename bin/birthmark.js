#!/usr/bin/env node
'use strict';

var _imagemagick = require('imagemagick');

var _imagemagick2 = _interopRequireDefault(_imagemagick);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _font = require('./font');

var _font2 = _interopRequireDefault(_font);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setup help
_commander2.default.version('0.1.0').option('-s --slack', 'Create image and upload to slack').parse(process.argv);

var isUploadToSlack = _commander2.default.slack === true;

var hasMultibyteCharacter = function hasMultibyteCharacter(str) {
  return str.match(/^[\u30A0-\u30FF]+$/) === null;
};

var createImageMagickParams = function createImageMagickParams(params) {
  var outputFileName = params.outputFileName,
      outputFileType = params.outputFileType,
      fontName = params.fontName,
      imageSize = params.imageSize,
      embedText = params.embedText,
      textColor = params.textColor,
      backgroundColor = params.backgroundColor;

  return {
    font: _font2.default.availables.find(function (f) {
      return f.name === fontName;
    }).path,
    background: backgroundColor,
    fill: textColor,
    size: imageSize,
    gravity: 'center',
    label: embedText,
    output: outputFileName + '.' + outputFileType
  };
};
var emptyValidator = function emptyValidator(name) {
  if (!name) return 'Empty input!';
  return true;
};

var imageSizeValidator = function imageSizeValidator(size) {
  if (!size) return 'Empty input!';
  var sizes = size.split('x').map(function (s) {
    return parseInt(s);
  });
  var width = sizes[0];
  var height = sizes[1];
  if (!Number.isInteger(width) || !Number.isInteger(height)) return 'Input [width(Integer)]x[height(Integer)].';
  return true;
};

var fontValidator = function fontValidator(fontName) {
  var targetFont = _font2.default.availables.find(function (f) {
    return f.name === fontName;
  });
  if (!targetFont) return 'Invalid font name';
  return true;
};

/**
 * type: create image with strings
 */
var createImageQuestions = [{
  type: 'input',
  name: 'outputFileName',
  message: 'Input new image file name',
  validate: emptyValidator
}, {
  type: 'input',
  name: 'imageSize',
  message: 'Input image size',
  default: '128x128',
  validate: imageSizeValidator
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
  default: '#000000'
}, {
  type: 'input',
  name: 'backgroundColor',
  message: 'Input background color code for image',
  default: '#ffffff'
}, {
  type: 'input',
  name: 'fontName',
  message: 'Input font name for text',
  default: 'Osaka',
  validate: fontValidator
}];

_inquirer2.default.prompt(createImageQuestions).then(function (answer) {
  return createImageMagickParams(answer);
}).then(function (answerObj) {
  var params = [];
  var output = '';
  Object.keys(answerObj).forEach(function (key) {
    if (key === 'label') {
      params.push('label:' + answerObj[key]);
    } else if (key === 'output') {
      output = answerObj[key];
    } else {
      params.push('-' + key);
      params.push(answerObj[key]);
    }
  });
  if (!output) {
    console.log('Error: no output file name...');
  } else {
    params.push(output);
    _imagemagick2.default.convert(params, function (err, stdout) {
      if (err) {
        console.log(err);
      } else {
        console.log('ok_woman');
      }
    });
  }
});