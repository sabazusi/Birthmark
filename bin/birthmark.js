#!/usr/bin/env node
'use strict';

var _imagemagick = require('imagemagick');

var _imagemagick2 = _interopRequireDefault(_imagemagick);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _fonts = require('./fonts');

var _fonts2 = _interopRequireDefault(_fonts);

var _validators = require('./validators');

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setup help
_commander2.default.version('0.1.0').option('-s --slack', 'Create image and upload to slack').parse(process.argv);

var isUploadToSlack = _commander2.default.slack === true;

var hasMultibyteCharacter = function hasMultibyteCharacter(str) {
  return str.match(/^[\u30A0-\u30FF]+$/) === null;
};

var createImageMagickParams = function createImageMagickParams(params) {
  var fontName = params.fontName,
      outputFileName = params.outputFileName,
      outputFileType = params.outputFileType,
      imageSize = params.imageSize,
      embedText = params.embedText,
      textColor = params.textColor,
      backgroundColor = params.backgroundColor;

  var fontPath = fontName ? { font: _fonts2.default.availables.find(function (f) {
      return f.name === fontName;
    }).path } : {};
  return Object.assign({}, fontPath, {
    background: backgroundColor,
    fill: textColor,
    size: imageSize,
    gravity: 'center',
    label: embedText,
    output: outputFileName + '.' + outputFileType
  });
};

/**
 * type: create image with strings
 */
var createImageQuestions = [{
  type: 'input',
  name: 'outputFileName',
  message: 'Input new image file name',
  validate: validators.empty
}, {
  type: 'input',
  name: 'imageSize',
  message: 'Input image size',
  default: '128x128',
  validate: validators.imageSize
}, {
  type: 'list',
  name: 'outputFileType',
  message: 'Select image file type',
  choices: ['jpg', 'png']
}, {
  type: 'input',
  name: 'embedText',
  message: 'Input string that embed in image',
  validate: validators.empty
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
}];

var fontSelectionModeQuestion = [{
  type: 'list',
  name: 'fontSelectionType',
  message: 'Select font name selection method',
  choices: ['Use default font by imagemagick', 'Input font name directly', 'Select font from available fonts list', 'Select font from available fonts list with initial character']
}];

var fontSelectionQuestions = {
  'Use default font by imagemagick': [],
  'Input font name directly': [{
    type: 'input',
    name: 'fontName',
    message: 'Input font name',
    validate: validators.font
  }],
  'Select font from available fonts list': [{
    type: 'list',
    name: 'fontName',
    message: 'Select font',
    choices: _fonts2.default.availables.map(function (f) {
      return f.name;
    }).sort()
  }],
  'Select font from available fonts list with initial character': [{
    type: 'list',
    name: 'fontNameInitial',
    message: 'Select font initial character',
    choices: Object.keys(_fonts2.default.allocated)
  }]
};

var selectFontByInitialQuestion = function selectFontByInitialQuestion(initial) {
  return {
    type: 'list',
    name: 'fontName',
    message: 'Select font',
    choices: _fonts2.default.allocated[initial].map(function (f) {
      return f.name;
    }).sort()
  };
};

var createImage = function createImage(answer) {
  var params = [];
  var output = '';
  Object.keys(answer).forEach(function (key) {
    if (key === 'label') {
      params.push('label:' + answer[key]);
    } else if (key === 'output') {
      output = answer[key];
    } else {
      params.push('-' + key);
      params.push(answer[key]);
    }
  });
  if (!output) {
    console.log('Error: no output file name...');
  } else {
    params.push(output);
    _imagemagick2.default.convert(params, function (err, stdout) {
      if (err) {
        console.log('Error: ' + err.toString());
      } else {
        console.log('Created! -> ' + answer['output']);
      }
    });
  }
};

_inquirer2.default.prompt(createImageQuestions).then(function (answer) {
  _inquirer2.default.prompt(fontSelectionModeQuestion).then(function (fontSelection) {
    var question = fontSelectionQuestions[fontSelection.fontSelectionType];
    if (question.length > 0) {
      _inquirer2.default.prompt(question).then(function (fontNameAnswer) {
        if (fontNameAnswer.fontNameInitial) {
          _inquirer2.default.prompt(selectFontByInitialQuestion(fontNameAnswer.fontNameInitial)).then(function (fontNameAnswerByInitial) {
            createImage(createImageMagickParams(Object.assign({}, { fontName: fontNameAnswerByInitial.fontName }, answer)));
          });
        } else {
          createImage(createImageMagickParams(Object.assign({}, { fontName: fontNameAnswer.fontName }, answer)));
        }
      });
    } else {
      createImage(createImageMagickParams(answer));
    }
  });
});